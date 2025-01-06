import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminDocs from './components/admin/adminDocs.jsx';
import AdminLogin from './components/admin/adminLogin.jsx';
import DocForm from './components/utils/docForm.jsx';
import ReaderPage from './components/ReaderPage.jsx';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ReaderPage />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin-docs" element={<AdminDocs />} />
          <Route path="/add-doc" element={<DocForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
