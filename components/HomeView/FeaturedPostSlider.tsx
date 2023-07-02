'use client'
import {Swiper, SwiperSlide} from "swiper/react";
// Import Swiper styles
import "swiper/css";
// import required modules
import {Pagination, Autoplay} from "swiper";
import BlogItem from "@/components/common/BlogItem"
import {useQuery} from "@tanstack/react-query";
import client from "@/lib/cms/WordPress/ApolloClient";
import {GET_POSTS} from "@/lib/cms/WordPress/Quries";
import themeSettings from '../../ThemeSettings'
import TemplateSliderTwo from "@/components/common/HeroSliders/TemplateSliderTwo";
import FeaturedBlogItemsLoading from "@/components/common/LoadingAnimations/FeaturedBlogItemLoading";
import BlogItemLoading from "@/components/common/LoadingAnimations/BlogItem";


export default function FeaturedPostSlider() {
    const {HeroSliderStyle} = themeSettings
    const {data, isLoading} = useQuery({
        queryKey: ['sliderPosts'],
        queryFn: async () =>
            await client.request(
                GET_POSTS
            ),
    })


    return (
        <>
            {
                HeroSliderStyle === 'style-1' ? (
                    <Swiper

                        pagination={{
                            clickable: true,
                        }}
                        slidesPerView={1}
                        spaceBetween={15}
                        breakpoints={{
                            "@0.00": {
                                slidesPerView: 1,
                                spaceBetween: 5,
                            },
                            "@0.75": {
                                slidesPerView: 2,
                                spaceBetween: 10,
                            },
                            "@1.00": {
                                slidesPerView: 3,
                                spaceBetween: 15,
                            },
                            "@1.50": {
                                slidesPerView: 4,
                                spaceBetween: 15,
                            },
                        }}
                        modules={[Pagination, Autoplay]}
                        className="mySwiper"
                        autoplay={{
                            delay: 3500,
                            disableOnInteraction: false
                        }}
                    >
                        {
                            isLoading ? (
                                [0, 1, 2, 3]?.map((item: any, idx: any) => {
                                    return (
                                        <SwiperSlide key={idx}>
                                            <BlogItemLoading/>
                                        </SwiperSlide>
                                    )
                                })

                            ) : (
                                // @ts-ignore
                                data?.posts?.nodes?.map((item: any, idx: any) => {
                                    return (
                                        item?.postsFields?.selectForSlider &&
                                        <SwiperSlide key={idx}>
                                            <BlogItem item={item}/>
                                        </SwiperSlide>
                                    )
                                })
                            )


                        }


                    </Swiper>
                ) : (
                    <Swiper
                        pagination={{
                            clickable: true,
                        }}
                        slidesPerView={1}
                        spaceBetween={15}
                        breakpoints={{
                            "@0.00": {
                                slidesPerView: 1,
                                spaceBetween: 10,
                            },
                            "@0.75": {
                                slidesPerView: 2,
                                spaceBetween: 15,
                            },
                            "@1.00": {
                                slidesPerView: 2,
                                spaceBetween: 25,
                            },
                            "@1.50": {
                                slidesPerView: 3,
                                spaceBetween: 35,
                            },
                        }}
                        modules={[Pagination, Autoplay]}
                        className="mySwiper"
                        autoplay={{
                            delay: 3500,
                            disableOnInteraction: false
                        }}
                    >
                        {
                            isLoading ? (
                                [0, 1, 2, 3]?.map((item: any, idx: any) => {
                                    return (
                                        <SwiperSlide key={idx}>
                                            <FeaturedBlogItemsLoading/>
                                        </SwiperSlide>
                                    )
                                })

                            ) : (
                                // @ts-ignore
                                data?.posts?.nodes?.map((item: any, idx: any) => {
                                    return (
                                        item?.postsFields?.selectForSlider &&
                                        <SwiperSlide key={idx}>
                                            <TemplateSliderTwo item={item}/>
                                        </SwiperSlide>
                                    )
                                })
                            )
                        }


                    </Swiper>
                )
            }
        </>

    )
}
