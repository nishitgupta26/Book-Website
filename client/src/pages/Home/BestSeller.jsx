import React, { useEffect, useState } from 'react'
import BookCards from '../shared/BookCards';

const BestSeller = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch("${import.meta.env.VITE_API_URL}/all-books").then(res => res.json()).then(data => setBooks(data.slice(0, 7)))
    }, [])

    return (
        <>
            <BookCards books={books} headline={"Best Seller Books"} />
        </>
    )
}

export default BestSeller