'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

const testimonialData = [
  {
    image: '/img/avatar/testimonial-1.jpg',
    name: 'David Beckham',
    position: 'UX Designer',
    des: 'Proin massa augue, lacinia at blandit ac, fringilla scelerisque tortor. Mauris sit amet lectus porta, porta lectus non, malesuada neque. Integer in tempus leo. Quisque vitae leo ac ex suscipit iaculis eu in nisl. Donec vestibulum volutpat lectus, vel aliquet massa porttitor in. Integer eleifend',
  },
  {
    image: '/img/avatar/testimonial-2.jpg',
    name: 'David Fincher',
    position: 'UX Designer',
    des: 'Proin massa augue, lacinia at blandit ac, fringilla scelerisque tortor. Mauris sit amet lectus porta, porta lectus non, malesuada neque. Integer in tempus leo. Quisque vitae leo ac ex suscipit iaculis eu in nisl. Donec vestibulum volutpat lectus, vel aliquet massa porttitor in. Integer eleifend',
  },
  {
    image: '/img/avatar/testimonial-3.jpg',
    name: 'Ridley Scott',
    position: 'UX Designer',
    des: 'Proin massa augue, lacinia at blandit ac, fringilla scelerisque tortor. Mauris sit amet lectus porta, porta lectus non, malesuada neque. Integer in tempus leo. Quisque vitae leo ac ex suscipit iaculis eu in nisl. Donec vestibulum volutpat lectus, vel aliquet massa porttitor in. Integer eleifend',
  },
];

const Testimonial = () => {
  return (
    <>
      <div className="testimonial__area section-padding pb-0">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="testimonial__area-bg">
                <Swiper
                  pagination={{
                    clickable: true,
                  }}
                  autoplay={{
                    delay: 4500,
                  }}
                  loop={true}
                  modules={[Autoplay, Pagination]}
                >
                  {testimonialData?.map((data, id) => (
                    <SwiperSlide key={id}>
                      <div className="testimonial__area-item">
                        <div className="testimonial__area-item-image">
                          <img
                            className="img__full"
                            src={data.image}
                            alt="image"
                          />
                        </div>
                        <div className="testimonial__area-item-content">
                          <h4>{data.name}</h4>
                          <span>{data.position}</span>
                          <p>{data.des}</p>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Testimonial;
