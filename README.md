# superherodatabase

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
These are using standard ports for Apollo and Vue, if these are in use you will need to provide alternative ports and update the main.js accordingly.

node db.js  <---- This runs the apollo server hosting the JSON loading and graphql server portion of the app.
npm run serve  <---- This runs the Vue portion of the application 
```

### Future Improvements
```
1. Hero specific Graphql call to avoid having to return comics[] in tehe getAllHeroes query.
2. Pagination of table to allow for better browsing.
```
