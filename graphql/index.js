import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { from } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
export default (ctx) => {
  const ssrMiddleware = setContext((_, { headers }) => {
    const token = localStorage.getItem('auth._token.local');
    return {
      headers: {
        ...headers,
        authorization: token ? `${token}` : null,
      },
    };
  });
  const httpLink = new HttpLink({
    uri: process.env.API_BASE_URL + '/graphql',
    withCredentials: true,
  });
  const link = from([ssrMiddleware, httpLink]);
  const cache = new InMemoryCache();

  return {
    link,
    cache,
    defaultHttpLink: false,
  };
};
