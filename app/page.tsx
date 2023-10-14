import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  // const getDetails = async () => {
  //   const res = fetch("http://localhost:3000/api/getDocs");
  //   const { message } = await (await res).json();
  //   return message

  // };
  // const message = await getDetails();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link prefetch={false} href="/api">Access the docs here</Link>
    </main>
  );
}
