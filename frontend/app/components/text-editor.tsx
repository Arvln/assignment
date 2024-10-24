export const TextEditor = () => {
  return (
    <aside className="w-1/4 h-full flex items-center bg-indigo-800">
      <ul className="w-full flex flex-col h-32">
        <li className="p-6 h-1/3">
          <span className="block pb-1">文字</span>
          <input className="w-full p-3 bg-indigo-500 text-black flex justify-center items-center"/>
        </li>
      </ul>
    </aside>
  );
}