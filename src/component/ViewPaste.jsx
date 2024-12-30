import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router'

function ViewPaste() {

    const {id} =useParams();
    const allPastes = useSelector((state)=> state.paste.pastes);

    const paste = allPastes.filter((p)=>{
        p._id === id
    })

    return (
        <div>
            <div className='flex flex-row gap-7 place-content-between'>
                <input
                    className='p-1 rounded-2xl mt-2 w-[66%] pl-4'
                    type='text'
                    placeholder='Enter the title'
                    value={paste.title}
                    disabled
                    onChange={(e) => setTitle(e.target.value)}
                />

                {/* <button className='p-2 rounded-2xl mt-2' onClick={createPaste}>
                    {pasteId ? 'Update Paste' : 'Create My Paste'}
                </button> */}
            </div>

            <div className='mt-8'>
                <textarea
                    className='rounded-2xl mt-4 min-w-[500px] p-4'
                    value={paste.content}
                    placeholder='Enter the content'
                    disabled
                    onChange={(e) => setValue(e.target.value)}
                    rows={20}
                ></textarea>
            </div>
        </div>
    )
}

export default ViewPaste
