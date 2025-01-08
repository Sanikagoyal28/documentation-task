import { useContext, useEffect, useState } from 'react';
import InputField from './utils/inputfield';
import { collection, addDoc, serverTimestamp, updateDoc, doc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { AdminContext } from './utils/adminContext';
import { db, app } from '../firebase';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from './utils/Spinner';
import useDocument from './custom-hooks/getDocument';

export default function DocForm() {
  const [inputValue, setInputValue] = useState({
    title: '',
    author: '',
    description: '',
    categories: '',
    content: '',
    links: [
      {
        id: 0,
        text: '',
        link: '',
      },
    ],
    attachment: '',
  });
  const { adminId } = useContext(AdminContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { docId } = useParams();
  const { document } = useDocument(docId);

  useEffect(() => {
    if (document) {
      setInputValue({
        title: document.title,
        author: document.author,
        description: document.description,
        categories: document.categories,
        content: document.content,
        links: document.links,
      });
      return;
    }
  }, [document]);

  function handleAdd() {
    const newLink = {
      id: inputValue.links.length,
      text: '',
      link: '',
    };
    setInputValue((prev) => ({
      ...prev,
      links: [...prev.links, newLink],
    }));
  }

  function handleRemove(ind) {
    setInputValue((prev) => ({
      ...prev,
      links: prev.links.filter((link) => link.id !== ind),
    }));
  }

  function handleInputChange(label, value) {
    setInputValue((prev) => ({
      ...prev,
      [label]: value,
    }));
  }

  function handleLinkChange(id, field, value) {
    setInputValue((prev) => ({
      ...prev,
      links: prev.links.map((link) => (link.id === id ? { ...link, [field]: value } : link)),
    }));
  }

  async function handleFileUpload(file) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'documentation_task_upload');
    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/dsiyinfky/image/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      return { url: data?.secure_url };
    } catch (err) {
      return { url: null };
    }
  }

  async function handleSave(e) {
    e.preventDefault();
    if (!adminId) {
      return toast.error('Admin not found. Please Login again!');
    }
    try {
      setIsLoading(true);
      const attachments = [];
      const files = Array.isArray(inputValue.attachment)
        ? inputValue.attachment
        : Array.from(inputValue.attachment);
      for (const file of files) {
        const data = await handleFileUpload(file);
        if (data.url) attachments.push(data.url);
      }
      const data = {
        adminId,
        title: inputValue.title,
        author: inputValue.author,
        description: inputValue.description,
        categories: inputValue.categories,
        content: inputValue.content,
        links: inputValue.links,
        attachment: attachments,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      if (docId) {
        const docRef = doc(db, 'documentation', docId);
        await updateDoc(docRef, data);
        toast.success('Document updated successfully!');
      } else {
        await addDoc(collection(db, 'documentation'), data);
        toast.success('Document added successfully!');
      }
      setInputValue({
        title: '',
        author: '',
        description: '',
        categories: '',
        content: '',
        links: [
          {
            id: 0,
            text: '',
            link: '',
          },
        ],
        attachment: '',
      });
      navigate('/admin-docs');
      return;
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong!');
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <>
      <div className="w-full min-h-screen bg-gray-100 py-10">
        <div className="bg-white w-11/12 sm:w-3/4 lg:w-1/2 rounded-md py-8 px-4 shadow mx-auto">
          <form className="flex flex-col space-y-5" onSubmit={handleSave}>
            <p className="text-black font-semibold text-2xl">Add Documentation</p>
            <InputField
              label="Title"
              type="text"
              value={inputValue.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              maxLength={20}
            />
            <InputField
              label="Author Name"
              type="text"
              value={inputValue.author}
              onChange={(e) => handleInputChange('author', e.target.value)}
              maxLength={20}
            />
            <InputField
              label="Description"
              type="text"
              value={inputValue.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              maxLength={200}
            />
            <InputField
              label="Categories"
              type="text"
              note="Add Categories separated by comma"
              value={inputValue.categories}
              onChange={(e) => handleInputChange('categories', e.target.value)}
              maxLength={200}
            />
            <InputField
              label="Body/Content"
              type="textarea"
              value={inputValue.content}
              onChange={(e) => handleInputChange('content', e.target.value)}
            />

            <div className="flex flex-col">
              <p className="text-sm mb-1">External Links</p>
              {inputValue.links.map((link, ind) => {
                return (
                  <div
                    key={link.id}
                    className="flex flex-row gap-x-1 sm:gap-x-4 w-full items-center mb-2"
                  >
                    <InputField
                      label="Text"
                      type="text"
                      labelClassName="text-xs mb-0"
                      value={inputValue.links[link.id].text}
                      onChange={(e) => handleLinkChange(link.id, 'text', e.target.value)}
                    />
                    <InputField
                      label="Link"
                      type="text"
                      labelClassName="text-xs mb-0"
                      value={inputValue.links[link.id].link}
                      onChange={(e) => handleLinkChange(link.id, 'link', e.target.value)}
                    />
                    {ind + 1 === inputValue.links.length ? (
                      <div
                        className="rounded-full text-gray-50 bg-black w-4 h-4 p-4 flex items-center justify-center text-xl mt-3 cursor-pointer"
                        onClick={handleAdd}
                      >
                        +
                      </div>
                    ) : null}
                    <div
                      className="rounded-full text-gray-50 bg-black w-4 h-4 p-4 flex items-center justify-center text-xl mt-3 cursor-pointer"
                      onClick={handleRemove}
                    >
                      -
                    </div>
                  </div>
                );
              })}
            </div>
            <InputField
              label="Add attachment"
              type="file"
              accept="image/*"
              onChange={(e) => handleInputChange('attachment', e.target.files)}
            />
            <button
              type="submit"
              className="flex items-center justify-center py-2 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600 transition-all"
            >
              {isLoading ? <Spinner /> : 'Save'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

// map edit doc data
