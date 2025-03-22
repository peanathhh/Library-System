import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { useState } from 'react';


interface BookVolumeInfo {
    title: string;
    subtitle?: string;
    authors?: string[];
    industryIdentifiers?: { type: string; identifier: string; }[];
    publisher?: string;
}

interface Book {
    id: string;
    volumeInfo: BookVolumeInfo;
}

export default function Books() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<Book[]>([]);
    const [accession, setAccession] = useState('');
    const [barcode, setBarcode] = useState('');
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publisher, setPublisher] = useState('');
    const [isbn, setIsbn] = useState('');
    const [addMethod, setAddMethod] = useState('manual');
    const [filter, setFilter] = useState<string>('title');

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
        setPublisher(volumeInfo.publisher || '');
        const isbnInfo = volumeInfo.industryIdentifiers?.find(id => id.type === 'ISBN_13' || id.type === 'ISBN_10');
        setIsbn(isbnInfo?.identifier || '');
        setAccession(book.id || '');
    };

    const filteredResults = searchResults.filter(book => {
        const volumeInfo = book.volumeInfo;
        if (filter === 'title') {
            return volumeInfo.title?.toLowerCase().includes(searchQuery.toLowerCase());
        }
        if (filter === 'author') {
            return volumeInfo.authors?.some(author => author.toLowerCase().includes(searchQuery.toLowerCase()));
        }
        if (filter === 'publisher') {
            return volumeInfo.publisher?.toLowerCase().includes(searchQuery.toLowerCase());
        }
        return false;
    });

    return (
        <AppLayout>
            <Head title="Books" />
            <div>

                <h2 className="text-center text-2xl font-bold mb-4 border-b-4 border-blue-500 pb-2">Books</h2>

                <div className="flex justify-center items-center mb-4">
                    <label htmlFor="filterSelect" className="mr-2">Filter By:</label>
                    <select
                        id="filterSelect"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="border border-gray-400 p-2 mr-2 bg-black text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="" disabled>Filter By:</option>
                        <option className="bg-violet-600 text-white hover:bg-violet-700 focus:bg-violet-800" value="title">Title</option>
                        <option className="bg-violet-600 text-white hover:bg-violet-700 focus:bg-violet-800" value="author">Author</option>
                        <option className="bg-violet-600 text-white hover:bg-violet-700 focus:bg-violet-800" value="publisher">Publisher</option>
                    </select>


                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search books..."
                        className="border border-gray-400 p-2 mr-2"
                    />
                   


                    <button
                        onClick={searchBooks}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Search
                    </button>
                </div>

                <div className="mt-6 flex justify-center items-center">
                    <table className="w-full max-w-4xl border-collapse border border-gray-600">
                        <thead>
                            <tr className="bg-violet-600 text-white">
                                <th className="border border-gray-500 p-2">Book Title</th>
                                <th className="border border-gray-500 p-2">Book Author</th>
                                <th className="border border-gray-500 p-2">Publisher</th>
                                <th className="border border-gray-500 p-2">ISBN</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {filteredResults.map((book) => (
                                <tr key={book.id} onClick={() => handleSelectBook(book)} className="cursor-pointer hover:bg-gray-100">
                                    <td className="border border-gray-500 p-2">{book.volumeInfo.title}</td>
                                    <td className="border border-gray-500 p-2">{book.volumeInfo.authors?.join(', ')}</td>
                                    <td className="border border-gray-500 p-2">{book.volumeInfo.publisher}</td>
                                    <td className="border border-gray-500 p-2">{book.volumeInfo.industryIdentifiers?.find(id => id.type === 'ISBN_13' || id.type === 'ISBN_10')?.identifier}</td>
                                    
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
