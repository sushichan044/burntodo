CREATE TABLE `todos` (
	`createdAt` integer DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`description` text NOT NULL,
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`updatedAt` integer DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`userName` text NOT NULL,
	FOREIGN KEY (`userName`) REFERENCES `users`(`name`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`createdAt` integer DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`name` text PRIMARY KEY NOT NULL,
	`updatedAt` integer DEFAULT (CURRENT_TIMESTAMP) NOT NULL
);
