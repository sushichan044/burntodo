PRAGMA foreign_keys=off;

BEGIN TRANSACTION;

ALTER TABLE `todos` RENAME TO `_todos_old`;

CREATE TABLE `todos` (
	`createdAt` integer DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`description` text,
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`updatedAt` integer DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`userName` text NOT NULL,
	FOREIGN KEY (`userName`) REFERENCES `users`(`name`) ON UPDATE no action ON DELETE no action
);

INSERT INTO `todos` (createdAt, description, id, title, updatedAt, userName)
SELECT createdAt, description, id, title, updatedAt, userName
FROM `_todos_old`;

COMMIT;

PRAGMA foreign_keys=on;
