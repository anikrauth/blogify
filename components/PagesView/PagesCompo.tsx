'use client'
import {useQuery} from "@tanstack/react-query";
import client from "@/lib/cms/WordPress/ApolloClient";
import {GET_PAGES} from "@/lib/cms/WordPress/Quries";

type DataType = {
    page:{
        content: string,
        title: string
    }
}
export default function PagesCompo(props: any){
    const {page} = props;

    const {data, isLoading} = useQuery<DataType>({
        queryKey: [`singlePage-${page}`],
        queryFn: async () =>
            await client.request(
                GET_PAGES,
                // variables are type-checked too!
                {id: page}
            ),
    })
    return(
        <section>
            <div className="h-[100px] flex justify-center items-center bg-primary_color text- rounded-2xl mb-10">
                <h1 className="text-[22px] md:text-[28px] text-white_color font-bold uppercase ">{data?.page?.title}</h1>
            </div>
            <div className="pages_content" dangerouslySetInnerHTML={{__html:`${data?.page?.content}`}} />
        </section>
    )
}