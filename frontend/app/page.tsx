import { Editor } from "./components/editor";
import { PreviewArea } from "./components/preview-area";

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <main className="flex h-screen">
        <PreviewArea />
        <Editor />
      </main>
    </div>
  );
}
