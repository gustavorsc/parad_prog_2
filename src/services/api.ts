import axios from 'axios';
const api = axios.create({
 baseURL: 'http://localhost:3001'
});
export const getBooks = () => api.get('/books');
export const getBookById = (id: string) => api.get(`/books/${id}`);
export const createBook = (book: any) => api.post('/books', book);
export const updateBook = (id: string, book: any) => api.put(`/books/${id}`, book);
export const deleteBook = (id: string) => api.delete(`/books/${id}`);