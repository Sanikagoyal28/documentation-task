import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminContext } from './adminContext';

export default function DocCard(props) {
  const { documentData, onDelete, isEdit, isDelete, setDeleteId } = props;
  const { title, description, author, categories, createdAt, updatedAt, id } = documentData;
  const navigate = useNavigate();
  const { setEditDocId } = useContext(AdminContext);
  return (
    <>
      <div
        className="flex flex-col bg-white w-full rounded-lg p-4 capitalize mb-4 cursor-pointer"
        onClick={() => {
          navigate(`/document/${id}`);
        }}
      >
        <p className="font-semibold text-lg">{title}</p>
        <p className="text-sm text-gray-700 mb-2"> -{author}</p>
        <p className="mb-3">{description}</p>
        <div className="flex flex-row gap-x-3 mb-3">
          {categories.split(',').map((category, index) => (
            <p key={index} className="bg-gray-300 rounded w-fit px-2 py-1 text-sm">
              {category.trim()}
            </p>
          ))}
        </div>
        <p className="text-sm text-gray-900 mb-1">
          Date of creation: {createdAt?.toDate().toLocaleDateString()}
        </p>
        <p className="text-sm text-gray-900">
          Last updated: {updatedAt?.toDate().toLocaleDateString()}
        </p>

        <div className="w-full flex flex-row justify-end gap-x-4">
          {isEdit ? (
            <button
              className="py-2 px-4 text-sm text-white bg-orange-300 hover:bg-orange-400 transition-all rounded mb-4"
              onClick={(e) => {
                e.stopPropagation();
                setEditDocId(id);
                navigate(`/edit-doc/${id}`);
              }}
            >
              Edit
            </button>
          ) : null}
          {isDelete ? (
            <button
              className="py-2 px-4 text-sm text-white bg-red-400 hover:bg-red-500 transition-all rounded mb-4"
              onClick={(e) => {
                e.stopPropagation();
                setDeleteId(id);
                onDelete();
              }}
            >
              Delete
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
}
