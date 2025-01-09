import { useContext, useEffect, useState } from 'react';
import DeleteModal from '../utils/deleteModal';
import DocCard from '../utils/docCard';
import { AdminContext } from '../utils/adminContext';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../utils/Spinner';

export default function AdminDocs() {
  const [isOpen, setIsOpen] = useState(false);
  const { adminId } = useContext(AdminContext);
  const [documents, setDocuments] = useState([]);
  const [deleteId, setDeleteId] = useState('');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  console.log(adminId, 'admin');

  async function getDocuments() {
    try {
      if (!adminId) return;
      setIsLoading(true);
      const docsCollection = collection(db, 'documentation');
      const q = query(docsCollection, where('adminId', '==', adminId));

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) return setDocuments([]);

      const documents = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setIsLoading(false);
      setDocuments(documents);
      return;
    } catch (error) {
      console.error('Error', error);
      setIsLoading(false);
      return;
    }
  }

  useEffect(() => {
    getDocuments();
  }, [adminId]);

  async function handleDelete() {
    if (!deleteId) return;
    try {
      const docRef = doc(db, 'documentation', deleteId);
      await deleteDoc(docRef);
      setDocuments((prev) => prev.filter((doc) => doc.id != deleteId));
      setIsOpen(false);
      toast.success('Document deleted successfully');
      return;
    } catch (error) {
      toast.error('Something went wrong!');
    }
  }

  return (
    <>
      <div className="w-full min-h-screen bg-gray-100 py-10 px-4 sm:p-10">
        <div className="max-w-[1400px] m-auto">
          <div className="flex flex-row justify-between items-center">
            <p className="font-bold text-xl text-gray-800">All Documentations</p>
            <button
              className="py-2 px-4 text-sm text-white bg-gray-800 hover:bg-black transition-all rounded mb-4"
              onClick={() => {
                navigate('/add-doc');
              }}
            >
              + Add New
            </button>
          </div>
          {isLoading ? (
            <div className="w-full flex items-center justify-center my-4">
              <Spinner />
            </div>
          ) : null}
          {documents.length > 0 ? (
            documents.map((data) => {
              return (
                <DocCard
                  key={data.id}
                  documentData={data}
                  isEdit={true}
                  isDelete={true}
                  setDeleteId={setDeleteId}
                  onDelete={() => setIsOpen(true)}
                />
              );
            })
          ) : (
            <p className="text-lg font-semibold text-center my-4 text-gray-700">
              No Documents found
            </p>
          )}
        </div>

        <DeleteModal open={isOpen} setOpen={setIsOpen} onDelete={handleDelete} />
      </div>
    </>
  );
}
