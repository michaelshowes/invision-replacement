ALTER TABLE "accounts" RENAME TO "account";--> statement-breakpoint
ALTER TABLE "invitations" RENAME TO "invitation";--> statement-breakpoint
ALTER TABLE "members" RENAME TO "member";--> statement-breakpoint
ALTER TABLE "organizations" RENAME TO "organization";--> statement-breakpoint
ALTER TABLE "projects" RENAME TO "project";--> statement-breakpoint
ALTER TABLE "project_members" RENAME TO "project_member";--> statement-breakpoint
ALTER TABLE "sessions" RENAME TO "session";--> statement-breakpoint
ALTER TABLE "users" RENAME TO "user";--> statement-breakpoint
ALTER TABLE "verifications" RENAME TO "verification";--> statement-breakpoint
ALTER TABLE "sections" RENAME TO "section";--> statement-breakpoint
ALTER TABLE "organization" DROP CONSTRAINT "organizations_slug_unique";--> statement-breakpoint
ALTER TABLE "session" DROP CONSTRAINT "sessions_token_unique";--> statement-breakpoint
ALTER TABLE "user" DROP CONSTRAINT "users_email_unique";--> statement-breakpoint
ALTER TABLE "account" DROP CONSTRAINT "accounts_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "invitation" DROP CONSTRAINT "invitations_organization_id_organizations_id_fk";
--> statement-breakpoint
ALTER TABLE "invitation" DROP CONSTRAINT "invitations_inviter_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "member" DROP CONSTRAINT "members_organization_id_organizations_id_fk";
--> statement-breakpoint
ALTER TABLE "member" DROP CONSTRAINT "members_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "project" DROP CONSTRAINT "projects_organization_id_organizations_id_fk";
--> statement-breakpoint
ALTER TABLE "project_member" DROP CONSTRAINT "project_members_project_id_projects_id_fk";
--> statement-breakpoint
ALTER TABLE "project_member" DROP CONSTRAINT "project_members_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "session" DROP CONSTRAINT "sessions_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "section" DROP CONSTRAINT "sections_project_id_projects_id_fk";
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invitation" ADD CONSTRAINT "invitation_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invitation" ADD CONSTRAINT "invitation_inviter_id_user_id_fk" FOREIGN KEY ("inviter_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "member" ADD CONSTRAINT "member_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "member" ADD CONSTRAINT "member_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project" ADD CONSTRAINT "project_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project_member" ADD CONSTRAINT "project_member_project_id_project_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."project"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project_member" ADD CONSTRAINT "project_member_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "section" ADD CONSTRAINT "section_project_id_project_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."project"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "organization" ADD CONSTRAINT "organization_slug_unique" UNIQUE("slug");--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_token_unique" UNIQUE("token");--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_email_unique" UNIQUE("email");