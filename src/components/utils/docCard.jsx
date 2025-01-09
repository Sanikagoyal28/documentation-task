import { useNavigate } from 'react-router-dom';
import Star from '../../assets/Star';
import { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

export default function DocCard(props) {
  const { documentData, onDelete, isEdit, isDelete, setDeleteId, isReader } = props;
  const { title, description, author, categories, createdAt, updatedAt, id, rating } = documentData;
  const navigate = useNavigate();
  const [starRating, setStarRating] = useState(rating || 0);
  const [hover, setHover] = useState(0);
  const stars = [1, 2, 3, 4, 5];

  async function handleRating(star) {
    if (!star) return;
    try {
      const docRef = doc(db, 'documentation', id);
      await updateDoc(docRef, {
        rating: star,
      });
    } catch (err) {
      console.log(err);
    }
    setStarRating(star);
  }
  return (
    <>
      <div
        className="flex flex-col bg-white w-full rounded-lg p-4 capitalize mb-4 cursor-pointer hover:scale-[1.02] shadow-sm hover:shadow-md transition-all"
        onClick={() => {
          navigate(`/document/${id}`);
        }}
      >
        <p className="font-semibold text-lg">{title}</p>
        <p className="text-sm text-gray-700 mb-2"> -{author}</p>
        <p className="mb-3">{description}</p>
        <div className="flex flex-row gap-2 sm:gap-x-3 mb-3 flex-wrap ">
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

        <div
          className={`w-full flex flex-row ${
            isReader ? 'justify-between' : 'justify-end'
          } items-center my-2`}
        >
          {isReader ? (
            <div className="flex flex-wrap gap-x-1 ">
              {stars.map((star) => {
                return (
                  <span
                    key={star}
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRating(star);
                    }}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                  >
                    <Star fillColor={(hover || starRating) >= star ? '#d97706' : null} />
                  </span>
                );
              })}
            </div>
          ) : null}
          <div className="flex gap-x-4 items-center">
            {isEdit ? (
              <button
                className="py-2 px-4 text-sm text-white bg-orange-300 hover:bg-orange-400 transition-all rounded"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/edit-doc/${id}`);
                }}
              >
                Edit
              </button>
            ) : null}
            {isDelete ? (
              <button
                className="py-2 px-4 text-sm text-white bg-red-400 hover:bg-red-500 transition-all rounded"
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
      </div>
    </>
  );
}
