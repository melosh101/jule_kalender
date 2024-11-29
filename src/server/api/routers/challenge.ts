import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";
import { and, eq } from "drizzle-orm";
import { challenge, challengeSubmissions } from "~/server/db/schema";

export const challengeRouter = createTRPCRouter({
    getChallenge: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
        const chal = await ctx.db.query.challenge.findFirst({
            where: eq(challenge?.id, input.id),
        });

        return chal ?? null;
    }),

    getAllChallenges: publicProcedure
    .query(async ({ ctx }) => {
        return await ctx.db.query.challenge.findMany();
    }),

    getChallengeWithSubmissions: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {

        const chal = await ctx.
        db.select().from(challenge)
        .where(eq(challenge?.id, input.id))
        .leftJoin(challengeSubmissions, and(eq(challengeSubmissions?.challengeId, challenge?.id), eq(challengeSubmissions?.userId, ctx.session.user.id)));

        return chal[0] ?? null;
    }),

    saveSubmission: protectedProcedure
    .input(z.object({ challengeId: z.number(), code: z.string() }))
    .mutation(async ({ ctx, input }) => {
        const pastSubmission = await ctx.db.query.challengeSubmissions.findFirst({
            where: and(
                eq(challengeSubmissions?.challengeId, input.challengeId),
                eq(challengeSubmissions?.userId, ctx.session.user.id),
            )
        })
        if(!pastSubmission) {
            await ctx.db.insert(challengeSubmissions).values({
                challengeId: input.challengeId,
                userId: ctx.session.user.id,
                code: input.code,
            });
            return;
        };

        await ctx.db.update(challengeSubmissions).set({
            code: input.code,
        }).where(and(
            eq(challengeSubmissions?.id, pastSubmission.id),
            eq(challengeSubmissions?.userId, ctx.session.user.id),
        ));
    }),
});