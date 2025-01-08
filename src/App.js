import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminDocs from './components/admin/adminDocs.jsx';
import AdminLogin from './components/admin/adminLogin.jsx';
import DocForm from './components/docForm.jsx';
import ReaderPage from './components/ReaderPage.jsx';
import { ToastContainer } from 'react-toastify';
import { AdminProvider } from './components/utils/adminContext.jsx';
import DocumentPage from './components/DocumentPage.jsx';

function App() {
  return (
    <>
      <AdminProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ReaderPage />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin-docs" element={<AdminDocs />} />
            <Route path="/add-doc" element={<DocForm />} />
            <Route path="/edit-doc/:docId" element={<DocForm />} />
            <Route path="/document/:docId" element={<DocumentPage />} />
          </Routes>
        </BrowserRouter>
      </AdminProvider>
      <ToastContainer />
    </>
  );
}

export default App;
