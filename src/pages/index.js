import Link from 'next/link';
import { GraphQLClient } from 'graphql-request';

export async function getStaticProps() {
  const graphcms = new GraphQLClient(
    'https://api-eu-central-1.graphcms.com/v2/ckhrfor0uooss01yx5vm64ruk/master'
  );

  const { posts } = await graphcms.request(
    `
      { 
        posts {
          slug
          title
        }
      }
    `
  );

  return {
    props: {
      posts,
    },
  };
}

export default ({ posts }) =>
  posts.map(({ slug, title }) => (
    <Link key={slug} href={`/posts/${slug}`}>
      <a>{title}</a>
    </Link>
  ));
