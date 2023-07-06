'use client'
import Image from "next/image";
import Link from "next/link";
import { HiChevronDown } from "react-icons/hi";
import { IoLogoFacebook, IoLogoTwitter,IoMenu, IoLogoInstagram, IoLogoYoutube, IoSearch } from "react-icons/io5"
import {useQuery} from "@tanstack/react-query";
import client from "@/lib/cms/WordPress/ApolloClient";
import {GET_LOGOS, GET_MENUS, GET_SOCIAL_MEDIAS} from "@/lib/cms/WordPress/Quries";
import {arrayOutputType} from "zod";
import SearchModal from "@/components/SearchModal";
import {useState} from "react";
import MbPopover from "@/components/Layout/MbPopover";
import dynamic from 'next/dynamic'
const DarkMode = dynamic(() => import('@/components/Layout/DarkModeButton'), { ssr: false })



type DataType = {
    menu: {
        menuItems: {
            nodes: arrayOutputType<any>
        }
    }
}

type socialDataType = {
    blogifySettings: {
        blogify_facebook: string,
        blogify_twitter: string,
        blogify_instagram: string,
        blogify_youtube: string
    }
}
export default function Header() {
    const [searchOpen, setSearchOpen] = useState(false)
    const [open, setOpen] = useState(false)
    const { data, isLoading } = useQuery<DataType>({
        queryKey: ['headerMenus'],
        queryFn: async () =>
            await client.request(
                GET_MENUS,
                {id: 'dGVybTo3'}
            ),
    })

    const { data: socialMedia, isLoading: socailMediaLoading } = useQuery<socialDataType>({
        queryKey: ['socialMediaLinks'],
        queryFn: async () =>
            await client.request(
                GET_SOCIAL_MEDIAS
            ),
    })

    const { data: LogoData, isLoading: LogoDataLoading } = useQuery<any>({
        queryKey: ['logos'],
        queryFn: async () =>
            await client.request(
                GET_LOGOS
            ),
    })

    const handleSearchOpen = () => {
        if(searchOpen){
            setSearchOpen(false)
        }{
            setSearchOpen(true)
        }
    }
    const handleMenu = () => {
        if(open){
            setOpen(false)
        }{
            setOpen(true)
        }
    }


    console.log(LogoData?.blogifySettings?.blogify_logo)

    return (
        <header className={`flex items-center bg-white dark:bg-dark_header_color shadow-md px-5 md:px-16 py-[10px] w-full`}>
            <div className="logo w-[50%] lg:w-[20%] ">
               <Link className="w-full flex items-center justify-start" href="/"> <Image src={LogoData?.blogifySettings?.blogify_logo ? LogoData?.blogifySettings?.blogify_logo : "/Images/logo.png"} width="160" height="85" alt="logo" /></Link>
            </div>
            <div className="main_menu w-[0px] lg:w-[60%] flex justify-center items-center invisible xl:visible">
                <ul className="flex items-center">
                    {

                        data?.menu?.menuItems?.nodes?.map((item: any) => {
                            return (
                                item?.parentId === null &&
                                <li key={item?.id} className="ml-[30px] Link_item text-[16px] font-semibold   relative">
                                    <Link className="hover:text-primary_color flex items-center pr-1" href={`${item.path.replace('/category/', '/')}`}>{item?.label}
                                        {
                                            item?.childItems?.nodes?.length ? (
                                                <>
                                                    <span className="pt-1 flex items-center pl-2"><HiChevronDown className="w-5 h-5" /></span>

                                                </>
                                            ): null
                                        }
                                    </Link>
                                    { item?.childItems?.nodes?.length ?
                                    <div className=" absolute z-50 sub_menu_lists top-[25px] w-[300px] left-0 hidden bg-transparent ">

                                        <ul className=" w-[200px] left-0 p-4 my-4 bg-white dark:bg-dark_header_color shadow">
                                            {
                                                item?.childItems?.nodes?.map((item: any) => {

                                                    return (
                                                        <li key={item?.id} className="hover:text-primary_color mb-[10px]">
                                                            <Link className=" inline-block pr-1" href={`${item?.path?.replace('/category/', '/')}`}>{item?.label}
                                                        </Link>
                                                        </li>
                                                    )
                                                })
                                            }

                                        </ul>
                                    </div>
                                        : null
                                    }


                                </li>
                            )
                        })
                    }

                </ul>
            </div>
            <div className="right_menu w-[50%] lg:w-[20%]  flex justify-end items-center">
                <ul className="flex items-center md:visible invisible">
                    {
                        socialMedia?.blogifySettings?.blogify_facebook === '' ? <></> : (
                            <li className="mr-4 hover:text-primary_color" >
                                <Link href={`${socialMedia?.blogifySettings?.blogify_facebook}`}><IoLogoFacebook className="w-4 h-4" /></Link>
                            </li>
                        )
                    }
                    {
                        socialMedia?.blogifySettings?.blogify_instagram  === '' ? <></> : (
                            <li className="mr-4 hover:text-primary_color" >
                                <Link href={`${socialMedia?.blogifySettings?.blogify_instagram}`}><IoLogoInstagram className="w-4 h-4" /></Link>
                            </li>
                        )
                    }
                    {
                        socialMedia?.blogifySettings?.blogify_twitter  === '' ? <></> : (
                            <li className="mr-4 hover:text-primary_color" >
                                <Link href={`${socialMedia?.blogifySettings?.blogify_twitter}`}><IoLogoTwitter className="w-4 h-4" /></Link>
                            </li>
                        )
                    }
                    {
                        socialMedia?.blogifySettings?.blogify_youtube  === '' ? <></> : (
                            <li className="mr-4 hover:text-primary_color" >
                                <Link href={`${socialMedia?.blogifySettings?.blogify_youtube}`}><IoLogoYoutube className="w-4 h-4" /></Link>
                            </li>
                        )
                    }

                </ul>
                <ul className="flex items-center ">
                    <li className="mr-4 ml-[30px]"><DarkMode /></li>

                    <li className="mr-4"><button onClick={() => handleSearchOpen()} className="w-[35px] h-[35px] rounded-full flex justify-center items-center bg-primary_color text-white "><IoSearch className="w-4 h-4" /></button></li>
                    <li className="xl:hidden block"><button onClick={() => handleMenu()} className="w-[35px] h-[35px] rounded-full flex justify-center items-center bg-primary_color text-white "><IoMenu className="w-4 h-4" /></button></li>
                </ul>
            </div>
            {
                searchOpen && <SearchModal setSearchOpen={setSearchOpen} />
            }
            {
                <MbPopover setOpen={setOpen} open={open} />

            }

        </header>
    )
}
