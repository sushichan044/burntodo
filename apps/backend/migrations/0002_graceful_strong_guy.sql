PRAGMA foreign_keys=off;

BEGIN TRANSACTION;

ALTER TABLE users ADD `password` text;

/* insert password for existing users */
UPDATE users SET password = 'password';

COMMIT;

PRAGMA foreign_keys=on;
