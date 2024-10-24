import { CarouselEditor } from "./components/carousel-editor";
import { ElementCreator } from "./components/element-creator";
import { ImageEditor } from "./components/image-editor";
import { PreviewArea } from "./components/preview-area";
import { TextEditor } from "./components/text-editor";

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <main className="flex h-screen">
        <PreviewArea />
        <ElementCreator />
      </main>
    </div>
  );
}
