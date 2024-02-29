import React, { useState } from "react";

import PopupContainer from "@/components/PopupContainer";
import ShapeOverlay from "@/components/ShapeOverlay";
import ImagePaginator, { fetchPageData } from "@/components/ImagePaginator";

export default function PhotoGallery({
  images,
  itemsPerPage,
  onPageChange,
  currentPage,
}: {
  images: any[];
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (newPage: number) => void;
}) {
  const [isViewerOpen, setViewerOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<any>({});

  const limitedImages = images.slice(0, 200);

  const totalImages = limitedImages.length;
  const totalPageCount = Math.ceil(totalImages / itemsPerPage);

  const visibleImages = fetchPageData(images, currentPage, itemsPerPage);

  const showImageDetails = (image: any) => {
    setSelectedImage(image);
    setViewerOpen(true);
  };

  return (
    <div>
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 gap-y-2">
        {visibleImages.map((image: any, index: number) => (
          <div
            key={index}
            className="mb-1"
            onClick={() => showImageDetails(image)}
          >
            <div style={{ position: "relative", width: "100%" }}>
              <img
                className="w-full h-24 cursor-pointer"
                src={image.thumbnail}
                alt={image.name}
              />
              <ShapeOverlay image={image} />
            </div>
            <div className="truncate" title={image.name}>
              {image.name}
            </div>
          </div>
        ))}
      </div>
      <ImagePaginator
        currentPage={currentPage}
        totalPages={totalPageCount}
        onPageChange={onPageChange}
      />
      {isViewerOpen && (
        <PopupContainer
          containerWidth={"md:w-[500px] sm:!mt-40"}
          header={selectedImage.name}
          isVisible={isViewerOpen}
          content={
            <div>
              <p className="mb-3">Image Details:</p>
              <button className="rounded-full px-5 mb-4 bg-yellow-400">
                Detail Button
              </button>
              <div style={{ position: "relative", width: "100%" }}>
                <img
                  className="w-full h-full rounded-lg bg-white shadow-inner object-cover cursor-pointer"
                  src={selectedImage.image}
                  alt={selectedImage.name}
                />
                <ShapeOverlay image={selectedImage} />
              </div>
            </div>
          }
          toggleVisibility={() => setViewerOpen(false)}
        />
      )}
    </div>
  );
}
