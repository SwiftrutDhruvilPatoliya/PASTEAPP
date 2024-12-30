import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes } from '../redux/PasteSlice';
import toast from 'react-hot-toast';

function Paste() {
    const [searchTerm, setSearchTerm] = useState('');

    const pastes = useSelector((state) => state.paste.pastes);
    const dispatch = useDispatch();

    const filteredData = pastes.filter((paste) =>
        paste.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = (pasteId) => {
        dispatch(removeFromPastes(pasteId));
        toast.success("Paste deleted successfully");
    };

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                toast.success("Copied to clipboard");
            })
            .catch((error) => {
                toast.error("Failed to copy");
                console.error("Clipboard copy failed:", error);
            });
    };

    return (
        <div className="container mx-auto p-6 max-w-7xl">
            <input
                className="p-4 rounded-2xl w-full md:w-[600px] mt-5 border-2 border-gray-300 focus:ring-2 focus:ring-blue-600 transition-all duration-300 ease-in-out shadow-md placeholder-gray-500"
                type="search"
                placeholder="Search here"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="flex flex-col gap-5 mt-6">
                {filteredData.length > 0 ? (
                    filteredData.map((paste) => (
                        <div
                            key={paste?._id}
                            className="border-2 border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:border-gray-300 transition-all duration-300 ease-in-out"
                        >
                            <div className="text-xl font-bold text-white-800">{paste.title}</div>
   
                            <div className="text-sm text-white-600 mt-2">{paste.content}</div>

                            <div className="flex gap-4 mt-4 justify-center md:justify-start">
                                <button className="py-2 px-4 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 ease-in-out">
                                    <a href={`/?pasteId=${paste?._id}`} className='text-white'>Edit</a>
                                </button>
                                <button className="py-2 px-4 rounded-xl bg-green-600 text-white hover:bg-green-700 transition-all duration-300 ease-in-out">
                                    <a href={`/pastes/${paste?._id}`} className='text-white'>View</a>
                                </button>
                                <button
                                    onClick={() => handleDelete(paste?._id)}
                                    className="py-2 px-4 rounded-xl bg-red-600 text-white hover:bg-red-700 transition-all duration-300 ease-in-out"
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={() => handleCopy(paste?.content)}
                                    className="py-2 px-4 rounded-xl bg-gray-600 text-white hover:bg-gray-700 transition-all duration-300 ease-in-out"
                                >
                                    Copy
                                </button>
                                <button className="py-2 px-4 rounded-xl bg-yellow-600 text-white hover:bg-yellow-700 transition-all duration-300 ease-in-out">
                                    Share
                                </button>
                            </div>
                            <div className="text-sm text-white-500 mt-3">
                                {new Date(paste.createdAt).toLocaleDateString()}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center text-white-500 mt-10">No pastes found</div>
                )}
            </div>
        </div>
    );
}

export default Paste;
