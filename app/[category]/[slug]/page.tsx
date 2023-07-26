import {Metadata} from "next";
import {GET_POST} from "@/lib/cms/WordPress/Quries";
import client from "@/lib/cms/WordPress/ApolloClient";
import Breadcumb from "@/components/common/Breadcumb";
import '@/lib/cms/WordPress/Styles/theme.min.css'
import MainLayout from "@/components/common/MainLayout";
import {arrayOutputType} from "zod";
import SinglePost from "@/components/SignlePostView/SinglePost";

type Props = {
    params: {
        slug: string
    }
}

type postsType = {
    post: {
        title: any
        featuredImage:{
            node:{
                mediaItemUrl: any
            }
        },
        categories:{
            nodes: arrayOutputType<any>
        },
        author:{
            node:{
                name: any
                avatar: {
                    url: any
                }
            }
        },
        excerpt: any
        date: any
        commentCount: any
        content: any
    }
}

export async function generateMetadata({ params: { slug } }: Props): Promise<Metadata> {
    const res: postsType = await client.request(
            GET_POST,
            // variables are type-checked too!
            {id: slug}
        )

    return {
        title: `${res?.post?.title} - Fastest Blog website`,
        description: res?.post?.excerpt.replaceAll(/<\/?[^>]+(>|$)/gi, ""),
        openGraph: {
            images: '',
        },
    }
}

export default function SingleBlogPage({params: {slug}}: Props){
    
    return(
        <section className="mx-0 my-0 md:mx-20 md:my-8 px-4 md:px-0">
            <Breadcumb categoryName={slug} />
            <MainLayout>
                <SinglePost slug={slug}/>
            </MainLayout>
        </section>
    )
}