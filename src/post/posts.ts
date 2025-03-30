import { lazy, LazyExoticComponent } from "react";

const files = import.meta.glob<{ default: () => React.ReactNode }>(
  "../../posts/**/*.mdx"
);
// Sort descending
const paths = Object.keys(files).sort((a, b) => b.localeCompare(a));
console.log(paths);

const pathRe = /(\d+)\/(\d+)\/(\d+)-([^\/]+)\.mdx$/;
export type Post = {
  name: string;
  path: string;
  date: string;
  file: () => Promise<{
    default: () => React.ReactNode;
  }>;
  page: number;
  total: number;
  prev?: Post;
  next?: Post;
  Component: LazyExoticComponent<() => React.ReactNode>;
};

export const posts: Post[] = paths.map((path, idx) => {
  const re = pathRe.exec(path);
  if (!re) {
    throw new Error(`Malformed name: ${JSON.stringify(path)}`);
  }
  const [_, year, month, day, name] = re;
  const Component = lazy(files[path]);
  return {
    name,
    page: idx + 1,
    date: `${year}-${month}-${day}`,
    total: paths.length,
    file: files[path],
    path: idx === 0 ? "/" : `/${year}/${month}/${day}/${name.toLowerCase()}`,
    Component,
  };
});

for (let i = 0; i < posts.length; ++i) {
  posts[i].prev = posts[i - 1];
  posts[i].next = posts[i + 1];
}
