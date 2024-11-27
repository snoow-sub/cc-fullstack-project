import React, { useRef } from "react";
import "../css/multiStepUserInput.css";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { YoutubePlayer } from "./YoutubePlayer";

// https://github.com/meliorence/react-native-snap-carousel
export function ImageGallery({ imgPathList }) {
  //   const ImageSwipePage = (data) => (
  //     <AliceCarousel buttonsDisabled={true}>
  //       <img src="./images/logo.png" alt="image1" />
  //       <img src="./images/logo.png" alt="image2" />
  //     </AliceCarousel>
  //   );

  const carouselRef = useRef(null);

  const items = imgPathList.map((imgPath, index) => {
    return (
      <img src={imgPath} alt={`image${index + 1}`} style={{ width: "100%" }} />
    );
  });

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <AliceCarousel
        items={items}
        autoPlay={false}
        infinite={true}
        swipeDisabled={true}
        autoPlayInterval={2000}
        animationDuration={800}
        disableButtonsControls={false}
        disableDotsControls={true}
      />
    </div>
  );
}
