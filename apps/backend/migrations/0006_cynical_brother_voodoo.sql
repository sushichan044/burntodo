-- Custom SQL migration file, put you code below! ---- Custom SQL migration file, put you code below! --PRAGMA foreign_keys=off;

BEGIN TRANSACTION;

/* delete all users */
DELETE FROM users;

COMMIT;

PRAGMA foreign_keys=on;
