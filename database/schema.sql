set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "users" (
  "userId" serial PRIMARY KEY,
  "username" text UNIQUE NOT NULL,
  "hashedPassword" text NOT NULL,
  "createdAt" timestamptz NOT NULL DEFAULT 'now()',
  "updatedAt" timestamptz NOT NULL DEFAULT 'now()'
);

CREATE TABLE "entries" (
  "entryId" serial PRIMARY KEY,
  "userId" int,
  "title" text NOT NULL,
  "description" text NOT NULL,
  "createdAt" timestamptz NOT NULL DEFAULT 'now()',
  "updatedAt" timestamptz NOT NULL DEFAULT 'now()'
);

CREATE TABLE "commands" (
  "commandId" serial PRIMARY KEY,
  "entryId" int,
  "command" text NOT NULL,
  "createdAt" timestamptz NOT NULL DEFAULT 'now()'
);

ALTER TABLE "entries" ADD FOREIGN KEY ("userId") REFERENCES "users" ("userId");

ALTER TABLE "commands" ADD FOREIGN KEY ("entryId") REFERENCES "entries" ("entryId");
