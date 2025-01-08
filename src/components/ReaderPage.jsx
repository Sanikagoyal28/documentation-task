import { collection, getDocs } from 'firebase/firestore';
import DocCard from './utils/docCard';
import { db } from '../firebase';
import { useEffect, useState } from 'react';
import Spinner from './utils/Spinner';

export default function ReaderPage() {
  const [documents, setDocuments] = useState([]);
  const [orgDocs, setOrgDocs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function getDocuments() {
    try {
      setIsLoading(true);
      const docsCollection = collection(db, 'documentation');
      const querySnapshot = await getDocs(docsCollection);

      const documents = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setIsLoading(false);
      setDocuments(documents);
      setOrgDocs(documents);
      return;
    } catch (error) {
      setIsLoading(false);
      setDocuments([]);
      return;
    }
  }

  useEffect(() => {
    getDocuments();
  }, []);

  function handleSearch(e) {
    const value = e.target.value;
    if (!value) {
      setDocuments(orgDocs);
      return;
    }
    const filteredDocs = orgDocs.filter((doc) =>
      doc.title.toLowerCase().includes(value.toLowerCase())
    );
    setDocuments(filteredDocs);
  }
  return (
    <>
      <div className="w-full min-h-screen bg-gray-100 p-10">
        <div className="max-w-[1400px] m-auto">
          <div className="flex flex-row justify-between items-center mb-4">
            <p className="font-bold text-xl text-gray-800">All Documentations</p>

            <input
              className="rounded-lg px-4 py-2 w-72 outline-none focus:border-indigo-500 border border-gray-400"
              type="text"
              placeholder="Search by title"
              onChange={handleSearch}
            />
          </div>
          {isLoading ? (
            <div className="w-full flex items-center justify-center my-4">
              <Spinner />
            </div>
          ) : null}
          {documents.length > 0 ? (
            documents.map((data) => {
              return <DocCard key={data.id} documentData={data} isEdit={false} isDelete={false} />;
            })
          ) : (
            <p className="text-lg font-semibold text-center my-4 text-gray-700">
              No Documents found
            </p>
          )}
        </div>
      </div>
    </>
  );
}
