import Layout from "@/components/Layout";
import Nav from "../components/Nav"
import { useSession, signIn, signOut } from "next-auth/react";



export default function Home() {
  const { data: session } = useSession();
  //if (!session) return;
  console.log(session?.user)

  return <Layout>
    <div className="text-blue-900 flex justify-between">
      <h2>
        Hello,<b>{session?.user?.name}</b>


      </h2>
      <div className="flex bg-grey-300 gap-1 text- black rounded-lg overflow-hidden">
        <img src={session?.user?.image} alt="" className=" w-6 h-6"></img>
        <span className="px-2 ">
          {session?.user?.email}
        </span>

      </div>
    </div>

  </Layout>
}


