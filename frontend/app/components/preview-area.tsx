"use client";

import Image from "next/image";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import type { ReactNode } from "react";

type Content = {
  id: string,
  renderer: ReactNode
}
type ContentsKey = "image" | "text" | "carousel" | "default"

const config: { [key in ContentsKey]: ReactNode } = {
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

export const PreviewArea = () => {
  const [contents, setContents] = useState<Content[]>([]);

  return (
    <section
      className="w-3/4 h-full overflow-auto"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        const type = e.dataTransfer.getData("text/plain") as ContentsKey;
        setContents((prev) => [
          ...prev, { id: uuidv4(), renderer: config[type] || config.default }
        ]);
      }}
    >
      <ul>
        {contents.map(({ id, renderer }) => (
          <li
            key={id}
          >
            {renderer}
          </li>
        ))}
      </ul>
    </section>
  );
}