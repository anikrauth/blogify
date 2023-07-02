import FeaturedPostSlider from "@/components/HomeView/FeaturedPostSlider";
import MainLayout from "@/components/common/MainLayout";
import GridPosts from "@/components/common/GridPosts";
import HorizontalAd from "@/components/AdsLayouts/HorizontalAd";


export const metadata = {
    title: 'Blogify - Fastest Blog website',
    description: 'Fastest Blog website',
}
export default function Home() {
    // console.log(process.env.NEXT_PUBLIC_BACKEND_URI)
    return (
        <main className="home_container mx-5 my-5 md:mx-16 md:my-8">
            <FeaturedPostSlider />
            <HorizontalAd classNames="w-full lg:w-[920px] h-[150px] my-[40px] md:my-[100px] shadow" />
            <MainLayout>
                <GridPosts layout="home"/>
            </MainLayout>
            <HorizontalAd classNames="w-full lg:w-[920px] h-[150px] my-[40px] md:my-[100px] shadow" />
        </main>
    )
}

