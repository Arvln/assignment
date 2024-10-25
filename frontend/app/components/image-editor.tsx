import { type InputValue } from "../page";
import { EditorCanceler } from "./editor-canceler";

type ImageInputValue = InputValue["image"]

export const ImageEditor = ({ close, inputValue, setInputValue }: {
  close: () => void,
  inputValue: ImageInputValue
  setInputValue: (inputValue: Partial<ImageInputValue>) => void
}) => {
  return (
    <aside className="absolute right-0 p-6 w-1/4 h-full flex flex-col bg-indigo-800">
      <div className="self-end" onClick={close}>
        <EditorCanceler />
      </div>
      <div className="h-full flex items-center">
        <ul className="w-full flex flex-col h-80">
          <li className="p-6 h-1/3">
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
          <li className="p-6 h-1/3">
            <span className="block pb-1">寬度</span>
            <div className="w-full h-full flex justify-between">
              <input
                className="w-5/6 h-full p-3 bg-teal-500 text-black flex justify-center items-center"
                type="number"
                min="1"
                onChange={(e) => {
                  if (isNaN(Number(e.target.value))) return;
                  else setInputValue({ height: e.target.value })
                }}
                value={inputValue.height}
              />
              <span className=" h-full flex items-center">px</span>
            </div>
          </li>
          <li className="p-6 h-1/3">
            <span className="block pb-1">網址</span>
            <input
              className="w-full h-full p-3 bg-indigo-500 text-black flex justify-center items-center"
              type="url"
              onChange={(e) => setInputValue({ src: e.target.value })}
              value={inputValue.src}
            />
          </li>
        </ul>
      </div>
    </aside>
  );
}