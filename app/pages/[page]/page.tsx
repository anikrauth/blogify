import PagesCompo from "@/components/PagesView/PagesCompo";
import MainLayout from "@/components/common/MainLayout";
import {Metadata} from "next";
import client from "@/lib/cms/WordPress/ApolloClient";
import {GET_PAGES} from "@/lib/cms/WordPress/Quries";

type Props = {
    params: {
        page: string
    }
}
type MetaDataType = {
    page:{
        title: string,
        featuredImage: {
            node: {
                mediaItemUrl: string
            }
        }
    }

}

export async function generateMetadata({ params: { page } }: Props): Promise<Metadata> {
    const res : MetaDataType = await client.request(GET_PAGES, {id: page})
    console.log(res)
    return {
        title: `${res?.page?.title} - Fastest Blog website`,
        description: res?.page?.title,
        openGraph: {
            images: res?.page?.featuredImage?.node?.mediaItemUrl || '',
        },
    }
}

export default function AllPages ({ params: { page } }: Props){
    return(
        <section className="mx-5 my-5 md:mx-16 md:my-8">
            <MainLayout>
                <PagesCompo page={page}/>
            </MainLayout>
        </section>
    )
}