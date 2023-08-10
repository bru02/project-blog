import React from 'react';

import BlogHero from '@/components/BlogHero';

import styles from './postSlug.module.css';
import {
  loadBlogPost,
  readDirectory,
} from '@/helpers/file-helpers';
import { MDXRemote } from 'next-mdx-remote/rsc';
import CodeSnippet from '@/components/CodeSnippet/CodeSnippet';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { notFound } from 'next/navigation';

async function BlogPost({ params: { postSlug } }) {
  const post = await loadBlogPost(postSlug);

  if (!post) return notFound();

  const components = {
    pre: CodeSnippet,
  };
  (await readDirectory('src/components')).forEach(
    (c) => {
      components[c] = dynamic(() =>
        import(`src/components/${c}`)
      );
    }
  );

  return (
    <article className={styles.wrapper}>
      <BlogHero {...post.frontmatter} />
      <div className={styles.page}>
        <MDXRemote
          source={post.content}
          components={{
            pre: CodeSnippet,
            img: Image,
            ...components,
          }}
        ></MDXRemote>
      </div>
    </article>
  );
}

export async function generateMetadata({
  params: { postSlug },
}) {
  const post = await loadBlogPost(postSlug);

  if (!post) return notFound();

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.abstract,
  };
}

export default BlogPost;
