import Breadcumb from "@/components/common/Breadcumb";
import GridPosts from "@/components/common/GridPosts";
import {Metadata} from "next";
import client from "@/lib/cms/WordPress/ApolloClient";
import {GET_POSTS_BY_CATEGORY} from "@/lib/cms/WordPress/Quries";
import {arrayOutputType} from "zod";
import MainLayout from "@/components/common/MainLayout";
import HorizontalAd from "@/components/AdsLayouts/HorizontalAd";

type Props = {
    params: {
        category: string
    }
}
type resData = {
    category:{
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

export async function generateMetadata({ params: { category } }: Props): Promise<Metadata> {
    const res: resData = await client.request(GET_POSTS_BY_CATEGORY, {first: 0, id: category})

    return {
        title: `${res?.category?.name} - Fastest Blog website`,
        description: res?.category?.description,
        openGraph: {
            images: '',
        },
    }
}

export default function CategoryPage ({ params: { category } }: Props){
    return(
        <main className="mx-5 my-0 md:mx-16 md:my-8">
            <Breadcumb categoryName={category} />
           <MainLayout>
               <HorizontalAd classNames=" w-full lg:w-[720px] h-[100px] my-[20px] shadow" />
               <GridPosts layout="category" variables={category}/>
               <HorizontalAd classNames="w-full lg:w-[720px] h-[100px] my-[40px] shadow" />
           </MainLayout>
        </main>
    )
}