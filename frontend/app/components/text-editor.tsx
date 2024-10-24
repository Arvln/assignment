import { type InputValue } from "../page";
import { EditorCanceler } from "./editor-canceler";

type TextInputValue = InputValue["text"]

export const TextEditor = ({ close, inputValue, setInputValue }: {
  close: () => void,
  inputValue: TextInputValue,
  setInputValue: (inputValue: Partial<TextInputValue>) => void
}) => {
  return (
    <aside className="absolute right-0 p-6 w-1/4 h-full flex flex-col bg-indigo-800">
      <div className="self-end" onClick={close}>
        <EditorCanceler />
      </div>
      <div className="h-full flex items-center">
        <ul className="w-full flex flex-col h-32">
          <li className="p-6 h-1/3">
            <span className="block pb-1">文字</span>
            <input
              className="w-full p-3 bg-indigo-500 text-black flex justify-center items-center"
              onChange={(e) => setInputValue({ content: e.target.value })}
              value={inputValue.content}
            />
          </li>
        </ul>
      </div>
    </aside>
  );
}