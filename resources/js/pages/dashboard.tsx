import { useState } from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
];

export default function Dashboard() {
    const [filter, setFilter] = useState('title'); // Default filter option
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = () => {
        console.log(`Searching for ${searchQuery} by ${filter}`);
        // Add your search logic here
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-screen">
                {/* Main Content */}
                <div className="flex-1 p-6 space-y-6">
                    {/* Welcome Message */}
                    <p className="text-violet-600 text-2xl font-bold">Welcome to PhilCST Library</p>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md">
                            <p>Total Books</p>
                            <p className="text-2xl font-bold">1,250</p> {/* Placeholder value */}
                        </div>
                        <div className="bg-green-500 text-white p-4 rounded-lg shadow-md">
                            <p>Active Users</p>
                            <p className="text-2xl font-bold">350</p> {/* Placeholder value */}
                        </div>
                    </div>

                    {/* Search Bar with Filter */}
                    <div className="flex items-center space-x-3">
                        <label htmlFor="filterSelect" className="mr-2 text-gray-700">
                            
                        </label>
                        <select
                            id="filterSelect"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="h-full p-2 border border-gray-400 rounded-md bg-black focus:outline-none focus:ring-2 focus:ring-violet-500"
                            title="Select a filter option"
                        >
                            <option className="bg-violet-600 text-white hover:bg-violet-700 focus:bg-violet-800" value="title">Title</option>
                            <option className="bg-violet-600 text-white hover:bg-violet-700 focus:bg-violet-800" value="author">Author</option>
                            <option className="bg-violet-600 text-white hover:bg-violet-700 focus:bg-violet-800" value="isbn">ISBN</option>
                        </select>

                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={`Search by ${filter}...`}
                            className="h-full p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 flex-grow"
                        />

                        <button
                            onClick={handleSearch}
                            className="bg-violet-600 text-white px-4 py-2 rounded-md hover:bg-violet-700 transition duration-200"
                        >
                            Search
                        </button>
                    </div>


                    {/* Suggestions Section */}
                    <div className="mt-4">
                        <p className="text-2xl font-bold">Suggestions</p>
                        <ul className="list-disc pl-5">
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </div>

                    {/* Recent History */}
                    <div className="mt-4">
                        <p className="text-xl font-semibold">Recent History</p>
                        <ul className="list-disc pl-5">
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
