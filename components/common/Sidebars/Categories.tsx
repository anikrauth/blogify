'use client'
import Link from "next/link";
import {useQuery} from "@tanstack/react-query";
import client from "@/lib/cms/WordPress/ApolloClient";
import {GET_CATEGORIES} from "@/lib/cms/WordPress/Quries";
import RecentPostsItemLoading from "@/components/common/LoadingAnimations/RecentPostsItemLoading";


export default function Categories () {

    const { data, isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: async () =>
            await client.request(
                GET_CATEGORIES
            ),
    })


    return(
        <div className="shadow-md rounded-[6px] bg-white px-2 py-5 mt-8 bg-white dark:bg-dark_header_color">
            <h5 className="text-[22px] font-[900] border-b-2 pb-2 border-primary_color mb-5">
                Categories
            </h5>
            <ul className="flex justify-between items-center flex-wrap">
                {
                    isLoading ? (
                        [0, 1, 2, 3, 4, 5,6,7]?.map((item: any, idx: any) => {
                            return (
                                <RecentPostsItemLoading key={idx}/>
                            )
                        })
                    ) : (
                    // @ts-ignore
                    data?.categories?.nodes?.map((item: any) => {
                        return(
                            <li key={item?.id} className=" mb-3 shadow hover:bg-primary_color dark:hover:bg-primary_color dark:bg-dark_header_color bg-category_bg_color border-primary_color border rounded-[8px] hover:text-white_color">
                                <Link className=" inline-block p-2 flex justify-between items-center text-[16px] font-[600] " href={item?.slug}>
                                    <span className="pr-3">{item?.name}</span>
                                    <span className="px-2 py-[3px] bg-primary_color text-white_color rounded-full text-[14px] " >{item?.count}</span>
                                </Link>
                            </li>
                        )
                    })
                    )
                }


            </ul>
        </div>
    )
}