// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './src/data.db3'
    },
    useNullAsDefault: true, 
    migrations: {
      directory: './src/migrations'
    },
    seeds: {
      directory: './src/seeds'
    },
  },

  // Heroku will look for a 'production' configuration
  production: {
    client: "pg", // npm i pg
    connection: process.env.DATABASE_URL, // provided by Heroku
    migrations: {
      directory: "./migrations",
    },
    seeds: {
      directory: "./seeds",
    },
  },

};
