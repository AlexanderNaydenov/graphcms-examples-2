import { GraphQLClient } from 'graphql-request';

const graphcms = new GraphQLClient(
  'https://api-eu-central-1.graphcms.com/v2/ckhrfor0uooss01yx5vm64ruk/master'
);

export async function getStaticProps({ params }) {
  const { post } = await graphcms.request(
    `
    query PostQuery($slug: String!) {
      post(where: { slug: $slug }) {
        title
      }
    }
  `,
    {
      slug: params.slug,
    }
  );

  return {
    props: {
      post,
    },
  };
}

export async function getStaticPaths() {
  const { posts } = await graphcms.request(`
    {
      posts {
        slug
        title
      }
    }
  `);

  return {
    paths: posts.map(({ slug }) => ({
      params: { slug },
    })),
    fallback: false,
  };
}

export default ({ product }) => (
  <React.Fragment>
    <h1>{post.name}</h1>
  </React.Fragment>
);
