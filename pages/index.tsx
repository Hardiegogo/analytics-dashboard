import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="text-center mt-16">
      <h1 className="text-4xl font-bold mb-8">
        Welcome to the Analytics Dashboard!
      </h1>
      <Link href="/dashboard" className="bg-white p-4 rounded-md text-black">
        Go to Dashboard
      </Link>
    </main>
  );
}
