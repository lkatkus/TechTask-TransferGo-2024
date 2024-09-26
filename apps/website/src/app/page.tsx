import { ConversionWidget } from "../widgets";

export default function Home() {
  return (
    <div className="p-4 grid gap-4 grid-rows-[min-content_1fr_min-content] min-h-screen font-[family-name:var(--font-geist-sans)]">
      <header className="p-4 flex justify-center items-center bg-gray-200">
        <div>HEADER</div>
      </header>

      <main className="grid gap-4 grid-cols-[400px_1fr]">
        <div className="p-4 bg-gray-200">
          <ConversionWidget />
        </div>
        <div className="p-4 flex justify-center items-center bg-gray-200">
          <div>CONTENT</div>
        </div>
      </main>

      <footer className="p-4 flex justify-center items-center bg-gray-200">
        FOOTER
      </footer>
    </div>
  );
}
