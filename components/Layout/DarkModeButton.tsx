'use client'
import {IoPartlySunnyOutline, IoMoonOutline} from "react-icons/io5";
import {useDispatch, useSelector} from "react-redux";
import {useTheme} from "next-themes";
import {useEffect} from "react";
import {toggleDarkMode} from "@/utils/Redux/DarkMode";


export default function DarkMode (){
    const {mode} = useSelector((state: any) => state.darkMode);
    const dispatch = useDispatch();
    const { setTheme } = useTheme();
    useEffect(() => {
        setTheme(mode)
    }, [mode])
    const handleDarkModeToggle = () => {
        dispatch(toggleDarkMode());
    };
    return(
        <>
            <button onClick={
                () => handleDarkModeToggle()
            } className={`${mode === 'light' ? 'hover:bg-secondary_color hover:text-white' : 'hover:bg-white_color hover:text-black_color'} w-[35px] h-[35px] border rounded-full flex justify-center items-center `}>
                {
                    mode === 'light' ?
                        <IoPartlySunnyOutline className="w-4 h-4" />
                        : <IoMoonOutline className="w-4 h-4" />
                }

            </button>
        </>
    )
}