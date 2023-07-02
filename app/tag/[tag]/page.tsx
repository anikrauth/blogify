import Breadcumb from "@/components/common/Breadcumb";
import MainLayout from "@/components/common/MainLayout";
import GridPosts from "@/components/common/GridPosts";
import HorizontalAd from "@/components/AdsLayouts/HorizontalAd";

type Props = {
    params: {
        tag: string
    }
}
export default function Tag ({ params: { tag } }: Props){
    return(
        <main className="mx-5 my-0 md:mx-16 md:my-8">
            <Breadcumb categoryName={tag} />
            <MainLayout>
                <HorizontalAd classNames=" w-full lg:w-[720px] h-[100px] my-[20px] shadow" />
                <GridPosts layout="tag" variables={tag} />
                <HorizontalAd classNames=" w-full lg:w-[720px] h-[100px] my-[20px] shadow" />
            </MainLayout>
        </main>
    )
}