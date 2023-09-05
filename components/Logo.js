import Link from "next/link";
export default function Logo() {
    return (
        <Link href={'/'} className="flex gap-1 ">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" id="reliance-industries-ltd"><path fill="#FFF9DD" d="M26 32H6a6 6 0 0 1-6-6V6a6 6 0 0 1 6-6h20a6 6 0 0 1 6 6v20a6 6 0 0 1-6 6z"></path><path fill="#FFD200" fill-rule="evenodd" d="M20.797 22.575a1.87 1.87 0 0 1-1.099.358c-1.29 0-1.058-.8-4.233-3.964l-.01-.01c.135.024.271.036.408.036 1.304 0 2.528-1.024 2.528-2.468 0-1.536-1.202-2.376-2.71-2.376-2.035 0-4.004 1.828-4.004 5.047 0 1.373.433 3.353 1.259 4.419C9.96 22.338 8 19.551 8 16.241c0-3.606 2.429-6.471 5.19-7.4.839-.34 1.8-.508 2.777-.508 4.745 0 8.013 3.833 8.029 7.59.08 2.651-1.098 5.085-3.199 6.652z" clip-rule="evenodd"></path><path fill="#FFE777" fill-rule="evenodd" d="M14.155 23.587c-.671-.715-1.242-1.592-1.242-2.53 0-1.089.9-1.819 1.293-3.991.106 1.52 1.243 2.737 1.243 4.086 0 .863-.472 1.726-1.222 2.515l-.072-.08z" clip-rule="evenodd"></path></svg>
            <span className="">
                Asset Admin
            </span>
        </Link>
    );

}