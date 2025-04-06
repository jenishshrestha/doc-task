import Header from "@/components/header";
import Preview from "@/components/preview";

export default function Home() {
  return (
    <>
      <main className="main bg-background m-2 flex h-[calc(100vh-16px)] flex-col rounded-lg border">
        <Header />
        <Preview />
      </main>
    </>
  );
}
