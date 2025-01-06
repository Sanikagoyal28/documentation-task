import InputField from './inputfield';

export default function DocForm() {
  return (
    <>
      <div className="w-full min-h-screen bg-gray-100 py-10">
        <div className="flex flex-col bg-white w-1/2 rounded-md py-8 px-4 shadow space-y-5 mx-auto">
          <p className="text-black font-semibold text-2xl">Add Documentation</p>

          {/* validations */}
          <InputField label="Title" type="text" />
          <InputField label="Author Name" type="text" />
          <InputField label="Description" type="text" />
          <InputField label="Categories" type="text" note="Add Categories separated by comma" />
          <InputField label="Body/Content" type="textarea" />
          <InputField label="Add attachment" type="file" accept="image/*,.pdf" />
          <button className="py-2 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600 transition-all">
            Save
          </button>
        </div>
      </div>
    </>
  );
}
