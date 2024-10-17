/* eslint-disable @typescript-eslint/no-unused-vars -- Remove when used */
import 'dotenv/config';
import express from 'express';
import pg from 'pg';
import { ClientError, authMiddleware, errorMiddleware } from './lib/index.js';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

type Auth = {
  username: string;
  password: string;
};

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const hashKey = process.env.TOKEN_SECRET;
if (!hashKey) throw new Error('TOKEN_SECRET not found in .env');

const app = express();

// Create paths for static directories
const reactStaticDir = new URL('../client/dist', import.meta.url).pathname;
const uploadsStaticDir = new URL('public', import.meta.url).pathname;

app.use(express.static(reactStaticDir));
// Static directory for file uploads server/public/
app.use(express.static(uploadsStaticDir));
app.use(express.json());

app.post('/api/auth/sign-up', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      throw new ClientError(400, 'username and password are required fields');
    const hashedPassword = await argon2.hash(password);
    const sql = `
      INSERT INTO "users" ("username", "hashedPassword")
      VALUES ($1, $2)
      RETURNING *;
    `;
    const params = [username, hashedPassword];
    const result = await db.query(sql, params);
    const [newUser] = result.rows;
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
});

app.post('/api/auth/log-in', async (req, res, next) => {
  try {
    const { username, password } = req.body as Partial<Auth>;
    if (!username || !password) throw new ClientError(401, 'invalid login');
    const sql = `
      SELECT "userId", "hashedPassword"
      FROM "users"
      WHERE "username" = $1;
    `;
    const params = [username];
    const result = await db.query(sql, params);
    const [user] = result.rows;
    if (!user) throw new ClientError(401, 'user not found');
    if (!(await argon2.verify(user.hashedPassword, password)))
      throw new ClientError(401, 'incorrect password');
    const payload = {
      userId: user.userId,
      username,
    };
    const signedToken = jwt.sign(payload, hashKey);
    res.status(200).json({
      user: payload,
      token: signedToken,
    });
  } catch (err) {
    next(err);
  }
});

app.get('/api/entries', authMiddleware, async (req, res, next) => {
  try {
    const sql = `
      SELECT * FROM "entries"
      WHERE "userId" = $1;
    `;
    const result = await db.query(sql, [req.user?.userId]);
    res.status(200).json(result.rows);
  } catch (err) {
    next(err);
  }
});

app.get('/api/entries/:entryId', authMiddleware, async (req, res, next) => {
  try {
    const entryId = Number(req.params.entryId);
    if (!Number.isInteger(entryId) || entryId < 1) {
      throw new ClientError(400, 'entryId must be a positive integer');
    }
    const sql = `
      SELECT * FROM "entries"
      WHERE "entryId" = $1 AND "userId" = $2;
    `;
    const params = [entryId, req.user?.userId];
    const result = await db.query(sql, params);
    const [entry] = result.rows;
    if (entry) {
      res.status(200).json(entry);
    } else {
      throw new ClientError(404, `cannot find entry with entryId ${entryId}`);
    }
  } catch (err) {
    next(err);
  }
});

app.post('/api/entries', authMiddleware, async (req, res, next) => {
  try {
    const { title, description, commands } = req.body;
    if (!title || !description || !commands)
      throw new ClientError(400, 'title, description & commands required');
    const sql = `
      INSERT INTO "entries" ("userId", "title", "description", "commands")
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const params = [req.user?.userId, title, description, commands];
    const result = await db.query(sql, params);
    const [entry] = result.rows;
    res.status(201).json(entry);
  } catch (err) {
    next(err);
  }
});

app.put('/api/entries/:entryId', authMiddleware, async (req, res, next) => {
  try {
    const entryId = Number(req.params.entryId);
    if (!Number.isInteger(entryId) || entryId < 1) {
      throw new ClientError(400, 'entryId must be a positive integer');
    }
    const { title, description, commands } = req.body;
    const sql = `
      UPDATE "entries"
      SET "updatedAt" = now(),
          "title" = $1,
          "description" = $2,
          "commands" = $3
      WHERE "entryId" = $4 AND "userId" = $5
      RETURNING *;
    `;
    const params = [title, description, commands, entryId, req.user?.userId];
    const result = await db.query(sql, params);
    const [entry] = result.rows;
    if (!entry) {
      throw new ClientError(404, `cannot find entry with entryId ${entryId}`);
    }
    res.status(200).json(entry);
  } catch (err) {
    next(err);
  }
});

app.delete('/api/entries/:entryId', authMiddleware, async (req, res, next) => {
  try {
    const entryId = Number(req.params.entryId);
    if (!Number.isInteger(entryId) || entryId < 1) {
      throw new ClientError(400, 'entryId must be a positive integer');
    }
    const sql = `
      DELETE FROM "entries"
      WHERE "entryId" = $1 AND "userId" = $2
      RETURNING *;
    `;
    const params = [entryId, req.user?.userId];
    const result = await db.query(sql, params);
    const [entry] = result.rows;
    if (entry) {
      res.sendStatus(204);
    } else {
      throw new ClientError(404, `entry ${entryId} not found`);
    }
  } catch (err) {
    next(err);
  }
});

/*
 * Handles paths that aren't handled by any other route handler.
 * It responds with `index.html` to support page refreshes with React Router.
 * This must be the _last_ route, just before errorMiddleware.
 */
app.get('*', (req, res) => res.sendFile(`${reactStaticDir}/index.html`));

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log('Listening on port', process.env.PORT);
});
