import { ApolloClient, InMemoryCache } from 'apollo-client-preset'
import { ApolloLink } from 'apollo-link'
import { createHttpLink } from 'apollo-link-http'
import { AsyncStorage } from 'react-native'
import config from './config'

const httpLink = createHttpLink({ uri: config.backendUrl })
const header = AsyncStorage.getItem('token')
const middlewareLink = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization: header || null
    }
  })
  return forward(operation)
})

const link = middlewareLink.concat(httpLink)

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
})

export default client
