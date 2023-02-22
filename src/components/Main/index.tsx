import { Pagination, Controller, Autoplay, Navigation, EffectCoverflow } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import MainStyles from "./main.module.css";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useAppDispatch, useAppSelector } from "../../app/hook";


export const Main: React.FC = (): JSX.Element => {

    const dispatch = useAppDispatch()

    const { sliderFilms } = useAppSelector(state => state.films)

    return (
        <>
            <Swiper
                className={MainStyles.content}
                style={{ padding: "50px 50px" }}
                modules={[Pagination, EffectCoverflow, Navigation, Controller, Autoplay]}
                spaceBetween={50}
                slidesPerView={3}
                effect="coverflow"
                breakpoints={{
                    0: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                    },
                    600: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    },
                    1200: {
                        slidesPerView: 3,
                        spaceBetween: 10,
                    },
                }}
                navigation
                autoplay={true}
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                onSwiper={(swiper) => console.log(swiper)}
            >

                {
                    sliderFilms.map((elm: any, index: number) => {
                        return (
                            <SwiperSlide key={index}>
                                <img key={index}
                                    src={elm.photo}
                                    alt={elm.photo}
                                />
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
        </>
    )
}