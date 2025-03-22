import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Welcome() {
    const [searchTerm, setSearchTerm] = useState('');
    const books = [
        { title: '', author: '', publisher: '' },
        { title: '', author: '', publisher: '' },
        { title: '', author: '', publisher: '' },
        { title: '', author: '', publisher: '' }
    ];

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.publisher.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <Head title="Welcome to PhilCST" />

            <div className="flex h-screen w-full flex-col items-center bg-[#0a0a0a] text-white">
                <header className="absolute top-4 right-8 flex space-x-4">
                    <Link href={route('login')} className="rounded-md border border-gray-500 px-5 py-2 text-sm text-white hover:border-gray-300 hover:bg-gray-800">
                        Log in
                    </Link>
                    <Link href={route('register')} className="rounded-md border border-gray-500 px-5 py-2 text-sm text-white hover:border-gray-300 hover:bg-gray-800">
                        Register
                    </Link>
                </header>

                <div className="mt-10 text-center">
                    <h1 className="text-4xl font-bold text-violet-500">
                        Welcome to PhilCST Library
                    </h1>
                </div>

                <div className="mt-6 w-full max-w-lg">
                    <input
                        type="text"
                        placeholder="Search for books..."
                        className="w-full rounded-md border border-gray-600 bg-[#0a0a0a] p-3 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="mt-6 w-full max-w-4xl">
                    <table className="w-full border-collapse border border-gray-600">
                        <thead>
                            <tr className="bg-violet-600 text-white">
                                <th className="border border-gray-500 p-2">Book Title</th>
                                <th className="border border-gray-500 p-2">Book Author</th>
                                <th className="border border-gray-500 p-2">Publisher</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredBooks.map((book, index) => (
                                <tr key={index} className="text-center">
                                    <td className="border border-gray-500 p-2">{book.title}</td>
                                    <td className="border border-gray-500 p-2">{book.author}</td>
                                    <td className="border border-gray-500 p-2">{book.publisher}</td>
                                </tr>
                            ))}
                            {filteredBooks.length === 0 && (
                                <tr>
                                    <td colSpan={3} className="p-4 text-center text-white-400">
                                        No matching books found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
