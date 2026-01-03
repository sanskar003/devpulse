export const typeDefs = `#graphql


  type GNews {
    title: String
    url: String
    source: String
    publishedAt: String
    description: String
    image: String
  }

  # Cursor pagination helpers
  type PageInfo {
    hasNextPage: Boolean!
    endCursor: String
    nextPage: Int
  }

  type GNewsEdge {
    cursor: String!
    node: GNews!
  }

  type GNewsConnection {
    edges: [GNewsEdge!]!
    pageInfo: PageInfo!
  }

  type GithubBlog {
    title: String
    url: String
    publishedAt: String
    description: String
  }

  type GithubBlogEdge {
    cursor: String!
    node: GithubBlog!  
  }

  type GithubBlogConnection {
    edges: [GithubBlogEdge!]!
    pageInfo: PageInfo!
  }

  type FreeCodeCamp {
    title: String
    url: String
    publishedAt: String
    description: String
  }

  type FreeCodeCampEdge {
    cursor: String!
    node: FreeCodeCamp!
  }

  type FreeCodeCampConnection {
    edges: [FreeCodeCampEdge!]!
    pageInfo: PageInfo!
  }

  type TopNews {
    title: String
    url: String
    publishedAt: String
    description: String
    image: String
  }

  type TopNewsEdge {
    cursor: String!
    node: TopNews!
  }

  type TopNewsConnection {
    edges: [TopNewsEdge!]!
    pageInfo: PageInfo!
  }

  type DevToUser {
    username: String!
  }

  type DevTo {
    id: Int
    title: String
    url: String
    description: String
    publishedAt: String
    image: String
    user: DevToUser
  }

  type DevTOEdge {
    cursor: String!
    node: DevTo!
  }

  type DevToConnection {
    edges: [DevTOEdge!]!
    pageInfo: PageInfo!
  }

  type Query {
    gNews(category: String, country: String, search: String,first: Int, after: String): GNewsConnection!
    githubBlog(first: Int, after: String): GithubBlogConnection!
    freeCodeCamp(first: Int, after: String): FreeCodeCampConnection!
    topNews(category: String, language: String, country: String, page: Int): TopNewsConnection!
    devTo(first: Int, page: Int, tag: String, state: String, top: Int): DevToConnection!
  }
`;