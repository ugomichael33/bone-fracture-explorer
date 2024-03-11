import React, { Fragment, memo } from "react";

const ImageGridSkeleton = memo(({ count }: { count: number }) => {
  return (
    <Fragment>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 gap-y-2 animate-pulse">
        {Array.from({ length: count }, (_, index) => (
          <div className="mb-3" key={index}>
            <div className="w-24 h-24 rounded-lg bg-gray-300 shadow-inner object-cover animate-pulse" />
            <div className="h-2 bg-gray-300 rounded mt-2 w-full"></div>
          </div>
        ))}
      </div>
    </Fragment>
  );
});

ImageGridSkeleton.displayName = "ImageSkeleton";
export default ImageGridSkeleton;
