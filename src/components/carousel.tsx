//carousels/Responsive.js
import type { Event } from "@prisma/client";
import type { Dispatch, SetStateAction } from "react";
import { Image } from "react-bootstrap";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from "../styles/Responsive.module.css";


interface props {
  events: Event[];
  setCarouselIdx: Dispatch<SetStateAction<number>>
}

export default function ResponsiveCarousel({events, setCarouselIdx}: props) {
 return <div className="flex flex-col h-5/6 justify-center items-center overflow-hidden text-transparent">
    <Carousel
      showArrows={false}
      infiniteLoop={false}
      dynamicHeight={false}
      showThumbs={false}
      onChange = {(e) => {
          setCarouselIdx(e)
        }}
      className="w-full mb-3 text-transparent"
    >
      {events.map((event) => (
        <div key={event.id} className={styles.swipItem}>
          <div className={styles.imgBox}>
            <Image src="/ballooons.png" width={50} height={50} alt=""/>
            <div className="text-primary" style={{ fontSize: '18px'}}>
              {`이벤트 이름: ${event.eventName}`}
            </div>
            <div className="text-primary" style={{ fontSize: '18px'}}>
              {`총 모금액: ${event.totalDonated}원`}
            </div>
            <div className="mb-10 text-primary" style={{ fontSize: '18px'}}>
              {`${event.eventDate.getFullYear()}-${(event.eventDate.getMonth()+1).toString().padStart(2, "0")}-${event.eventDate.getDate()}`}
            </div>
          </div>
        </div>
      ))}
    </Carousel>
    </div>
  ;
}
