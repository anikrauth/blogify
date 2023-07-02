'use client'
import BlogItem from "@/components/common/BlogItem";
import {useQuery} from "@tanstack/react-query";
import client from "@/lib/cms/WordPress/ApolloClient";
import {GET_POSTS_BY_CATEGORY, GET_POSTS, GET_TAG, GET_SEARCH_POSTS} from "@/lib/cms/WordPress/Quries";
import {useState} from "react";
import BlogItemLoading from "@/components/common/LoadingAnimations/BlogItem";
import {arrayOutputType} from "zod";
import CircleLoading from "@/components/common/LoadingAnimations/CircleLoading";

type DataType = {
    category:{
        name: string,
        id: string,
        slug: string,
        description: string,
        posts: {
            nodes: arrayOutputType<any>,
            pageInfo: any
        }
    },
    posts: {
        nodes: arrayOutputType<any>,
        pageInfo: any
    },
    tag:{
        name: string,
        id: string,
        slug: string,
        description: string,
        posts: {
            nodes: arrayOutputType<any>,
            pageInfo: any
        }
    }
}


export default function GridPosts (props: any){
    const {variables, layout} = props;
    const [page, setPage] = useState('');


    // get layout graphql document
    const document: any = layout === 'category' ? GET_POSTS_BY_CATEGORY : layout === 'home' ? GET_POSTS :  layout === 'tag' ? GET_TAG : layout === 'search' ? GET_SEARCH_POSTS : null
    // get layout key
    const key: string | null = layout === 'category' ? `gridPosts-${variables}-${page}` : layout === 'home' ? `gridPosts-home-${page}` :  layout === 'tag' ? `gridPosts-tag-${page}` : layout === 'search'? `searchGridPosts-${variables}-${page}` : null

    const { data, isLoading, isFetching, isPreviousData } = useQuery<DataType>({
        queryKey: [`${key}`],
        queryFn: async () =>
            await client.request(
                document,
                // variables are type-checked too!
                {first: 12, after: page, id: variables},
            ),
            keepPreviousData: true,
    })

    // get data by layout
    const gridData: any = layout === 'category' ? data?.category?.posts : layout === 'home' ? data?.posts :  layout === 'tag' ? data?.tag?.posts : layout === 'search'? data?.posts :  null

    console.log(`variables`, layout)
    return(
        <>
            {
                layout === 'category' ?(
                    <div className="py-[30px] flex justify-center items-center relative">
                        <h1 className="text-[32px] font-black border-b-[4px] border-primary_color">
                            {data?.category?.name}
                        </h1>
                    </div>
                ) : layout === 'home' ? <></> :  layout === 'tag' ? (
                    <div className="py-[30px] flex justify-center items-center relative">
                        <h1 className="text-[32px] font-black border-b-[4px] border-primary_color">
                            {data?.tag?.name}
                        </h1>
                    </div>
                ) : null
            }


            <div className={`all ${gridData?.nodes?.length || isLoading ? 'columns-1 md:columns-3 lg:columns-3 ' : ''} `}>
                {
                    isLoading ? (
                        [0,1,2,3,4,5,6,7,8,9,10,11]?.map((item:any, idx: any) => {
                            return(
                                <BlogItemLoading key={idx}/>
                            )
                        })
                    ):(

                        gridData?.nodes?.length ?

                            gridData?.nodes?.map((item: any) => {
                                return(
                                    <BlogItem item={item} key={item?.id} />
                                )
                            })
                            :(
                                <div className="flex justify-center items-center h-full py-[100px]">
                                    <p className="text-[32px] font-bold">No Post Found!</p>
                                </div>
                            )
                    )

                }
            </div>


                <div className={`w-full flex ${gridData?.pageInfo?.hasPreviousPage ? 'justify-between' : 'justify-center'}  items-center mt-10`}>
                    {
                        gridData?.pageInfo?.hasPreviousPage &&
                        <button className="text-[18px] font-bold px-8 py-[10px] bg-primary_color text-white rounded-[8px] flex items-center" type="button" onClick={() => setPage(gridData?.pageInfo?.startCursor)}>
                            {
                                isFetching ?
                                    <span><CircleLoading className="w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-white_color" /></span>
                                    : null
                            }
                            <span>Previous</span>
                            </button>

                    }

                    {
                        gridData?.pageInfo?.hasNextPage &&
                    <button className="text-[18px] font-bold px-8 py-[10px] bg-primary_color text-white rounded-[8px] flex items-center " type="button" onClick={() => setPage(gridData?.pageInfo?.endCursor)}>
                        {
                            isFetching ?
                            <span><CircleLoading className="w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-white_color" /></span>
                                : null
                        }

                        <span>Next</span>
                    </button>
                    }
                </div>


        </>
    )
}

