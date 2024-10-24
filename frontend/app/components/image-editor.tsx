export const ImageEditor = () => {
  return (
    <aside className="w-1/4 h-full flex items-center bg-indigo-800">
      <ul className="w-full flex flex-col h-80">
        <li className="p-6 h-1/3">
          <span className="block pb-1">長度</span>
          <div className="w-full h-full flex justify-between">
            <input className="w-5/6 h-full p-3 bg-yellow-500 text-black flex justify-center items-center"/>
            <span className=" h-full flex items-center">px</span>
          </div>
        </li>
        <li className="p-6 h-1/3">
          <span className="block pb-1">寬度</span>
          <div className="w-full h-full flex justify-between">
            <input className="w-5/6 h-full p-3 bg-teal-500 text-black flex justify-center items-center"/>
            <span className=" h-full flex items-center">px</span>
          </div>
        </li>
        <li className="p-6 h-1/3">
          <span className="block pb-1">網址</span>
          <input className="w-full h-full p-3 bg-indigo-500 text-black flex justify-center items-center"/>
        </li>
      </ul>
    </aside>
  );
}