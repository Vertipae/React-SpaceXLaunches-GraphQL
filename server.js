const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema");

// Initializing express
const app = express();

// Only one endpoint needed
app.use(
  "/graphql",
  graphqlHTTP({
    // Pointing to schema
    schema,
    // Set this to false if you don't want the graphical tool in http://localhost:5000/graphql
    graphiql: true
  })
);

const PORT = process.env.PORT || 5000;
// Listening a port
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
