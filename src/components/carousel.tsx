//carousels/Responsive.js
import { Image } from "react-bootstrap";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from "../styles/Responsive.module.css";

//public/Items.json
const items = {
    "items": {
      "responsive": [
        {
          "id": 1,
          "title": "Birthday",
        },
        {
          "id": 2,
          "title": "Birthday",
        },
        {
          "id": 3,
          "title": "Birthday",
        }
      ]
    }
  }


export default function ResponsiveCarousel() {
  const { responsive } = items.items;
  return (
    <div className="flex flex-col h-5/6 justify-center items-center overflow-hidden text-transparent">
      <Carousel
        showArrows={false}
        infiniteLoop={false}
        dynamicHeight={false}
        className="w-full mb-3 text-transparent"
      >
        {responsive.map((item) => (
          <div key={item.id} className={styles.swipItem}>
            <div className={styles.imgBox}>
              <Image src="/ballooons.png" width={50} height={50} alt=""/>
              <div className="mb-10 text-primary" style={{fontFamily: 'NanumSquareRoundEB', fontSize: '18px'}}>
                {item.title}
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
