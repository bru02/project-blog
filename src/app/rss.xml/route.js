import { BLOG_TITLE } from '@/constants';
import { getBlogPostList } from '@/helpers/file-helpers';
import RSS from 'rss';

export async function GET(req) {
  const { origin } = new URL(req.url);

  const feed = new RSS({
    title: BLOG_TITLE,
    site_url: origin,
    feed_url: origin + '/rss.xml',
  });

  const posts = await getBlogPostList();

  for (const {
    title,
    abstract,
    slug,
    publishedOn,
  } of posts) {
    feed.item({
      title,
      description: abstract,
      guid: slug,
      url: origin + '/' + slug,
      date: publishedOn,
    });
  }

  return new Response(feed.xml(), {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
