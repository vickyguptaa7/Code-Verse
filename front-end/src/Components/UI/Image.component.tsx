import React, { useEffect, useState } from "react";
import { mergeClass } from "../../library/tailwindMerge/tailwindMerge.lib";

interface IPROPS extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback: React.ReactNode;
}

const Image: React.FC<IPROPS> = ({
  fallback,
  className,
  src,
  alt,
  ...props
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  useEffect(() => {
    if (!src) setIsImageLoaded(false);
    else setIsImageLoaded(true);
  }, [src]);
  return (
    <>
      {!isImageLoaded ? fallback : null}
      <img
        onLoad={() => {
          setIsImageLoaded(true);
        }}
        src={src}
        className={mergeClass([className, !isImageLoaded ? "hidden" : ""])}
        {...props}
        alt={""}
      />
    </>
  );
};

export default Image;
