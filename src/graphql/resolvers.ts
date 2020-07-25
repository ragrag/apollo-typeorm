import { AuthenticationError } from "apollo-server-express";
import { User } from "src/entities/User";

interface Book {
  title: String;
  author: Author;
}

interface Author {
  name: String;
  books?: Book[];
}
const jk: Author = { name: "J.K. Rowling" };
const mc: Author = { name: "Michael Crichton" };

const hp: Book = {
  title: "Harry Potter and the Chamber of Secrets",
  author: jk,
};

const hpp: Book = {
  title: "Harry Potter and the Half Blood Prince",
  author: jk,
};

const jp: Book = {
  title: "Jurassic Park",
  author: mc,
};

jk.books = [hp, hpp];
mc.books = [jp];

const books: Book[] = [hp, jp];
const authors: Author[] = [jk, mc];

const resolvers = {
  User: {
    books: (): Book[] => {
      return books;
    },
  },
  Query: {
    user: (parent, args, context, info): User => {
      if (!context.user) throw new AuthenticationError("must authenticate");
      return context.user;
    },
  },
};

export { resolvers };
