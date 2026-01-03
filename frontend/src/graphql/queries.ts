import { gql } from "@apollo/client";

export const GET_NPM_PACKAGES = gql`
  query GetNpmPackages {
    npmPackages {
      name
      version
      description
      author
      weeklyDownloads
    }
  }
`;

export const GET_GNEWS = gql`
query GetGNews($category: String, $country: String, $search: String, $first: Int, $after: String) {
  gNews(category: $category, country: $country, search: $search, first: $first, after: $after) {
    edges {
      cursor
      node {
        title
        url
        source
        publishedAt
        description
        image
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
`;

export const GET_GITHUBBLOG = gql`
  query GetGithubBlog($first: Int, $after: String) {
  githubBlog(first: $first, after: $after) {
    edges {
      cursor
      node {
        title
        url
        publishedAt
        description
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
`

export const GET_FREECODECAMP = gql`
  query GetFreeCodeCamp($first: Int, $after: String) {
  freeCodeCamp(first: $first, after: $after) {
    edges {
      cursor
      node {
        title
        url
        publishedAt
        description
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
`;

export const GET_TOPNEWS = gql`
  query GetTopNews($category: String, $language: String, $page: Int) {
  topNews(category: $category, language: $language, page: $page) {
    edges {
      node {
        title
        url
        publishedAt
        description
        image
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
`

export const GET_DEVTO_ARTICLES = gql`
  query GetDevToArticles($first: Int, $page: Int, $tag: String, $state: String, $top: Int) {
    devTo(first: $first, page: $page, tag: $tag, state: $state, top: $top) {
      edges {
        cursor
        node {
          id
          title
          url
          publishedAt
          description
          image
          user {
            username
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
        nextPage
      }
    }
  }
`;



// export const GET_MIXFEED = gql`
//   query GetMixFeed($first: Int, $after: String) {
//   freeCodeCamp(first: $first, after: $after) {
//     edges {
//       cursor
//       node {
//         title
//         url
//         publishedAt
//         description
//       }
//     }
//     pageInfo {
//       hasNextPage
//       endCursor
//     }
//   }
//   githubBlog(first: $first, after: $after) {
//     edges {
//       cursor
//       node {
//         title
//         url
//         publishedAt
//         description
//       }
//     }
//     pageInfo {
//       hasNextPage
//       endCursor
//     }
//   }
//    gNews(first: $first, after: $after) {
//     edges {
//       cursor
//       node {
//         title
//         url
//         source
//         publishedAt
//         description
//         image
//       }
//     }
//     pageInfo {
//       hasNextPage
//       endCursor
//     }
//   }
// }
// `;