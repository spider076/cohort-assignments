import Landing from "ui/components/Landing";

export default function Page(): JSX.Element {
  return (
    <main className="bg-red-400 text-yellow-400">
     <Landing user={'Admin'} />
    </main>
  );
}
