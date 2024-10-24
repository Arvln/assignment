"use client";

import { useMemo, useState } from "react";
import { CarouselEditor } from "./components/carousel-editor";
import { ElementCreator } from "./components/element-creator";
import { ImageEditor } from "./components/image-editor";
import { type ContentsKey, PreviewArea } from "./components/preview-area";
import { TextEditor } from "./components/text-editor";
import { useDebounce } from "./hooks/useDebounce";

export const defaultInputValue = {
  image: {
    width: "300",
    height: "300",
    src: "/globe.svg"
  },
  text: {
    content: "請點擊以編輯文字"
  },
  carousel: {
    width: "300",
    height: "300",
    src: "/globe.svg"
  },
  default: {}
}
export type InputValue = typeof defaultInputValue

export default function Home() {
  const [selectedEditorType, setSelectedEditorType] = useState<ContentsKey>("default")
  const [inputValue, setInputValue] = useState(defaultInputValue.default);
  const debouncedInputValue = useDebounce(inputValue, 300);

  const editorConfig = {
    image: <ImageEditor
      close={() => setSelectedEditorType("default")}
      inputValue={inputValue as InputValue["image"]}
      setInputValue={(inputValue: Partial<InputValue["image"]>) =>
        setInputValue((prev) => ({ ...prev, ...inputValue }))
      }
    />,
    text: <TextEditor
      close={() => setSelectedEditorType("default")}
      inputValue={inputValue as InputValue["text"]}
      setInputValue={(inputValue: Partial<InputValue["text"]>) =>
        setInputValue((prev) => ({ ...prev, ...inputValue }))
      }
    />,
    carousel: <CarouselEditor
      close={() => setSelectedEditorType("default")}
    />,
    default: null
  }
  const previewContent = useMemo(() => (
    <PreviewArea
      debouncedInputValue={debouncedInputValue}
      setInputValue={(value: InputValue[ContentsKey]) => setInputValue(value)}
      setSelectedEditorType={(type) => setSelectedEditorType(type)}
    />
  ), [debouncedInputValue])

  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <main className="relative flex h-screen">
        {previewContent}
        <ElementCreator />
        {editorConfig[selectedEditorType] || editorConfig.default}
      </main>
    </div>
  );
}
