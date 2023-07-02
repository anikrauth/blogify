import Link from "next/link";

export default function CategoryItem (props: any) {
    const {item} = props;
    return(
        <Link key={item?.id} className="mt-2 hover:bg-secondary_color dark:hover:bg-white_color dark:hover:text-secondary_color rounded-[15px] text-[12px] font-[400] text-white_color bg-primary_color px-[12px] py-[6px] mr-[8px]" href={`/${item?.slug}`}>{item?.name}</Link>
    )
}