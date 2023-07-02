import {gql} from "graphql-request";


const GET_POSTS = gql`
query Get_Posts($first: Int, $categoryName: String, $after: String) {
  posts(first: $first, after: $after, where: {categoryName: $categoryName}) {
    nodes {
      id
      title
      slug
      date
      postsFields {
        selectForSlider
      }
      featuredImage{
        node{
          mediaItemUrl
        }
      }
      author {
        node {
          id
          name
          avatar {
            url
          }
        }
      }
      categories(where: {exclude: "sliders"}){
        nodes{
          id
          name
          slug
        }
      }
    }
     pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
    }
  }
}
`


const GET_SEARCH_POSTS =gql`
query Get_Posts($first: Int, $after: String, $id: String) {
  posts(first: $first, after: $after, where: { search: $id}) {
    nodes {
      id
      title
      slug
      date
      postsFields {
        selectForSlider
      }
      featuredImage{
        node{
          mediaItemUrl
        }
      }
      author {
        node {
          id
          name
          avatar {
            url
          }
        }
      }
      categories(where: {exclude: "sliders"}){
        nodes{
          id
          name
          slug
        }
      }
    }
     pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
    }
  }
}
`

const GET_CATEGORIES =gql`
 query Get_Categories {
  categories {
    nodes {
      id
      name
      slug
      count
    }
  }
}
`

const GET_TAGS =gql`
  query Get_Tags {
  tags {
    nodes {
      id
      name
      slug
    }
  }
}
`

const GET_MENUS = gql`
query MenuItems($id: ID!) {
  menu(id: $id, idType: ID) {
    id
    name
    menuItems(first: 100) {
      nodes {
        id
        label
        parentId
        path
        description
        childItems {
          nodes {
            id
            parentId
            label
            path
            childItems {
              nodes {
                id
                parentId
                label
                path
              }
            }
          }
        }
      }
    }
  }
}
`

const GET_POST =gql`
 query Get_Post($id: ID!) {
  post(id: $id, idType: SLUG) {
    id
    title
    date
    featuredImage {
      node {
        mediaItemUrl
      }
    }
    excerpt
    content
    author {
        node {
          id
          name
          avatar {
            url
          }
        }
    }
    commentCount
    comments {
      nodes {
        id
        content
        date
        status
        parentId
        replies {
          nodes {
            id
            status
            date
            content
            author {
              node {
                id
                name
                url
              }
            }
          }
        }
        author {
          node {
            id
            name
            url
          }
        }
      }
    }
    categories(where: {exclude: "sliders"}) {
      nodes {
        id
        name
        slug
        count
      }
    }
    tags{
      nodes{
        id
        name
        slug
      }
    }
  }
}
`

const GET_POSTS_BY_CATEGORY =gql`
   query Get_Posts_by_Category($id: ID!, $first: Int, $after: String) {
  category(id: $id, idType: SLUG) {
    name
    id
    slug
    description
    posts(first: $first, after: $after) {
      nodes {
        id
        title
        slug
        date
        postsFields {
          selectForSlider
        }
        featuredImage {
          node {
            mediaItemUrl
          }
        }
        author {
          node {
            id
            name
            avatar {
              url
            }
          }
        }
        categories {
          nodes {
            id
            name
            slug
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
      }
    }
  }
}
`

const GET_TAG =gql`
query Get_Tag($id: ID!, $first: Int, $after: String) {
  tag(idType: SLUG, id: $id) {
    id
    name
    count
    posts(first: $first, after: $after) {
      nodes {
        id
        title
        slug
        date
        postsFields {
          selectForSlider
        }
        featuredImage {
          node {
            mediaItemUrl
          }
        }
        author {
          node {
            id
            name
            avatar {
              url
            }
          }
        }
        categories {
          nodes {
            id
            name
            slug
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
      }
    }
  }
}
`

const GET_ADS_CODES=gql`
    query Get_Ads_Codes {
  blogifySettings {
    placement1
    placement2
    placement3
    placement4
    placement6
    placement5
    placement7
    placement8
    placement9
    placement10
    placement11
    placement12
    placement13
    placement14
    placement15
    placement16
    placement18
    placement19
    placement20
  }
}
`
const GET_SOCIAL_MEDIAS=gql`
    query Get_Social {
  blogifySettings {
    blogify_youtube
    blogify_instagram
    blogify_twitter
    blogify_facebook
  }
}
`


export {GET_SOCIAL_MEDIAS, GET_ADS_CODES, GET_TAG, GET_POST, GET_POSTS_BY_CATEGORY, GET_MENUS, GET_TAGS, GET_CATEGORIES, GET_POSTS, GET_SEARCH_POSTS}