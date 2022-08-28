import React, { Fragment, useState } from "react";
import { Button } from "antd";

const Scanner = () => {
  const [imagesScanned, setImagesScanned] = useState([]);

  const displayImagesOnPage = (successful, mesg, response) => {
    if (!successful) {
      // On error
      return;
    }

    if (
      successful &&
      mesg != null &&
      mesg.toLowerCase().indexOf("user cancel") >= 0
    ) {
      // User canceled.
      return;
    }

    var scannedImages = window.scanner.getScannedImages(response, true, false);
    setImagesScanned(scannedImages);
  };

  const scanToJpg = () => {
    window.scanner.scan(displayImagesOnPage, {
      output_settings: [
        {
          type: "return-base64",
          format: "jpg",
        },
      ],
    });
  };

  return (
    <Fragment>
      <Button onClick={scanToJpg} className="btn">
        رفع شهادة التطعيم
      </Button>
      {console.log(imagesScanned)}
      {imagesScanned.map((image, index) => (
        <img src={image.src} alt={image.mimeType} />
      ))}
    </Fragment>
  );
};

export default Scanner;
