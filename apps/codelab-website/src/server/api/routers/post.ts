import {z} from 'zod';
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from '~/server/api/trpc';
import {posts} from '~/server/db/schema';

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({text: z.string()}))
    .query(({input}) => ({
      greeting: `Hello ${input.text}`,
    })),

  create: protectedProcedure
    .input(z.object({name: z.string().min(1)}))
    .mutation(async ({ctx, input}) => {
      await ctx.db.insert(posts).values({
        name: input.name,
        // CreatedById: ctx.session.user.id,
        createdById: 'bruh',
      });
    }),

  getLatest: publicProcedure.query(async ({ctx}) => {
    const post = await ctx.db.query.posts.findFirst({
      orderBy: (posts, {desc}) => [desc(posts.createdAt)],
    });

    return post ?? null;
  }),

  getSecretMessage: protectedProcedure.query(() => 'you can now see this secret message!'),
});
