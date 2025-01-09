import { db } from '../../firebase';
import InputField from '../utils/inputfield';
import { useContext, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import eyeOffIcon from '../../assets/eye-off.svg';
import eyeOnIcon from '../../assets/eye-on.svg';
import { useNavigate } from 'react-router-dom';
import { AdminContext } from '../utils/adminContext';
import Spinner from '../utils/Spinner';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pwdType, setPwdType] = useState('password');
  const [isValid, setIsValid] = useState(false);
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const navigate = useNavigate();
  const { setAdminId } = useContext(AdminContext);
  const [isLoading, setIsLoading] = useState(false);

  function handleEmailChange(e) {
    const value = e.target.value;
    setEmail(value);
    if (!emailRegex.test(value)) {
      setIsValid(false);
      return;
    }
    setIsValid(true);
  }

  async function handleLogin() {
    const adminCollection = collection(db, 'admin');
    try {
      setIsLoading(true);
      const q = query(adminCollection, where('email', '==', email));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        setIsLoading(false);
        toast.error('Email not found!');
        return;
      }

      const doc = querySnapshot.docs[0];
      const data = doc.data();
      setIsLoading(false);
      if (data.password === password) {
        toast.success('Login successful');
        setAdminId(doc.id);
        localStorage.setItem('adminId', doc.id);
        setEmail('');
        setPassword('');
        navigate('/admin-docs');
        return;
      }
      toast.error('Incorrect password');
    } catch (err) {
      console.error('Error: ', err);
      setIsLoading(false);
    }
  }
  return (
    <>
      <div className="flex flex-col justify-center items-center w-full h-screen bg-gray-100">
        <div className="flex flex-col bg-white w-11/12 sm:w-3/4 md:w-1/2 xl:w-1/3 rounded-md py-8 px-4 shadow space-y-5">
          <p className="text-black font-semibold text-2xl">Admin Login</p>
          <InputField
            label="Email Address"
            type="text"
            onChange={(e) => handleEmailChange(e)}
            value={email}
          />
          <div className="relative">
            <InputField
              label="Password"
              type={pwdType}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <img
              src={pwdType === 'password' ? eyeOffIcon : eyeOnIcon}
              className="w-4 h-4 absolute right-2 top-9 cursor-pointer"
              onClick={() => setPwdType(pwdType === 'password' ? 'text' : 'password')}
            />
          </div>

          <button
            className="flex items-center justify-center py-2 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600 transition-all disabled:bg-gray-400"
            onClick={handleLogin}
            disabled={isValid && password ? false : true}
          >
            {isLoading ? <Spinner /> : 'Login'}
          </button>
        </div>
      </div>
    </>
  );
}
