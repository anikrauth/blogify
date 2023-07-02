import {Fragment, useState} from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { RxCross2 } from "react-icons/rx";
import {useQuery} from "@tanstack/react-query";
import client from "@/lib/cms/WordPress/ApolloClient";
import {GET_MENUS} from "@/lib/cms/WordPress/Quries";
import {arrayOutputType} from "zod";
import Link from "next/link";
import {HiChevronRight, HiChevronLeft} from "react-icons/hi";

type DataType = {
    menu: {
        menuItems: {
            nodes: arrayOutputType<any>
        }
    }
}
export default function MbPopover(props: any) {
    const {open, setOpen} = props;
    const [subMenuData, setSubMenuData] = useState<any>(null)
    const { data, isLoading } = useQuery<DataType>({
        queryKey: ['headerMbMenus'],
        queryFn: async () =>
            await client.request(
                GET_MENUS,
                {id: 'dGVybTo3'}
            ),
    });

    console.log(subMenuData)

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10 " onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden ">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-in-out duration-500"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in-out duration-500"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                                            <button
                                                type="button"
                                                className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                                onClick={() => setOpen(false)}
                                            >
                                                <span className="sr-only">Close panel</span>
                                                <RxCross2 className="h-6 w-6" aria-hidden="true" />
                                            </button>
                                        </div>
                                    </Transition.Child>
                                    <div className="flex h-full flex-col overflow-y-scroll dark:bg-dark_header_color bg-white pb-6 shadow-xl">
                                        <div className="px-4 sm:px-6 border-dark_bg_color border-b flex items-center py-4 flex items-center">
                                            {
                                                subMenuData ?
                                                    <span onClick={() => setSubMenuData(null)} className="w-6 h-6 flex cursor-pointer justify-center items-center rounded-full mr-2 border"><HiChevronLeft className="w-5 h-5" /></span>
                                                    : null
                                            }

                                            <h3 className="text-[16px] uppercase"> {subMenuData ? subMenuData?.label : 'Categories'}</h3>
                                        </div>
                                        <div className="relative mt-6 flex-1 px-4 sm:px-6">

                                            <ul>
                                                {
                                                    subMenuData ? (
                                                        subMenuData?.childItems?.nodes?.map((item: any) => {
                                                            return (
                                                                <li  key={item?.id} className=" flex justify-between items-center Link_item text-[16px] font-[400] mb-3  relative">
                                                                    <Link href={`${item?.path?.replace('/category/', '/')}`}>
                                                                        <span>{item?.label}</span>
                                                                    </Link>
                                                                    {
                                                                        item?.childItems?.nodes?.length ? (
                                                                            <>
                                                                                <span onClick={() => setSubMenuData(item)} className="pt-1 flex items-center cursor-pointer pl-2"><HiChevronRight className="w-5 h-5" /></span>

                                                                            </>
                                                                        ): null
                                                                    }
                                                                </li>
                                                            )
                                                        })
                                                    ): (
                                                        data?.menu?.menuItems?.nodes?.map((item: any) => {
                                                            return (
                                                                item?.parentId === null &&
                                                                <li  key={item?.id} className=" flex justify-between items-center Link_item text-[16px] font-[400] mb-3  relative">
                                                                    <Link href={`${item?.path?.replace('/category/', '/')}`}>
                                                                        <span>{item?.label}</span>
                                                                    </Link>
                                                                    {
                                                                        item?.childItems?.nodes?.length ? (
                                                                            <>
                                                                                <span onClick={() => setSubMenuData(item)} className="pt-1 flex items-center cursor-pointer pl-2"><HiChevronRight className="w-5 h-5" /></span>

                                                                            </>
                                                                        ): null
                                                                    }
                                                                </li>
                                                            )
                                                        })
                                                    )

                                                }

                                            </ul>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
