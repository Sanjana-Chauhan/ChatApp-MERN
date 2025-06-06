export default function ChatHeader() {
  return (
    <header className=" p-4 flex items-center justify-between bg-gray-200">
      <h1 className="text-2xl font-bold  text-gray-800/90 ">
        GroupieLoop	 
      </h1>
      <div className="flex gap-3 items-center">
        <span className="text-sm text-gray-600 hidden sm:block">Group Chat • Banter On</span>
        <div className="w-8 h-8 bg-gradient-to-tr from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
          🚀
        </div>
      </div>
    </header>
  );
}
