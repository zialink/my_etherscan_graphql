// Apollo Server setup
const { ApolloServer } = require("apollo-server");

// Import schema
const { importSchema } = require("graphql-import");

// Data source
const EtherDataSource = require("./datasource/ethDatasource");

// Import schema
const typeDefs = importSchema("./schema.graphql");

require("dotenv").config();

// Resolvers
const resolvers = {
  Query: {
    etherBalanceByAddress: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.etherBalanceByAddress(),

    totalSupplyOfEther: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.totalSupplyOfEther(),

    latestEthereumPrice: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.getLatestEthereumPrice(),

    blockConfirmationTime: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.getBlockConfirmationTime(),
  },
};

// Initialize Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    ethDataSource: new EtherDataSource(),
  }),
});

// Set timeout and start server
server.timeout = 10000;
server.listen("9000").then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

// Code comments inserted
