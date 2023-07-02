'use client'
import Link from "next/link";
import {useQuery} from "@tanstack/react-query";
import client from "@/lib/cms/WordPress/ApolloClient";
import {GET_TAGS} from "@/lib/cms/WordPress/Quries";
import RecentPostsItemLoading from "@/components/common/LoadingAnimations/RecentPostsItemLoading";

export default function TagsLists() {
    const { data, isLoading } = useQuery({
        queryKey: ['Tags'],
        queryFn: async () =>
            await client.request(
                GET_TAGS
            ),
    })
    return (
        <div className="shadow-md rounded-[6px] bg-white px-2 py-5 mt-8 bg-white dark:bg-dark_header_color">
            <h5 className="text-[22px] font-[900] border-b-2 pb-2 border-primary_color mb-5">
                Tags
            </h5>
            <ul className="flex justify-between items-center flex-wrap">
                {
                    isLoading ? (
                        [0, 1, 2, 3, 4, 5,6,7, 8,9]?.map((item: any, idx: any) => {
                            return (
                                <RecentPostsItemLoading key={idx}/>
                            )
                        })
                    ) : (
                    // @ts-ignore
                    data?.tags?.nodes?.map((item: any) => {
                        return (
                            <li key={item?.id}
                                className=" mb-3 shadow hover:bg-primary_color dark:hover:bg-primary_color dark:bg-dark_header_color bg-category_bg_color  rounded-[8px] hover:text-white_color">
                                <Link
                                    className=" inline-block p-2 flex justify-between items-center text-[13px] font-[600] "
                                    href={`/tag/${item?.slug}`}>
                                    <span className="pr-3">{item?.name}</span>
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