"use client";

import { InputValue } from "../page";
import { EditorCanceler } from "./editor-canceler";

type CarouselInputValue = InputValue["carousel"];

export const CarouselEditor = ({ close, inputValue, setInputValue }: {
  close: () => void
  inputValue: CarouselInputValue
  setInputValue: (inputValue: Partial<CarouselInputValue>) => void
}) => {
  return (
    <aside className="absolute right-0 p-6 w-1/4 h-full flex flex-col bg-indigo-800">
      <div className="self-end" onClick={close}>
        <EditorCanceler />
      </div>
      <div className="h-full flex items-center">
        <ul className="w-full flex flex-col h-[500px]">
          <li className="p-6 h-1/5">
            <span className="block pb-1">長度</span>
            <div className="w-full h-full flex justify-between">
              <input
                className="w-5/6 h-full p-3 bg-yellow-500 text-black flex justify-center items-center"
                type="number"
                min="1"
                onChange={(e) => {
                  if (isNaN(Number(e.target.value))) return;
                  else setInputValue({ width: e.target.value });
                }}
                value={inputValue.width}
              />
              <span className=" h-full flex items-center">px</span>
            </div>
          </li>
          <li className="p-6 h-1/5">
            <span className="block pb-1">左圖網址</span>
            <input
              className="w-full h-full p-3 bg-indigo-500 text-black flex justify-center items-center"
              type="url"
              onChange={(e) => setInputValue({ leftSrc: e.target.value })}
              value={inputValue.leftSrc}
            />
          </li>
          <li className="p-6 h-1/5">
            <span className="block pb-1">中間圖網址</span>
            <input
              className="w-full h-full p-3 bg-indigo-500 text-black flex justify-center items-center"
              type="url"
              onChange={(e) => setInputValue({ middleSrc: e.target.value })}
              value={inputValue.middleSrc}
            />
          </li>
          <li className="p-6 h-1/5">
            <span className="block pb-1">右圖網址</span>
            <input
              className="w-full h-full p-3 bg-indigo-500 text-black flex justify-center items-center"
              type="url"
              onChange={(e) => setInputValue({ rightSrc: e.target.value })}
              value={inputValue.rightSrc}
            />
          </li>
        </ul>
      </div>
    </aside>
  );
}