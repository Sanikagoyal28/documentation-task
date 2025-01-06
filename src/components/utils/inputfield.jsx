import { useState } from 'react';

export default function InputField(props) {
  const { label, className, type = 'text', note, accept } = props;

  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };
  return (
    <div className={`flex flex-col ${className}`}>
      <label className="text-sm mb-1">{label}</label>
      {type === 'file' ? (
        <div className="flex flex-col items-center">
          <input
            type="file"
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            onChange={handleFileChange}
            accept={accept}
          />
          {preview && (
            <div className="mt-2">
              <img src={preview} alt="Preview" className="max-w-full h-auto max-h-40 rounded" />
            </div>
          )}
        </div>
      ) : type === 'textarea' ? (
        <textarea className="w-full border-gray-200 border rounded-md px-4 py-2 outline-none focus:border-indigo-500 transition-colors duration-200 max-h-40 min-h-10" />
      ) : (
        <input
          type={type}
          className="w-full border-gray-200 border rounded-md px-4 py-2 outline-none focus:border-indigo-500 transition-colors duration-200"
        />
      )}
      {note ? <p className="text-sm text-gray-600">Note: {note}</p> : null}
    </div>
  );
}
