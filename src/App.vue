<template>
  <h1 v-if="heroSelected == false">
    {{message}}
  </h1>

  <div class="header" v-if="heroSelected == true">
    <h1 class="hero-title">
      {{selectedHero.name}}
    </h1>
    <button class="return-button" @click="returntoList()">Return to List</button>
  </div>

  <table class="comic-table" v-if="heroSelected == true">
    <tr>
      <th>Name</th>
    </tr>
    <tr v-for="comic in selectedHero.comics.items" :key="comic.name">
      <td>{{comic.name}}</td>
    </tr>
  </table> 

  <table class="comic-table" v-if="heroSelected == false">
    <tr>
      <th style="width: 60%;">Name</th>
      <th>Number of Comics</th>
    </tr>
    <tr v-for="result in heroes" :key="result.id">
      <td>
        <span @click="selectHero(result)">
          {{result.name}}
        </span>
      </td>
      <td>{{result.comics.available}}</td>
    </tr>
  </table>

</template>

<script>
import { ref } from 'vue'
import {useQuery, useResult } from '@vue/apollo-composable'
import allHeroesQuery from './graphql/allHeroes.query.gql'

// This import was for an attempt to get a secondary graphQL call working but I was unable to do so at this time.
// import getHeroByIDQuery from './graphql/getHeroByID.query.gql'

export default {
  name: 'App',
  components: {
  },
  setup() {
    const message = 'Marvel Comic Database'
    let heroSelected = ref(false)
    let variable = ref({id: 0})
    let selectedHero = ref({})

    const { result } = useQuery(allHeroesQuery)
    const heroes = useResult(result, null, data => data.allHeroes)

    // These are part of the above refrenced secondary call
    //const {query} = useQuery(getHeroByIDQuery, variable)
    //const selectedHero = useResult(query, null, data => data.getHero)

    return { message, heroes, variable, selectedHero, heroSelected }
  },
  methods: {
    selectHero(hero) {
      this.heroSelected = true
      this.selectedHero = hero
    },
    returntoList() {
     this.selectedHero = {}
     this.heroSelected = false
    }
  }
}
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.header {
  display: flex;
  justify-content: space-around;
}

.return-button {
  background-color: #4CAF50; /* Green */
  border: black solid 1px;
  color: white;
  text-align: center;
  text-decoration: none;
  display: flex;
  font-size: 16px;
  max-height: 20px;
  max-width: 10%;
  align-self: center; 
  margin-bottom: 10px;
}

.hero-title {
  margin-right: 44%;
}
.comic-table {
  border-collapse: collapse;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
}
tr:nth-child(even) {
  background-color: #f2f2f2;
}
.comic-table, th{
  border: 2px solid black;
}
th {
  background-color: #d4d4d4;
}
td, th {
  text-align: left;
  border-left: 2px solid black;
  padding: 10px;
}
</style>
