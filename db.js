const { ApolloServer, gql } = require('apollo-server');
const fs = require("fs");
const path = require("path");

const heroData = require('./Superhero-data.json');
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.


const typeDefs = require('./src/graphql/superhero.schema.gql')



function getAllHeroes(dataSource) {
    return dataSource.data.results;
};

function getHeroByID(heroId, dataSource) {
    let heroes = getAllHeroes(dataSource);
    let hero = heroes.find(hero => hero.id == heroId.heroId);
    return hero;
};
  
const resolvers = {
    Query: {
        getHero: (_, { id }, { dataSources }) => {
            return getHeroByID({ heroId: id }, dataSources)
        },
        allHeroes: (_, __, { dataSources }) => {
            return getAllHeroes(dataSources);
        },
    }
};              


const server = new ApolloServer({ typeDefs, resolvers, dataSources: () => heroData});

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`)
})