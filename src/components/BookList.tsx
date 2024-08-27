import { useEffect, useState } from 'react';
import { getBooks, deleteBook } from '../services/api';
import { Link } from 'react-router-dom';

interface Book {
    id: string;
    titulo: string;
    autor: string;
    dt_lancamento: number;
    genero: string;
    num_paginas: number;
}

function BookList() {

    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        loadBooks();
    }, []);

    const loadBooks = async () => {
        const response = await getBooks();
        setBooks(response.data);
    };

    const handleDelete = async (id: string) => {
        await deleteBook(id);
        loadBooks();
    };

    return (
        <div>
            <h1>Book List</h1>
            <Link to="/add">Add Book</Link>
            <ul>
                {books.map((book) => (
                    <li key={book.id}>
                        {book.titulo} <br /> Autor: {book.autor} <br /> Genero: {book.genero} <br /> Data de lancamento: {book.dt_lancamento} 
                        <Link to={`/edit/${book.id}`}> <br />  Edit <br /></Link>
                        <button onClick={() => handleDelete(book.id)}> Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default BookList;