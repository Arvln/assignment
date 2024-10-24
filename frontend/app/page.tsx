"use client";

import { useState } from "react";
import { CarouselEditor } from "./components/carousel-editor";
import { ElementCreator } from "./components/element-creator";
import { ImageEditor } from "./components/image-editor";
import { type ContentsKey, PreviewArea } from "./components/preview-area";
import { TextEditor } from "./components/text-editor";

export default function Home() {
  const [selectedEditorType, setSelectedEditorType]=useState<ContentsKey>("default")
  const editorConfig = {
    image: <ImageEditor
      close={() => setSelectedEditorType("default")}
    />,
    text: <TextEditor
      close={() => setSelectedEditorType("default")}
    />,
    carousel: <CarouselEditor
      close={() => setSelectedEditorType("default")}
    />,
    default: null
  }

  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <main className="relative flex h-screen">
        <PreviewArea
          setSelectedEditorType={(type) => setSelectedEditorType(type)}
        />
        <ElementCreator />
        {editorConfig[selectedEditorType] || editorConfig.default}
      </main>
    </div>
  );
}
