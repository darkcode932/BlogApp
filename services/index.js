import { request, gql } from 'graphql-request'

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT

/* Fonction permettant de recuperer les posts de du Backend*/
export const getPosts = async() => {
    const query = gql `
    query MyQuery {
      postsConnection {
        edges {
          node {
            author {
              bio
              name
              id
              photto {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `

    const result = await request(graphqlAPI, query)

    return result.postsConnection.edges
}

/**Fonction qui recupère les details des posts et les affiche à l'utilisateur */

export const getPostDetails = async(slug) => {
    const query = gql `
    query GetPostDetails($slug: String!) {
      post(where: { slug: $slug }) {
        author {
          bio
          name
          id
          photto {
            url
          }
        }
        createdAt
        slug
        title
        excerpt
        featuredImage {
          url
        }
        categories {
          name
          slug
        }
        content{
          raw
        }
      }
    }
  `

    const result = await request(graphqlAPI, query, { slug })

    return result.post;
}

/**Fonction qui classe le type de post en fonction de sa categorie */

export const getCategoryPost = async(slug) => {
    const query = gql `
    query GetCategoryPost($slug: String!) {
      postsConnection(where: {categories_some: {slug: $slug}}) {
        edges {
          cursor
          node {
            author {
              bio
              name
              id
              photto {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;

    const result = await request(graphqlAPI, query, { slug });

    return result.postsConnection.edges;
};

/**fonction qui affiche les posts du plus recent en fonction du paramètre ed la date à laquelle
 * elle a été cree  */

export const getRecentPosts = async() => {
    const query = gql `
  query GetPostDetails {
    posts(orderBy: createdAt_DESC, last: 3) {
      title
      featuredImage {
        url
      }
      createdAt
      slug
    }
  }
`
    const result = await request(graphqlAPI, query);

    return result.posts;
}

/**Fonction pour les posts Adjacents */

export const getAdjacentPosts = async(createdAt, slug) => {
    const query = gql `
    query GetAdjacentPosts($createdAt: DateTime!,$slug:String!) {
      next:posts(
        first: 1
        orderBy: createdAt_ASC
        where: {slug_not: $slug, AND: {createdAt_gte: $createdAt}}
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
      previous:posts(
        first: 1
        orderBy: createdAt_DESC
        where: {slug_not: $slug, AND: {createdAt_lte: $createdAt}}
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;

    const result = await request(graphqlAPI, query, { slug, createdAt });

    return { next: result.next[0], previous: result.previous[0] };
};

/**Fonction qui regroupe les posts en fonction de leur similarité */
export const getSimilarPosts = async(categories, slug) => {
    const query = gql `
    query GetPostDetails($slug: String!, $categories: [String!]) {
      posts(
        where: {
          slug_not: $slug
          AND: { categories_some: { slug_in: $categories } }
        }
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `

    const result = await request(graphqlAPI, query, { categories, slug });

    return result.posts;
}

/**Fonction de recuperation de sdifferentes categories de Post creee en backend */

export const getCategories = async(slug) => {
    const query = gql `
    query GetCategories {
      categories {
        name
        slug
      }
    }
  `

    const result = await request(graphqlAPI, query, { slug });

    return result.categories;
}

/**Fonction de soumission d'un comment */
export const submitComment = async(obj) => {
    const result = await fetch('/api/comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
    });

    return result.json();
}

/**Fonction de recuperation et d'affichage des commentaires apres avoir été soumis par un user */
export const getComments = async(slug) => {
    const query = gql `
  query GetComments($slug: String!) {
    comments(where: { post: { slug: $slug } }) {
      name
      createdAt
      comment
    }
  }
`

    const result = await request(graphqlAPI, query, { slug });

    return result.comments;
}

/**Fonction qui recuperer et affiche les diifferents features d'un post (photo, titre....)
 * pour affiche les differents posts dans la page d'accueil en carousel */


export const getFeaturedPosts = async() => {
    const query = gql `
    query GetCategoryPost() {
      posts(where: {featuredPost: true}) {
        author {
          name
          photto {
            url
          }
        }
        featuredImage {
          url
        }
        title
        slug
        createdAt
      }
    }   
  `;

    const result = await request(graphqlAPI, query);

    return result.posts;
};