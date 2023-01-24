const users = [
  {
    id: '123',
    name: 'Daniel',
    email: 'ancutadaniel@gmail.com',
    age: 30,
  },
  {
    id: '456',
    name: 'John',
    email: 'ancutadaniel@gmail.com',
    age: 31,
  },
  {
    id: '789',
    name: 'Jane',
    email: 'test@test.com',
    age: 32,
  },
];

const posts = [
  {
    id: '1',
    title: 'GraphQL 101',
    body: 'This is my second post',
    published: true,
    author: '456',
  },
  {
    id: '2',
    title: 'GraphQL 201',
    body: 'This is my third post',
    published: false,
    author: '123',
  },
  {
    id: '3',
    title: 'Programming Music',
    body: 'Test',
    published: false,
    author: '123',
  },
];

const comments = [
  {
    id: '101',
    text: 'This worked well for me. Thanks!',
    author: '123',
    postId: '1',
  },
  {
    id: '102',
    text: 'Glad you enjoyed it.',
    author: '123',
    postId: '2',
  },
  {
    id: '103',
    text: 'This did no work',
    author: '456',
    postId: '3',
  },
  {
    id: '104',
    text: 'Never mind. I got it to work.',
    author: '789',
    postId: '3',
  },
];

const db = {
  users,
  posts,
  comments,
};

export default db;
