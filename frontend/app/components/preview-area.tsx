"use client";

import Image from "next/image";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

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
export type ContentsKey=keyof typeof config
type Content = {
  id: string,
  type: ContentsKey
}

export const PreviewArea = ({
  setSelectedEditorType
}: {
  setSelectedEditorType: (type: ContentsKey) => void
}) => {
  const [contents, setContents] = useState<Content[]>([]);

  return (
    <section
      className="w-3/4 h-full overflow-auto"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        const type = e.dataTransfer.getData("text/plain") as ContentsKey;
        setContents((prev) => [...prev, { id: uuidv4(), type }]);
      }}
    >
      <ul>
        {contents.map(({ id, type }) => (
          <li
            key={id}
            onClick={() => setSelectedEditorType(type)}
          >
            {config[type] || config.default}
          </li>
        ))}
      </ul>
    </section>
  );
}