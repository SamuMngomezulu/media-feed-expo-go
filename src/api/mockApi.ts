import { ALL_POSTS, Post } from "../data/posts";

const PAGE_SIZE = 10;

export type Page = { items: Post[]; nextPage: number | null };

export const fetchPosts = async (page: number): Promise<Page> => {
  // 600ms latency
  await new Promise((r) => setTimeout(r, 600));
  // 10% error
  if (Math.random() < 0.1) throw new Error("Network error");

  const start = (page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const slice = ALL_POSTS.slice(start, end);

  return {
    items: slice,
    nextPage: end < ALL_POSTS.length ? page + 1 : null,
  };
};