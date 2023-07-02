import { GraphQLClient } from 'graphql-request'
  

  const client = new GraphQLClient(`${process.env.NEXT_PUBLIC_WORDPRESS_BACKEND_URI}/graphql`)
  
  export default client;
  
  