"use client";

import Image from "next/image";
import { type ReactNode, useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { InputValue, defaultInputValue } from "../page";

const config = {
  image: <Image
    src="/globe.svg"
    width={300}
    height={300}
    alt="default image"
  />,
  text: <div className="h-12 flex items-center">請點擊以編輯文字</div>,
  carousel: <div className="h-12">carousel content</div>,
  default: <div>目前不支援的編輯格式</div>
}
export type ContentsKey=keyof InputValue
type Content = {
  id: string,
  type: ContentsKey,
  value: InputValue[ContentsKey],
  renderer: ReactNode
}

export const PreviewArea = ({
  debouncedInputValue,
  setInputValue,
  setSelectedEditorType
}: {
  debouncedInputValue: InputValue[ContentsKey]
  setInputValue: (value: InputValue[ContentsKey]) => void
  setSelectedEditorType: (type: ContentsKey) => void
}) => {
  const [contents, setContents] = useState<Content[]>([]);
  const selectedIdRef = useRef("");

  useEffect(() => {
    const selectedId = selectedIdRef.current;
    if (selectedId !== "") {
      setContents((prev) => prev.map((content) => {
        if (content.id !== selectedId) return content;
        else if (content.type === 'image') {
          const value = debouncedInputValue as InputValue["image"]
          return {
            ...content,
            value,
            renderer: <img
              src={value.src}
              width={Number(value.width)}
              height={Number(value.height)}
              alt="custom image"
            />
          };
        }
        else if (content.type === 'text') {
          const value = debouncedInputValue as InputValue["text"]
          return {
            ...content,
            value,
            renderer: <div
              className="h-12 flex items-center">
              {value.content}
            </div>
          };
        }
        else if (content.type === 'carousel') {
          const value = debouncedInputValue as InputValue["carousel"]
          return {
            ...content,
            value,
            renderer: <div
              className="h-12 flex items-center">
              {value.width}
              {value.height}
              {value.src}
            </div>
          };
        }
        else return content;
      }))
    }
  }, [debouncedInputValue])

  return (
    <section
      className="w-3/4 h-full overflow-auto"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        const type = e.dataTransfer.getData("text/plain") as ContentsKey | "";
        if (type === "") return;

        setContents((prev) => [
          ...prev,
          {
            id: uuidv4(),
            type,
            value: defaultInputValue[type],
            renderer: config[type] || config.default
          }]
        );
      }}
    >
      <ul>
        {contents.map(({ id, type, value, renderer }) => (
          <li
            key={id}
            onClick={() => {
              setSelectedEditorType(type)
              selectedIdRef.current = id;
              setInputValue(value);
            }}
          >
            {renderer}
          </li>
        ))}
      </ul>
    </section>
  );
}