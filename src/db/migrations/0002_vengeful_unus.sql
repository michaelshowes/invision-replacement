ALTER TABLE "invitation" ADD COLUMN "project_id" text;--> statement-breakpoint
ALTER TABLE "session" ADD COLUMN "active_project_id" text;