import React, { useState } from "react";
import { mergeClass } from "../../library/tailwindMerge/tailwindMerge.lib";

interface IPROPS extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback: React.ReactNode;
}

const Image: React.FC<IPROPS> = ({ fallback, className, alt, ...props }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  return (
    <>
      {!isImageLoaded ? fallback : null}
      <img
        onLoad={() => {
          setIsImageLoaded(true);
        }}
        className={mergeClass([className, !isImageLoaded ? "hidden" : ""])}
        {...props}
        alt={alt}
      />
    </>
  );
};

export default Image;
