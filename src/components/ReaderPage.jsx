import DocCard from './utils/docCard';

export default function ReaderPage() {
  return (
    <>
      <div className="w-full min-h-screen bg-gray-100 p-10">
        <div className="flex flex-row justify-between items-center ">
          <p className="font-bold text-xl text-gray-800">All Documentations</p>
        </div>
        {/* mapping and pass props */}
        <DocCard />
      </div>
    </>
  );
}
