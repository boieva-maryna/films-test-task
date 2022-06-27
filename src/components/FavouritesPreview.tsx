import { FC } from "react";
import { Film } from "../api/types";
import FilmCard from "./FilmCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";
import { Box, useBreakpointValue } from "@chakra-ui/react";

const FavouritesPreview: FC<{ films: Film[] }> = ({ films }) => {
      const variant = useBreakpointValue({ base: 1, sm:2, md:3, lg:4 })

  return (
<Swiper
        slidesPerView={variant}
        spaceBetween={10}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
      >      {films.map((film) => (
        <SwiperSlide key={film.guid}>
            <Box w={{basm:"50vw", md:"30vw", lg:"25vw"}} >
          <FilmCard  film={film} />
          </Box>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default FavouritesPreview;
