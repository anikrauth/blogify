import Link from "next/link";
import {AiOutlineRight} from "react-icons/all";


export default function Breadcumb(props: any) {
    const {categoryName} = props;
    return (
        <div className="flex  items-center font-medium text-[14px] text-text_color hover:text-primary_color mt-4 md:mt-0 "><Link href="/">Home</Link>
            <AiOutlineRight className="w-4 h-4 mx-1"/> <Link className=" line-clamp-1 capitalize" href={`/${categoryName}`}>{categoryName?.replace(/-/g, " ")}</Link></div>
    )
}