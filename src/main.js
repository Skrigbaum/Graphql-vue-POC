import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { createApp, h, provide } from 'vue'
import App from './App.vue'

const defaultClient = new ApolloClient({
    uri: 'https://rickandmortyapi.com/graphql',
    cache: new InMemoryCache()
})

// const query = gql`
//     query {
//         characters {
//             results {
//                 name
//             }
//         }
//     }
// `

// defaultClient.query({
//     query
// }).then(res => console.log(res))


//This setup acts as bridge for old apollo-client creation with Vue 3
createApp({
    setup() {
        provide(DefaultApolloClient, defaultClient)
    },
    render() {
        return h(App)
    }
}).mount('#app')
