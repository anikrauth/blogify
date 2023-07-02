'use client'
import Image from "next/image";
import CategoryItem from "@/components/common/CategoryItem";
import Dot from "@/components/common/Dot";
import moment from "moment";
import Link from "next/link";
import {useQuery} from "@tanstack/react-query";
import client from "@/lib/cms/WordPress/ApolloClient";
import {GET_POST} from "@/lib/cms/WordPress/Quries";
import {arrayOutputType} from "zod";

type postsType = {
    post: {
        title: any,
        featuredImage: {
            node: {
                mediaItemUrl: any
            }
        },
        categories: {
            nodes: arrayOutputType<any>
        },
        author: {
            node: {
                name: any
                avatar: {
                    url: any
                }
            }
        },
        date: any,
        commentCount: any,
        content: any
    }
}

export default function SinglePost(props: any) {
    const {slug} = props;
    const {data, isLoading} = useQuery<postsType>({
        queryKey: [`singlePost-${slug}`],
        queryFn: async () =>
            await client.request(
                GET_POST,
                // variables are type-checked too!
                {id: slug}
            ),
    })


    return (
        <div className=" bg-white_color dark:bg-dark_header_color p-5 rounded-[16px]">
            <div className="Image overflow-hidden  flex justify-center items-center rounded-2xl  h-full lg:h-[600px] ">
                {
                    data?.post?.featuredImage?.node?.mediaItemUrl ? (
                        <Image className=" object-cover rounded-2xl" src={data?.post?.featuredImage?.node?.mediaItemUrl}
                               alt={data?.post?.title} width="1000" height="600"/>
                    ) : (
                        <svg className="w-12 h-12 text-gray-200 dark:text-gray-600" xmlns="http://www.w3.org/2000/svg"
                             aria-hidden="true" fill="currentColor" viewBox="0 0 640 512">
                            <path
                                d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z"/>
                        </svg>
                    )

                }

            </div>
            <div className="category flex items-center flex-wrap mt-[10px] md:mt-[30px]">
                {
                    data?.post?.categories?.nodes?.map((item: any) => {
                        return (
                            <CategoryItem key={item?.id} item={item}/>
                        )
                    })
                }
            </div>
            <h1 className="pt-[25px] text-[18px] md:text-[28px] text-secondary_color font-[900] dark:text-white_color ">{data?.post?.title}</h1>
            <div className="author_wraper flex items-center text-[13px] font-[400] pt-5">
                {
                    data?.post?.author?.node ? (
                        <>
                            <div className="author_prof flex items-center">
                    <span>
                        <Image className=" object-cover rounded-full" src={data?.post?.author?.node?.avatar?.url}
                               alt={data?.post?.author?.node?.name} width="30" height="30"/>
                    </span>
                                <span className="pl-2">{data?.post?.author?.node?.name}</span>
                            </div>
                            <Dot/>
                            <p>{moment(data?.post?.date).format('LL')}</p>
                            <Dot/>
                            <p>
                                <Link className="text-primary_color hover:underline" href="#commentBox">
                                    {data?.post?.commentCount ? data?.post?.commentCount : 0} comments
                                </Link>
                            </p>
                        </>
                    ) : (
                        <div className="flex items-center mt-4 space-x-3">
                            <svg className="text-gray-200 w-14 h-14 dark:text-gray-700" aria-hidden="true"
                                 fill="currentColor"
                                 viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd"
                                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                                      clip-rule="evenodd"></path>
                            </svg>
                            <div>
                                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
                                <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                            </div>
                        </div>
                    )

                }


            </div>
            {
                data?.post?.content ? (
                    <div className="conetnt_wraper pt-5" dangerouslySetInnerHTML={{__html: `${data?.post?.content}`}}/>
                ):(
                    <div className="mt-5">
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                    </div>
                )

            }


            {/*   comments */}
            {/*<div id="commentBox" className="CommentBox_wraper p-5 bg-light_bg_color dark:bg-dark_bg_color rounded-[15px] my-10">*/}
            {/*    <h4 className="text-[22px] font-[600]"> 0 Comments</h4>*/}
            {/*    <ul className="border-b pb-5">*/}
            {/*        <li className="flex mb-8">*/}
            {/*            <div className="image pr-3"><Image className=" rounded-full" src="https://demo-noonpost.assiagroupe.net/html/assets/img/author/1.jpg" alt="dd" width="90" height="90" /></div>*/}
            {/*            <div className="content font_roboto text-text_color">*/}
            {/*                <div className="flex  font-[600] items-center text-[14px] dark:text-white_color  text-dark_header_color"><h3>Simon Albert</h3> <Dot /> <p>January 15, 2021</p></div>*/}
            {/*                <p className="text-[16px] pb-[15px] pt-2">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus at doloremque adipisci eum placeat quod non fugiat aliquid sit similique!*/}
            {/*                </p>*/}
            {/*                <button className=" dark:hover:bg-white_color hover:bg-black_color text-[13px] font-bold rounded-[14px] px-2 py-[3px] bg-primary_color dark:hover:text-dark_header_color  text-white_color">Reply</button>*/}
            {/*            </div>*/}
            {/*        </li>*/}

            {/*    </ul>*/}
            {/*</div>*/}
        </div>
    )
}