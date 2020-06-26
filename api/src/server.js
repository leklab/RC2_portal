//import express from 'express'
//import compression from 'compression'
//import { MongoClient } from 'mongodb'
//import elasticsearch from 'elasticsearch'
//import graphQLHTTP from 'express-graphql'
//import cors from 'cors'
//import Redis from 'ioredis'
//import serveStatic from 'serve-static'
//import pcgcSchema from './pcgc_schema'


//var elasticsearch = require('elasticsearch')
//var express = require('express');
//var graphQLHTTP = require('express-graphql');
//var { buildSchema } = require('graphql');


import elasticsearch from 'elasticsearch'
import graphQLHTTP from 'express-graphql'
import express from 'express'
import pcgcSchema from './schema'


const app = express()
//app.use(compression())
//app.use(cors())

// Construct a schema, using GraphQL schema language
/*
var schema = buildSchema(`
  type Query {
    hello: String
  }
`);
*/



// The root provides a resolver function for each API endpoint
/*
var root = {
  hello: () => {
    return 'Hello world!';
  },
};
*/


// eslint-disable-line prettier/prettier
;(async () => {
  try {

    const elastic = new elasticsearch.Client({
      apiVersion: '5.6',
      host: "http://localhost:9200",
    })

    app.use(
      [/^\/$/, /^\/api\/?$/],
      graphQLHTTP({
        schema: pcgcSchema,
        //rootValue: root,
        graphiql: true,
        context: {
          database: {
            elastic
          },
        },
      })
    )

    app.get('/health', (req, res) => {
      res.json({})
    })

    app.listen(4000, () => {
      console.log(`Listening on 4000`)
    })
  } catch (error) {
    console.log(error)
  }
})()






/*
var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hello world!';
  },
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000,'0.0.0.0');
console.log('Running a GraphQL API server at http://0.0.0.0:4000/graphql');
*/
