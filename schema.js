const axios = require("axios");
const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema
} = require("graphql");

// Launch type
const LaunchType = new GraphQLObjectType({
  name: "Launch",
  fields: () => ({
    flight_number: { type: GraphQLInt },
    mission_name: { type: GraphQLString },
    launch_year: { type: GraphQLString },
    launch_date_local: { type: GraphQLString },
    launch_success: { type: GraphQLBoolean },
    rocket: { type: RocketType }
  })
});

// Rocket type (Creating relationships with schema)

const RocketType = new GraphQLObjectType({
  name: "Rocket",
  fields: () => ({
    rocket_id: { type: GraphQLString },
    rocket_name: { type: GraphQLString },
    rocket_type: { type: GraphQLString }
  })
});

// Root query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    launches: {
      type: new GraphQLList(LaunchType),
      resolve(parent, args) {
        return axios
          .get("https://api.spacexdata.com/v3/launches")
          .then(res => res.data);
      }
    },
    launch: {
      // For single launch don't need to use graphQltype
      type: LaunchType,
      // Which launch to get (args = argument)
      args: {
        flight_number: { type: GraphQLInt }
      },
      resolve(parent, args) {
        // Request to get the single launch
        return axios
          .get(`https://api.spacexdata.com/v3/launches/${args.flight_number}`)
          .then(res => res.data);
      }
    },

    rockets: {
      type: new GraphQLList(RocketType),
      resolve(parent, args) {
        return axios
          .get("https://api.spacexdata.com/v3/rockets")
          .then(res => res.data);
      }
    },
    rocket: {
      // For single rocket don't need to use graphQltype
      type: RocketType,
      // Which rocket to get (args = argument)
      args: {
        id: { type: GraphQLInt }
      },
      resolve(parent, args) {
        // Request to get the single rocket
        return axios
          .get(`https://api.spacexdata.com/v3/rockets/${args.id}`)
          .then(res => res.data);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  // Takes in object query
  query: RootQuery
});
