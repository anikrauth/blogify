import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import CategoryItem from "@/components/common/CategoryItem";
export default function BlogItem (props: any) {
    const {item} = props;

    return(
        <div className="featured_blog_item_wraper text-secondary_color overflow-hidden p-5 shadow-md my-5 mx-2 rounded-[12px] dark:bg-dark_header_color">
            <div className="Image_wraper overflow-hidden rounded-[12px]">
                <Link href={`/${item?.categories?.nodes[0]?.slug}/${item?.slug}`} >
                    <Image  className=" hover:scale-110 image_transitions object-center rounded-[12px] w-[300px] md:w-[400px]" src={item?.featuredImage?.node?.mediaItemUrl} alt="sds" width="400" height="400" />
                </Link>
            </div>
            <div className="content_wraper mt-[25px]">
                <div className="category flex items-center flex-wrap">
                    {
                        item?.categories?.nodes?.map((item: any) => {
                            return(
                                <CategoryItem key={item?.id} item={item} />
                            )
                        })
                    }

                </div>
                <h2 className="pt-[25px] text-[18px] md:text-[22px] font-[900] hover:underline dark:text-white_color "><Link className="line-clamp-2 " href={`/${item?.categories?.nodes[0]?.slug}/${item?.slug}`}>{item?.title}</Link></h2>
                <div className="author_wraper pt-5 flex items-center dark:text-white_color">
                    <div className="author flex items-center">
                        <span>
                            <Image className=" rounded-full" src={item?.author?.node?.avatar?.url} alt="sds" width="30" height="30" />
                        </span>
                        <h5 className="pl-2 text-[13px] font-[600]">{item?.author?.node?.name}</h5>
                    </div>
                    <div className="date text-[13px] font-[600]"><span className="dot w-[4px] inline-block mx-[10px] py-[2px] h-[4px] rounded-full bg-primary_color"></span> <span>{moment(item?.date).format('LL')}</span></div>

                </div>
            </div>
        </div>
    )
}