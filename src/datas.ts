import { Author, Book } from './types';

export const authors: Author[] = [
  { id: 1, name: 'Simon Sinek', email: 'simon@example.com' },
  { id: 2, name: 'Malcolm Gladwell', email: 'malcolm@example.com' },
];

export const books: Book[] = [
  { id: 1, title: 'Start with Why', authorId: 1 },
  { id: 2, title: 'The Tipping Point', authorId: 2 },
  { id: 3, title: 'Leaders Eat Last', authorId: 1 },
  { id: 4, title: 'Outliers', authorId: 2 },
];
