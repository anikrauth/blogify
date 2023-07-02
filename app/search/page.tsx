'use client'
import MainLayout from "@/components/common/MainLayout";
import GridPosts from "@/components/common/GridPosts";

export default function Search (params: any){


    return(
        <main className="mx-5 my-0 md:mx-16 md:my-8">
            <MainLayout>
                <div className="search_heading">
                    <h3 className="text-[18px] font-medium">Searching for <strong className=" capitalize">{params?.searchParams?.q}</strong></h3>
                </div>
                <GridPosts layout="search" variables={params?.searchParams?.q} />
            </MainLayout>
        </main>
    )
}