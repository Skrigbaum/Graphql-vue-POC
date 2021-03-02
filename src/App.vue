<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
  <h1>
    {{message}}
  </h1>
  <ul>
    <li v-for="result in heroes" :key="result.id">
        <h2>{{ result.name}}</h2>
        <button>Delete Heroes</button>
    </li>
  </ul>

</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import { ref } from 'vue'
import { useQuery, useResult, useMutation } from '@vue/apollo-composable'
import allHeroesQuery from './graphql/allHeroes.query.gql'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  setup() {
    const message = ref('Hello Spencer!!')
    const { result } = useQuery(allHeroesQuery)
    const queryResult = useResult(result, null, data => data.characters)
    const heroes = useResult(queryResult, null, data => data.results)

    const {mutate: deleteHero} = useMutation()
    return { message, heroes }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
