import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useEffect, useState } from 'react';

export default function useDocument(docId) {
  const [document, setDocument] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  async function getDocumentById() {
    try {
      if (!docId) return;
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

  return { document, isLoading };
}
