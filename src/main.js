import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { createApp, h, provide } from 'vue'
import App from './App.vue'

export const defaultClient = new ApolloClient({
    uri: 'http://localhost:4000',
    cache: new InMemoryCache()
})

//This setup acts as bridge for old apollo-client creation with Vue 3
createApp({
    setup() {
        provide(DefaultApolloClient, defaultClient)
    },
    render() {
        return h(App)
    }
}).mount('#app')
