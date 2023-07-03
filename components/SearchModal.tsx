import { RxCross2 } from "react-icons/rx";
import {useState} from "react";
import {useRouter} from "next/navigation";
export default function SearchModal(props: any) {
    const router = useRouter()
    const {setSearchOpen}= props;
    const [loading, setLoading] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [placeHolder, setPlaceHolder] = useState("Search newsfeed with keywords...");

    const handleSubmitSearch = (e: any) => {
        e.preventDefault();
        if (searchInput.replaceAll(' ', '').length > 0) { router.push(`/search?q=${searchInput}`) }
        else {
            setSearchInput('')
            setPlaceHolder('Please type something..')
        }
        setSearchOpen(false)

    };

    console.log(props)

    return (
        <div className="bg-white_color dark:bg-dark_header_color h-screen w-full fixed z-[100] top-0 left-0 flex justify-center items-center ">
            <div
                className="searchBox mx-5 md:mx-0 flex items-center justify-center w-full md:w-[600px] m-auto h-[55px] border-primary_color border-2 rounded-[8px] dark:bg-dark_header_color ">
                <input minLength={1} type="search" onChange={(e) => setSearchInput(e.target.value)} className=" dark:bg-dark_header_color text-[16px] font-medium focus:outline-none px-5 w-full"
                       placeholder={placeHolder}/>
                <button onClick={handleSubmitSearch} type="button"
                        className="text-[16px] text-primary_color border-primary_color font-medium uppercase px-3 border-l">Search
                </button>
            </div>
            <button onClick={() => setSearchOpen(false)} className=" absolute top-10 right-10 border-primary_color  flex justify-center items-center w-[50px] h-[50px] rounded-full border hover:bg-primary_color text-primary_color hover:text-white_color ">
                <RxCross2 className="w-6 h-6 " />
            </button>
        </div>
    )
}