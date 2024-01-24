import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TypingAnimation from "@/components/typingAnimation";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem] text-transparent stroke-2 stroke-background hover:text-inherit transition-all" style={{
          WebkitTextStrokeWidth: '1.25px',
          WebkitTextStrokeColor: 'black',
        }}>
          NoConverter.
        </h1>
        <TypingAnimation />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="picture">Upload file or drag and drop here</Label>
        <Input id="picture" type="file" />
      </div>
    </main >
  );
}
