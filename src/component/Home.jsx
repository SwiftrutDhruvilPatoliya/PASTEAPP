import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router';
import { addToPastes, updateToPastes } from '../redux/PasteSlice';

const Home = () => {
    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    const [searchParams, setsearchParams] = useSearchParams();
    const pasteId = searchParams.get('pasteId');
    const dispatch = useDispatch();
    const allPastes = useSelector((state) => state.paste.pastes);

    // Handle paste creation and update
    function createPaste() {
        const paste = {
            title: title,
            content: value,
            _id: pasteId || Date.now().toString(36),
            createdAt: new Date().toISOString(),
        };

        if (pasteId) {
            // Update existing paste
            dispatch(updateToPastes(paste));
        } else {
            // Create a new paste
            dispatch(addToPastes(paste));
        }

        // After creation or update
        setTitle('');
        setValue('');
        setsearchParams({});
    }

    useEffect(() => {
        if (pasteId) {
            const paste = allPastes.find((p) => p._id === pasteId);
            if (paste) {
                setTitle(paste.title);
                setValue(paste.content);
            } else {
                console.error(`Paste with ID ${pasteId} not found.`);
                setTitle('');
                setValue('');
            }
        }
    }, [pasteId, allPastes]);

    return (
        <div className="container mx-auto p-5 max-w-4xl">
            <div className="flex flex-col gap-7 md:flex-row md:items-center md:gap-8 mb-5">
                <input
                    className="p-3 rounded-2xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-[66%] transition-all duration-300 ease-in-out"
                    type="text"
                    placeholder="Enter the title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <button
                    className="mt-4 md:mt-0 p-3 rounded-2xl bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300 w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-blue-400"
                    onClick={createPaste}
                >
                    {pasteId ? 'Update Paste' : 'Create My Paste'}
                </button>
            </div>

            <div className="mt-8">
                <textarea
                    className="w-full p-4 rounded-2xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-all duration-300 ease-in-out"
                    value={value}
                    placeholder="Enter the content"
                    onChange={(e) => setValue(e.target.value)}
                    rows={20}
                ></textarea>
            </div>
        </div>
    );
};

export default Home;
