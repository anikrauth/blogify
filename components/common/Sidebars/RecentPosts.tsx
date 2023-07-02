'use client'
import Image from "next/image";
import Link from "next/link";
import {useQuery} from "@tanstack/react-query";
import client from "@/lib/cms/WordPress/ApolloClient";
import {GET_POSTS} from "@/lib/cms/WordPress/Quries";
import moment from "moment/moment";
import RecentPostsItemLoading from "@/components/common/LoadingAnimations/RecentPostsItemLoading";
import BlogItemLoading from "@/components/common/LoadingAnimations/BlogItem";

export default function RecentPosts(props: any) {
    const {layout} = props;
    const {data, isLoading} = useQuery({
        queryKey: ['recentPosts'],
        queryFn: async () =>
            await client.request(
                GET_POSTS,
                // variables are type-checked too!
                {first: 5}
            ),
    })
    return (
        <>
            {
                layout === 'sidebar' ? (
                    <ul className="shadow-md rounded-[6px] px-2 py-5 mt-8 bg-white dark:bg-dark_header_color">
                        <h5 className="text-[22px] font-[900] border-b-2 pb-2 border-primary_color">
                            Latest Posts
                        </h5>
                        {

                            isLoading ? (
                                [0, 1, 2, 3, 4, 5]?.map((item: any, idx: any) => {
                                    return (
                                        <RecentPostsItemLoading key={idx}/>
                                    )
                                })
                            ) : (
                                // @ts-ignore
                                data?.posts?.nodes?.map((item: any) => {
                                    return (

                                        <li key={item?.id} className="grid grid-cols-5 gap-2 mt-5 ">
                                            <div className=" pr-2 col-span-2 image overflow-hidden rounded-[8px]">
                                                <Image className=" hover:scale-110 image_transitions object-center rounded-[8px] "
                                                       src={item?.featuredImage?.node?.mediaItemUrl} alt="sds" width="100"
                                                       height="100"/>
                                            </div>
                                            <div className=" col-span-3">
                                                <h3 className=" line-clamp-2 text-[14px] md:text-[16px] font-[600] hover:underline dark:text-white_color ">
                                                    <Link
                                                        href={`/${item?.categories?.nodes[0]?.slug}/${item?.slug}`}>{item?.title}</Link>
                                                </h3>
                                                <p className="text-[12px] font-[600]">{moment(item?.date).format('LL')}</p>
                                            </div>
                                        </li>
                                    )
                                })
                            )
                        }



                    </ul>
                ):(
                    <ul className="rounded-[6px]  px-2 bg-dark_header_color">
                        {

                            isLoading ? (
                                [0, 1, 2, 3, 4, 5]?.map((item: any, idx: any) => {
                                    return (
                                        <RecentPostsItemLoading key={idx}/>
                                    )
                                })
                            ) : (
                                // @ts-ignore
                                data?.posts?.nodes?.map((item: any) => {
                                    return (

                                        <li key={item?.id} className="grid grid-cols-5 gap-2 pb-[10px]">
                                            <div className=" pr-2 col-span-1 image overflow-hidden rounded-[8px]">
                                                <Image className=" hover:scale-110 image_transitions object-cover rounded-[8px] "
                                                       src={item?.featuredImage?.node?.mediaItemUrl} alt={item?.title} width="80"
                                                       height="80"/>
                                            </div>
                                            <div className=" col-span-4">
                                                <h3 className=" line-clamp-2 text-[14px] md:text-[16px] font-[600] hover:underline dark:text-white_color ">
                                                    <Link
                                                        href={`/${item?.categories?.nodes[0]?.slug}/${item?.slug}`}>{item?.title}</Link>
                                                </h3>
                                                <p className="text-[12px] font-[600]">{moment(item?.date).format('LL')}</p>
                                            </div>
                                        </li>
                                    )
                                })
                            )
                        }



                    </ul>
                )


            }
        </>

    )
}