import { useState } from 'react';
import DeleteModal from '../utils/deleteModal';
import DocCard from '../utils/docCard';

export default function AdminDocs() {
  const [isOpen, setIsOpen] = useState(false);

  function handleShowDeleteModal() {
    setIsOpen(true);
  }

  // apis

  return (
    <>
      <div className="w-full min-h-screen bg-gray-100 p-10">
        <div className="flex flex-row justify-between items-center ">
          <p className="font-bold text-xl text-gray-800">All Documentations</p>
          {/* redirect to doc page */}
          <button className="py-2 px-4 text-sm text-white bg-gray-800 hover:bg-black transition-all rounded mb-4">
            + Add New
          </button>
        </div>
        {/* mapping and pass props */}
        <DocCard onDelete={handleShowDeleteModal} />

        <DeleteModal open={isOpen} setOpen={setIsOpen} />
      </div>
    </>
  );
}

// show these by fetching from backend
// date-of-creation
// last-updated
