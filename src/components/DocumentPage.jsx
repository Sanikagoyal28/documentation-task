import { doc, getDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { useEffect, useState } from 'react';
import Spinner from './utils/Spinner';

export default function DocumentPage() {
  const { docId } = useParams();
  const [document, setDocument] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function getDocumentById() {
    try {
      setIsLoading(true);
      const docRef = doc(db, 'documentation', docId);
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        setDocument({ id: docSnapshot.id, ...docSnapshot.data() });
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getDocumentById();
  }, [docId]);

  return (
    <>
      <div className="w-full min-h-screen bg-gray-100 p-10">
        {isLoading ? (
          <div className="w-full flex items-center justify-center my-4">
            <Spinner />
          </div>
        ) : null}
        {document ? (
          <div className="max-w-[1400px] m-auto flex flex-col gap-y-4 capitalize">
            <div className="m-auto text-center mb-4">
              <p className="font-bold text-2xl mb-2">{document?.title}</p>
              <p className="text-gray-700">Authored by - {document?.author}</p>
            </div>

            <div>
              <p className="font-semibold italic mb-2">{document?.description}</p>
              <p className="">{document?.content}</p>
            </div>
            <div className="flex flex-row gap-x-3">
              {document?.categories?.split(',').map((category, index) => (
                <p key={index} className="bg-gray-300 rounded w-fit px-2 py-1 text-sm">
                  {category.trim()}
                </p>
              ))}
            </div>

            {document?.attachment
              ? document?.attachment.map((image, index) => {
                  return (
                    <img key={index} src={image} className="w-3/5 m-auto border-2 border-black" />
                  );
                })
              : null}

            {document?.links ? (
              <div>
                <p className="text-gray-900 mb-1">External Links</p>
                <ul className="list-disc">
                  {document?.links.map((link) => {
                    return (
                      <li key={link.id} className="mb-1">
                        <a
                          href={link.link}
                          className="text-indigo-600 visited:text-violet-700 underline"
                          target="_blank"
                        >
                          {link.text}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </>
  );
}
