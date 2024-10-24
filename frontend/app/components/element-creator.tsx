"use client";

export const ElementCreator = () => {
  return (
    <aside className="w-1/4 h-full bg-indigo-800">
      <ul className="p-16 flex flex-col h-full">
        <li
          className="p-6 h-full"
          draggable
          onDragStart={(e) => e.dataTransfer.setData("text/plain", "image")}
        >
          <div className="h-full bg-yellow-500 text-black flex justify-center items-center">圖片元件</div>
        </li>
        <li
          className="p-6 h-full"
          draggable
          onDragStart={(e) => e.dataTransfer.setData("text/plain", "text")}
        >
          <div className="h-full bg-teal-500 text-black flex justify-center items-center">文字元件</div>
        </li>
        <li
          className="p-6 h-full"
          draggable
          onDragStart={(e) => e.dataTransfer.setData("text/plain", "carousel")}
        >
          <div className="h-full bg-indigo-500 text-black flex justify-center items-center">輪播元件</div>
        </li>
      </ul>
    </aside>
  );
}
