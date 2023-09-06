import { useState } from "react";
import Nav from "./Nav"
import { useSession, signIn, signOut } from "next-auth/react";

import Logo from "@/components/Logo";
import MarqueePage from "./MarqueePage";
import Marquee from "./Marquee";
export default function Layout({ children }) {
    const { data: session } = useSession();
    const [showNav, setShowNav] = useState(false);
    if (!session) {
        return (
            <div className="bg-blue-900 w-screen h-screen flex flex-col items-center">

                <div className="w-16 h-auto absolute top-0 left-0 m-4">
                    <img src="/mainLogo.jpeg" alt="" />
                    <div className="top-0 mt-0 left-0">
                        <h1 className="text-white text-2xl mb-4">Welcome to ASSET MANAGEMENT ADMIN</h1>

                    </div>

                </div>


                <div className="text-center w-full">


                    <button onClick={() => signIn('google')} className="bg-white p-2 px-4 rounded-lg text-black"> Login with Google</button>
                </div>
                <Marquee />
            </div>
        );
    }
    return (
        <div className="bg-blue-900 min-h-screen">
            <div className="block md:hidden flex items-centerp-4 ">
                <button onClick={() => setShowNav(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                    </svg>

                </button>
                <div className="flex grow justify-center mr-6">
                    <Logo />
                </div>

            </div>

            <div className="flex">
                <Nav show={showNav} />
                <div className="bg-white flex-grow  rounded-lg p-4 text-black">
                    {children}
                </div>
            </div>
        </div>

    );

}


