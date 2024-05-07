CREATE TABLE `todos` (
	`created_at` integer DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`description` text,
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`updated_at` integer DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`user_name` text NOT NULL,
	FOREIGN KEY (`user_name`) REFERENCES `users`(`name`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`created_at` integer DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`name` text PRIMARY KEY NOT NULL,
	`password` text NOT NULL,
	`updated_at` integer DEFAULT (CURRENT_TIMESTAMP) NOT NULL
);
