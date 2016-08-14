# todo-react

Example forked from [angular-apollo-todo-example](https://github.com/graphcool-examples/angular-apollo-todo-example)

## Getting Started

I have used an early access to a [graph.cool](http://graph.cool) account. Code only for reference purposes.

The GraphQL data model used is:

```graphql
type Todo {  
  id: ID!
  text: String!
  complete: Boolean!
}

type Query {
  allTodoes(skip: Int, take: Int): [Todo!]!
}

type Mutation {
  createTodo(text: String!, complete: Boolean!): Todo
  updateTodo(id: ID!, text: String, complete: Boolean): Todo
}

schema { 
  query: Query,  
  mutation: Mutation 
}
```