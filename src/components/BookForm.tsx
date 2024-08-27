import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createBook, getBookById, updateBook } from '../services/api';

interface Book {
    titulo: string;
    autor: string;
    dt_lancamento: number;
    genero: string;
    num_paginas: number;
}

function BookForm() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [book, setBook] = useState<Book>({
        titulo: '',
        autor: '',
        dt_lancamento: 0,
        genero: '',
        num_paginas: 0,
    });

    useEffect(() => {
        if (id) {
            loadBooks();
        }
    }, [id]);

    const loadBooks = async () => {
        try {
            const response = await getBookById(id as string);
            setBook(response.data);
        } catch (error) {
            console.error("Error loading product data", error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBook({
            ...book,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if(book.autor || book.dt_lancamento || book.genero || book.num_paginas || book.titulo == null){
                alert("Informe novamente os campos em branco")

            }
            if (id) {
                await updateBook(id, book);
            } else {
                await createBook(book);
            }
            navigate('/');
        } catch (error) {
            console.error("Error saving product", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Titulo</label>
                <input
                    type="text"
                    name="titulo"
                    value={book.titulo}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>autor</label>
                <input
                    type="text"
                    name="autor"
                    value={book.autor}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label>data de lancamento</label>
                <input
                    type="number"
                    name="dt_lancamento"
                    value={book.dt_lancamento}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Genero</label>
                <input
                    type="text"
                    name="genero"
                    value={book.genero}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>numero de paginas</label>
                <input
                    type="number"
                    name="num_paginas"
                    value={book.num_paginas}
                    onChange={handleChange}
                />
            </div>
            <button type="submit">Save</button>
        </form>
    );
}

export default BookForm;