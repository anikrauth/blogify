import RecentPosts from "@/components/common/Sidebars/RecentPosts";
import Categories from "@/components/common/Sidebars/Categories";
import TagsLists from "@/components/common/Sidebars/Tags";
import VerticalAd from "@/components/AdsLayouts/VerticalAd";

export default function MainLayout ({children}: any){
    // dark:shadow-dark_header_color bg-white_color dark:bg-dark_header_color shadow-xl
    return(
        <div className="grid grid-cols-3 lg:grid-cols-12 gap-0 md:gap-6 mt-10">
            <div className="col-span-3 lg:col-span-9 ">
                {children}
            </div>
            <aside className="col-span-3 lg:col-span-3">
                <VerticalAd classNames="w-[320px] h-[250px]" />
                <RecentPosts layout="sidebar" />
                <Categories />
                <TagsLists />
                <VerticalAd classNames="w-[320px] h-[250px] mt-10" />
            </aside>
        </div>
    )
}