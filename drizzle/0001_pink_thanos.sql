CREATE TABLE IF NOT EXISTS "jule_kalender_challenge" (
	"id" integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY (sequence name "jule_kalender_challenge_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"title" varchar(255) NOT NULL,
	"description" text,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "jule_kalender_challenge_submission" (
	"id" integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY (sequence name "jule_kalender_challenge_submission_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"challenge_id" integer NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"code" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "jule_kalender_challenge_test" (
	"id" integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY (sequence name "jule_kalender_challenge_test_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"challenge_id" integer NOT NULL,
	"input" text NOT NULL,
	"output" text NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "challenge_title_idx" ON "jule_kalender_challenge" USING btree ("title");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "challenge_submission_challenge_id_idx" ON "jule_kalender_challenge_submission" USING btree ("challenge_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "challenge_submission_user_id_idx" ON "jule_kalender_challenge_submission" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "challenge_test_challenge_id_idx" ON "jule_kalender_challenge_test" USING btree ("challenge_id");