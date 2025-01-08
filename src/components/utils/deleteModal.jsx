export default function DeleteModal(props) {
  const { open, setOpen, onDelete } = props;

  return (
    <div>
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg w-full max-w-md mx-4 relative p-4">
            <div className="pb-2 border-b flex flex-row justify-between items-center">
              <p className="text-lg font-semibold">Delete Documentation</p>
              <button onClick={() => setOpen(false)} className="hover:bg-gray-100 rounded-full p-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div className="py-2">
              <p className="">Are you sure you want to delete this entry?</p>
            </div>

            <div className="flex flex-row w-full gap-x-4 mt-8">
              <button className="w-full bg-indigo-500 text-white rounded py-2" onClick={onDelete}>
                Yes
              </button>
              <button
                className="w-full border border-indigo-500 text-indigo-500 bg-white rounded py-2"
                onClick={() => setOpen(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
