import React, { useContext, useEffect, useState } from 'react'
import { Card, Spinner } from 'flowbite-react';
import { AuthContext } from '../../contexts/AuthProvider';
import Modal from 'react-modal';

export default function Shop() {
  const {loading } = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const [hoveredBookId, setHoveredBookId] = useState(null); // State for the hovered book ID

// fetching data
  useEffect(() =>{
    fetch('http://localhost:5000/all-books')
    .then(res => res.json())
    .then(data => setBooks(data))
  }, [loading]);

    // loader
    if (loading) {
      return <div className="text-center mt-28">
          <Spinner aria-label="Center-aligned spinner example" />
      </div>
  }


  return (
    <div className='my-28 px-4 lg:px-24'>
      <h2 className='text-3xl font-bold text-center mb-16 z-40'>Available Books</h2>
        <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-20'>
          {
            books.map(book => <Card>
              <img src={book.imageURL} alt="" className='h-72' />
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                <p>
                  {book.bookTitle}
                </p>
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400"
                  onMouseEnter={() => setHoveredBookId(book._id)} // Set hovered book ID on hover
                  onMouseLeave={() => setHoveredBookId(null)} // Clear hovered book ID on mouse leave 
              >
                {book.description.split(' ').slice(0, 20).join(' ')}
                {book.description.split(' ').length > 20 ? '...' : ''}
              </p>

              <button className='px-4 py-2 bg-blue-600 text-white rounded'>Buy Now</button>
               {/* Tooltip */}
              {hoveredBookId === book._id && ( // Show tooltip only if the book is hovered
                <div className="absolute z-10 bg-white border border-gray-300 p-2 rounded shadow-lg lg:w-1/4 md:w-1/3 ">
                  {book.description}
                </div>
            )}
            </Card>)
          }
        </div>
    </div>
  )
}
