export default function DocCard(props) {
  const { onDelete } = props;
  return (
    <>
      <div className="flex flex-col bg-white w-full rounded-lg p-4">
        <p className="font-semibold text-lg">Title</p>
        <p className="text-sm text-gray-700 mb-2"> -Author Name</p>
        <p className="mb-3">
          This guide covers the fundamentals of React, including components, state, props, hooks,
          and lifecycle methods, helping you build dynamic and interactive web applications
          efficiently.
        </p>
        <div className="flex flex-row gap-x-3 mb-3">
          <p className="bg-gray-300 rounded w-fit px-2 py-1 text-sm">Category 1</p>
          <p className="bg-gray-300 rounded w-fit px-2 py-1 text-sm">Category 2</p>
          <p className="bg-gray-300 rounded w-fit px-2 py-1 text-sm">Category 3</p>
        </div>
        <p className="text-sm text-gray-900 mb-1">Date of creation: 06/01/2025</p>
        <p className="text-sm text-gray-900">Last updated: 06/01/2025</p>

        <div className="w-full flex flex-row justify-end gap-x-4">
          <button className="py-2 px-4 text-sm text-white bg-orange-300 hover:bg-orange-400 transition-all rounded mb-4">
            Edit
          </button>
          <button
            className="py-2 px-4 text-sm text-white bg-red-400 hover:bg-red-500 transition-all rounded mb-4"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
}
