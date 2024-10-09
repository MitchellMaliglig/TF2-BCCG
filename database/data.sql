-- CREATE TABLE "users" (
--   "userId" serial PRIMARY KEY,
--   "username" text UNIQUE NOT NULL,
--   "hashedPassword" text NOT NULL,
--   "createdAt" timestamptz NOT NULL DEFAULT 'now()'
-- );

INSERT INTO "users"
("username", "hashedPassword", "createdAt")
VALUES
('a', '$argon2id$v=19$m=65536,t=3,p=4$aaxsxoJSMSjR0Cc2U1VGqA$QbVzNqePo4x92+DakBymOiNDCteQ/5IvmV736LbHkSo', '2024-10-04T22:55:02.713Z');

INSERT INTO "users"
("username", "hashedPassword", "createdAt")
VALUES
('b', '$argon2id$v=19$m=65536,t=3,p=4$+mB1AfGlPdCiKuWY1FmozA$VOEdTXPvx3pP2GWH5OYrjuI50t6ZfhRVSXkRf7OZ0vo', '2024-10-04T22:55:02.714Z');

-- CREATE TABLE "entries" (
--   "entryId" serial PRIMARY KEY,
--   "userId" int,
--   "title" text NOT NULL,
--   "description" text NOT NULL,
--   "commands" text NOT NULL,
--   "createdAt" timestamptz NOT NULL DEFAULT 'now()',
--   "updatedAt" timestamptz NOT NULL DEFAULT 'now()'
-- );

INSERT INTO "entries"
("userId", "title", "description", "commands", "createdAt", "updatedAt")
VALUES
(1, 'Pizza Time One', 'The most fun time of all time!', 'tf_bot_add 3 spy blue expert;tf_bot_add 3 sniper blue expert;tf_bot_add 3 scout red expert;tf_bot_add 3 heavyweapons red expert;', '2024-10-04T22:55:02.715Z', '2024-10-04T22:55:02.715Z');

INSERT INTO "entries"
("userId", "title", "description", "commands", "createdAt", "updatedAt")
VALUES
(1, 'Pizza Time Two', 'The most fun time of all time!', 'tf_bot_add 3 spy blue expert;tf_bot_add 3 sniper blue expert;tf_bot_add 3 scout red expert;tf_bot_add 3 heavyweapons red expert;', '2024-10-04T22:55:02.716Z', '2024-10-04T22:55:02.716Z');

INSERT INTO "entries"
("userId", "title", "description", "commands", "createdAt", "updatedAt")
VALUES
(2, 'Pizza Time Three', 'The most fun time of all time!', 'tf_bot_add 3 spy blue expert;tf_bot_add 3 sniper blue expert;', '2024-10-04T22:55:02.717Z', '2024-10-04T22:55:02.717Z');

INSERT INTO "entries"
("userId", "title", "description", "commands", "createdAt", "updatedAt")
VALUES
(2, 'Pizza Time Four', 'The most fun time of all time!', 'tf_bot_add 3 scout red expert;tf_bot_add 3 heavyweapons red expert;', '2024-10-04T22:55:02.718Z', '2024-10-04T22:55:02.718Z');
