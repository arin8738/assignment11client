
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import { Autoplay, Pagination, Navigation } from "swiper";
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import HomeBannerContent from "../../../../Components/HomeBannerContent/HomeBannerContent";

const Banner = () => {
  return (
    <div className=" bgBannerImg">
      <>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
            <HomeBannerContent
              cStyle="btn-sm"
              bgImg={`https://education.ec.europa.eu/sites/default/files/styles/eac_ratio_16_9_xl/public/2021-12/language-learning-1200x675.jpg?h=c74750f6&itok=vmcKnhmg`}
              title={`Every student matters, every moment counts.`}
              subTitle={`LANGUAGE MASTER`}
              destination1={`/login`}
              destination2={`/learn-more`}
            ></HomeBannerContent>
          </SwiperSlide>

          <SwiperSlide>
            <HomeBannerContent
            bgImg={`https://wallpaperaccess.com/full/1260521.jpg`}
            // bgImg={`https://as2.ftcdn.net/v2/jpg/02/39/56/53/1000_F_239565396_5onQ3TJYWACYZbPjdIAMX9WYYMKs4Ycz.jpg`}
              cStyle="btn-sm"
              title={`
              Teaching Turning
              Today's Learners Into
              Tomorrow's Leaders`}
              subTitle={`LANGUAGE MASTER`}
              destination1={`/login`}
              destination2={`/learn-more`}
            ></HomeBannerContent>
          </SwiperSlide>

          <SwiperSlide>
            <HomeBannerContent
            bgImg={`https://wallpaperaccess.com/full/3485271.jpg`}
              cStyle="btn-sm"
              title={`
              To have another language is to possess a second soul.`}
              subTitle={`LANGUAGE MASTER`}
              destination1={`/login`}
              destination2={`/learn-more`}
            ></HomeBannerContent>
          </SwiperSlide>

          <SwiperSlide>
            <HomeBannerContent
            bgImg={`https://images.theconversation.com/files/45159/original/rptgtpxd-1396254731.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1356&h=668&fit=crop`}
              cStyle="btn-sm"
              title={`
              Putting Children First. Preparing Children For Success In Life`}
              subTitle={`LANGUAGE MASTER`}
              destination1={`/login`}
              destination2={`/learn-more`}
            ></HomeBannerContent>
          </SwiperSlide>
        </Swiper>
      </>
    </div>
  );
};

export default Banner;
