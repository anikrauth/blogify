import Image from "next/image";
import Link from "next/link";
import moment from "moment/moment";

export default function TemplateSliderTwo (props: any){
    const {item} = props;
    return(
        <div className="template_slider_two_wraper relative bg_overlay rounded-2xl text-white_color">
            <Image className="h-[350px] md:h-[560px] rounded-2xl object-cover" src={item?.featuredImage?.node?.mediaItemUrl} alt={item?.title} width="1000" height="1000" />
            <div className="content_wraper absolute bottom-0 z-10 p-6">
                <div className="category flex items-center flex-wrap">
                    {
                        item?.categories?.nodes?.map((item: any) => {
                            return(
                                <Link key={item?.id} className=" mt-2 hover:bg-secondary_color dark:hover:bg-white_color dark:hover:text-secondary_color rounded-[15px] text-[12px] font-[400] text-white_color bg-primary_color px-[12px] py-[6px] mr-[8px]" href={`/${item?.slug}`}>{item?.name}</Link>
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