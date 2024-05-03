PRAGMA foreign_keys=off;

BEGIN TRANSACTION;

ALTER TABLE `users` RENAME TO `_users_old`;

CREATE TABLE `users` (
	`createdAt` integer DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`name` text PRIMARY KEY NOT NULL,
	`updatedAt` integer DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
    `password` text NOT NULL
);


INSERT INTO `users` (createdAt, name, updatedAt, password)
SELECT createdAt, name, updatedAt, password
FROM `_users_old`;

COMMIT;

PRAGMA foreign_keys=on;
