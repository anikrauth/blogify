import Link from "next/link";
import {arrayOutputType} from "zod";
import {useQuery} from "@tanstack/react-query";
import client from "@/lib/cms/WordPress/ApolloClient";
import {GET_MENUS} from "@/lib/cms/WordPress/Quries";
import RecentPosts from "@/components/common/Sidebars/RecentPosts";

type DataType = {
    menu: {
        menuItems: {
            nodes: arrayOutputType<any>
        }
    }
}
export default function Footer(){
    const { data, isLoading } = useQuery<DataType>({
        queryKey: ['footerMenus'],
        queryFn: async () =>
            await client.request(
                GET_MENUS,
                {id: 'dGVybTo4'}
            ),
    })

    const date = new Date();

    return(
        <footer className="bg-dark_header_color text-white_color ">
            <div className="px-10  grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4 gap-10 py-[40px]">
                {
                    data?.menu?.menuItems?.nodes?.map((item: any) => {
                        return(
                            !item?.parentId &&
                            <div key={item?.id} className="item ">
                                <h3 className="text-18px] font-bold pb-4 border-primary_color">{item?.label}</h3>
                                {
                                    item?.description && <p className="text-[15px] font-[400] text-text_color">{item?.description}</p>
                                }
                                {
                                    item?.childItems?.nodes?.length ?
                                    <ul>
                                        {
                                            item?.childItems?.nodes?.map((item: any) => {
                                                return(
                                                    <li className="text-[15px] font-medium pb-2" key={item?.id}><Link href={`${item?.label}`}>{item?.label}</Link></li>
                                                )
                                            })

                                        }
                                    </ul>
                                        : null
                                }

                            </div>
                        )
                    })
                }
                <div className="item ">
                    <h3 className="text-18px] font-bold pb-4 border-primary_color">Recent Posts</h3>

                    <RecentPosts layout="footer" />

                </div>

            </div>
            <div className="px-10 bottom_footer bg-black_color flex justify-between items-center py-5">
                <p className="text-[16px]">@{date.getFullYear()} – All Right Reserved. Product by <Link className=" text-primary_color hover:underline" href="/">XpeedSoft</Link></p>
                <ul></ul>
            </div>
        </footer>
    )
}