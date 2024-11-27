import React, { useState } from "react";
import "../css/multiStepUserInput.css";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

// https://github.com/meliorence/react-native-snap-carousel
export function ImageGallery({ imgPathList }) {
  const data = ["./images/logo.png", "./images/logo.png"];

  //   const ImageSwipePage = (data) => (
  //     <AliceCarousel buttonsDisabled={true}>
  //       <img src="./images/logo.png" alt="image1" />
  //       <img src="./images/logo.png" alt="image2" />
  //     </AliceCarousel>
  //   );
  const items = data.map((imgPath, index) => {
    return (
      <img src={imgPath} alt={`image${index + 1}`} style={{ width: "25%" }} />
    );
  });

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <AliceCarousel
        items={items}
        autoPlay
        infinite
        autoPlayInterval={2000}
        animationDuration={800}
        disableButtonsControls
        disableDotsControls
      />
    </div>
  );
}
