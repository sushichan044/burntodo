-- Custom SQL migration file, put you code below! --PRAGMA foreign_keys=off;

BEGIN TRANSACTION;

/* insert password for existing users */
UPDATE users SET password = 'P4ssw0rd';

COMMIT;

PRAGMA foreign_keys=on;
