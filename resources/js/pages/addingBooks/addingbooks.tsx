import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { useState } from 'react';

interface BookVolumeInfo {
    title: string;
    subtitle?: string;
    authors?: string[];
    industryIdentifiers?: { type: string; identifier: string; }[];
}

interface Book {
    id: string;
    volumeInfo: BookVolumeInfo;
}

export default function AddingBooks() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<Book[]>([]);
    const [accession, setAccession] = useState('');
    const [barcode, setBarcode] = useState('');
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [author, setAuthor] = useState('');
    const [addMethod, setAddMethod] = useState('manual');
    const [isbn, setIsbn] = useState('');

    const searchBooks = async () => {
        if (!searchQuery) return;

        try {
            const response = await fetch(
                `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}`
            );
            const data = await response.json();
            setSearchResults(data.items || []);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    const handleSelectBook = (book: Book) => {
        const volumeInfo = book.volumeInfo;
        setTitle(volumeInfo.title || '');
        setSubtitle(volumeInfo.subtitle || '');
        setAuthor(volumeInfo.authors?.join(', ') || '');
        setAccession(book.id || '');
        const isbnInfo = volumeInfo.industryIdentifiers?.find(id => id.type === 'ISBN_13' || id.type === 'ISBN_10');
        setIsbn(isbnInfo?.identifier || '');
    };

    const clearSearch = () => {
        setSearchQuery('');
        setSearchResults([]);
    };

    const saveBook = () => {
        // Implement the save logic here
        console.log('Book saved:', { accession, isbn, title, subtitle, author });
        alert('Book saved successfully!');
        window.location.href = '/books';
    };
   
    return (
        <AppLayout>
            <Head title="Adding Book" />
            <div>
                <h2 className="text-center text-2xl font-bold mb-4 border-b-4 border-blue-500 pb-2">Adding Book</h2>

                {/* Selection for Adding Method */}
                <div className="mb-4 flex gap-2">
                    <button onClick={() => setAddMethod('manual')} className={`p-2 border border-gray-400 ${addMethod === 'manual' ? 'bg-green-500 text-white' : 'bg-black-200'} rounded-md`}>Add Manually</button>
                    <button onClick={() => setAddMethod('google')} className={`p-2 border border-gray-400 ${addMethod === 'google' ? 'bg-green-500 text-white' : 'bg-black-200'} rounded-md`}>Add Using Google Books API</button>
                </div>

                {/* Search Bar - Visible only if using Google API */}
                {addMethod === 'google' && (
                    <div className="mb-4">
                        <label htmlFor="search" className="block text-sm font-semibold mb-1">Search Book:</label>
                        <div className="flex gap-2">
                            <input
                                id="search"
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && searchBooks()}
                                className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter book title, author, or ISBN"
                            />
                            <button onClick={clearSearch} className="p-2 bg-red-500 text-white rounded-md">Clear</button>
                            <button onClick={searchBooks} className="p-2 bg-blue-500 text-white rounded-md">Search</button>
                        </div>
                    </div>
                )}

                {/* Search Results */}
                {addMethod === 'google' && searchResults.length > 0 && (
                    <ul className="mb-4">
                        {searchResults.map((book) => (
                            <li
                                key={book.id}
                                onClick={() => handleSelectBook(book)}
                                className="p-2 border-b cursor-pointer hover:bg-violet-400"
                            >
                                {book.volumeInfo.title} by {book.volumeInfo.authors?.join(', ')}
                            </li>
                        ))}
                    </ul>
                )}

                {/* Book Accession and Barcode Number */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                        <label htmlFor="accession" className="block text-sm font-semibold mb-1">Book Accession No.</label>
                        <input
                            id="accession"
                            type="text"
                            value={accession}
                            onChange={(e) => setAccession(e.target.value)}
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 mb-2"
                        />
                    </div>
                    <div>
                        <label htmlFor="isbn" className="block text-sm font-semibold mb-1">ISBN</label>
                        <input
                            id="isbn"
                            type="text"
                            value={isbn}
                            onChange={(e) => setIsbn(e.target.value)}
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 mb-2"
                        />
                    </div>
                  
                </div>

                {/* Title Statement */}
                <div className="p-2 font-semibold text-lg mb-2">Title Statement</div>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-semibold mb-1">Title:</label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 mb-2"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="subtitle" className="block text-sm font-semibold mb-1">Subtitle:</label>
                    <input
                        id="subtitle"
                        type="text"
                        value={subtitle}
                        onChange={(e) => setSubtitle(e.target.value)}
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 mb-2"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="author" className="block text-sm font-semibold mb-1">Author:</label>
                    <input
                        id="author"
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 mb-2"
                    />
                </div>
                <button onClick={saveBook} className="p-2 bg-green-500 text-white rounded-md">Save</button>
                
            </div>
        </AppLayout>
    );
}
