import React, { useEffect, useState } from "react";
import Link from "next/link";

import useSearchData, { areAllNone } from "@/hooks/useFilterData";
import { classes } from "@/utils/constants";
import CustomButton from "@/components/ui/Button";
import RangeSelector from "@/components/ui/RangeSelector";
import ImageGridSkeleton from "@/components/ui/Skeleton";
import PhotoGallery from "@/components/gallery/PhotoGallery";

export default function AlbumViewer() {
  const [photos, setPhotos] = useState<any>({
    allGroups: [],
    test: [],
    train: [],
    valid: [],
  });
  const [tab, setTab] = useState<number>(1);
  const [activePhotoCount, setActivePhotoCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selected, setSelected] = useState<number>(0);
  const [selectedClassFilter, setSelectedClassFilter] = useState<any[]>([]);
  const [selectedMinRange, setSelectedMinRange] = useState<number>(0);
  const [selectedMaxRange, setSelectedMaxRange] = useState<number>(2);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [imagesPerPage, setImagesPerPage] = useState<number>(54);

  const viewAlbum = async (albumName: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/album?albumName=${encodeURIComponent(albumName)}`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch album data: ${response.statusText}`);
      }
      const data = await response.json();
      setPhotos(data);
      const totalCountAll = data?.allGroups?.length;
      if (totalCountAll) setActivePhotoCount(totalCountAll);
    } catch (error) {
      console.error("Error fetching photos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    viewAlbum("bone-fracture-detection");
  }, []);

  const {
    handleSearchData: handleSearchDataAll,
    responseData: responseDataAll,
  } = useSearchData(photos?.allGroups);

  const {
    handleSearchData: handleSearchDataTrain,
    responseData: responseDataTrain,
  } = useSearchData(photos?.train);

  const {
    handleSearchData: handleSearchDataValid,
    responseData: responseDataValid,
  } = useSearchData(photos?.valid);

  const {
    handleSearchData: handleSearchDataTest,
    responseData: responseDataTest,
  } = useSearchData(photos?.test);

  const handleSearchAll = (searchText: string[]) => {
    let searchBy = searchText;
    if (searchText.length > 0) {
      searchBy.push("none");
    }
    if (areAllNone(searchBy)) {
      searchBy = [];
    }

    handleSearchDataAll(photos?.allGroups, searchBy);
    handleSearchDataTrain(photos?.train, searchBy);
    handleSearchDataValid(photos?.valid, searchBy);
    handleSearchDataTest(photos?.test, searchBy);
    searchBy = [];
  };

  const handleRangeSelector = (searchRange: string[]) => {
    handleSearchDataAll(photos?.allGroups, searchRange);
    handleSearchDataTrain(photos?.train, searchRange);
    handleSearchDataValid(photos?.valid, searchRange);
    handleSearchDataTest(photos?.test, searchRange);
  };

  const handleOnTabClick = (tab: number) => {
    setTab(tab);
    setCurrentPage(1);

    if (tab === 1) {
      setActivePhotoCount(photos?.allGroups?.length || 0);
    } else if (tab === 2) {
      setActivePhotoCount(photos?.train?.length || 0);
    } else if (tab === 3) {
      setActivePhotoCount(photos?.valid?.length || 0);
    } else if (tab === 4) {
      setActivePhotoCount(photos?.test?.length || 0);
    }
  };

  const handleSelected = (select: number) => {
    setSelected(select);
    if (select == 1) {
      setSelectedClassFilter(classes);
      handleSearchAll(classes);
    } else {
      setSelectedClassFilter([]);
      handleSearchAll([]);
    }
  };

  const displayImageRange = () => {
    const startIndex = (currentPage - 1) * imagesPerPage + 1;
    const endIndex = Math.min(startIndex + imagesPerPage - 1, activePhotoCount);
    return [
      <span key="endIndex">{endIndex}</span>,
      <span key="of" className="font-[400]">
        {" "}
        of{" "}
      </span>,
      <span key="activePhotoCount">{activePhotoCount}</span>,
    ];
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const selection = [
    {
      tab: 1,
      label: "Select all",
      handleOnSelect: () => handleSelected(1),
    },
    {
      tab: 2,
      label: "Deselect all",
      handleOnSelect: () => handleSelected(2),
    },
  ];

  const menus = [
    {
      tab: 1,
      label: "All groups",
      handleOnclick: () => handleOnTabClick(1),
    },
    {
      tab: 2,
      label: "Train",
      handleOnclick: () => handleOnTabClick(2),
    },
    {
      tab: 3,
      label: "Valid",
      handleOnclick: () => handleOnTabClick(3),
    },
    {
      tab: 4,
      label: "Test",
      handleOnclick: () => handleOnTabClick(4),
    },
  ];

  const classFilterButtons = [
    {
      label: "Elbow positive",
      btnColor: "custom-button-class",
      btnName: "elbow_positive",
      onclick: () => handleSelectClassFilter("elbow_positive"),
    },
    {
      label: "Fingers positive",
      btnColor: "btn-success",
      btnName: "fingers_positive",
      onclick: () => handleSelectClassFilter("fingers_positive"),
    },
    {
      label: "Humerus",
      btnColor: "btn-secondary",
      btnName: "humerus",
      onclick: () => handleSelectClassFilter("humerus"),
    },
    {
      label: "Forearm fracture",
      btnColor: "btn-warning",
      btnName: "forearm_fracture",
      onclick: () => handleSelectClassFilter("forearm_fracture"),
    },
    {
      label: "Humerus fracture",
      btnColor: "btn-danger",
      btnName: "humerus_fracture",
      onclick: () => handleSelectClassFilter("humerus_fracture"),
    },
    {
      label: "Shoulder fracture",
      btnColor: "btn-warning2",
      btnName: "shoulder_fracture",
      onclick: () => handleSelectClassFilter("shoulder_fracture"),
    },
    {
      label: "Wrist positive",
      btnColor: "btn-secondary2",
      btnName: "wrist_positive",
      onclick: () => handleSelectClassFilter("wrist_positive"),
    },
  ];

  const handleSelectClassFilter = (btnName: string) => {
    if (selectedClassFilter.includes(btnName)) {
      let classArray = selectedClassFilter.filter((item) => item !== btnName);
      setSelectedClassFilter(classArray);
      handleSearchAll(classArray);
    } else {
      const classesSel = [...selectedClassFilter, btnName];
      setSelectedClassFilter(classesSel);
      handleSearchAll(classesSel);
    }
  };
  const clearFilters = () => {
    setSelectedClassFilter([]);
    setSelected(0);
    handleSearchAll([]);
    setSelectedMinRange(0);
    setSelectedMaxRange(2);
  };

  const getTabContent = (tab: number) => {
    const contentObj = {
      1: (
        <PhotoGallery
          images={responseDataAll || []}
          itemsPerPage={imagesPerPage}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      ),
      2: (
        <PhotoGallery
          images={responseDataTrain || []}
          itemsPerPage={imagesPerPage}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      ),
      3: (
        <PhotoGallery
          images={responseDataValid || []}
          itemsPerPage={imagesPerPage}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      ),
      4: (
        <PhotoGallery
          images={responseDataTest || []}
          itemsPerPage={imagesPerPage}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      ),
    } as any;

    return contentObj[tab];
  };

  return (
    <div>
      <div className="flex flex-row gap-5">
        <div className="lg:w-[25%]">
          <div className="border-[#D1D1D6] border rounded-lg p-5 lg:h-screen xl:h-screen md:h-screen">
            <img
              src="/assets/svgs/logo.svg"
              width={200}
              height={200}
              alt="Distal Humerus Fracture"
              className="w-[350px]"
            />
            <p className="mt-10 font-semibold text-[15px]">Classes filter</p>
            <p className="mt-10">
              {selection.map((item, index: number) => (
                <Link
                  key={index}
                  href={"#"}
                  onClick={item.handleOnSelect}
                  className={`me-5 ${
                    item.tab === selected ? "text-[#2081D2]" : "text-gray-400"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </p>
            <div className="mt-3 flex-wrap gap-4 flex">
              {classFilterButtons.map((filteredButton, index: number) => (
                <CustomButton
                  key={index}
                  onClick={filteredButton.onclick}
                  buttonColor={`${filteredButton.btnColor} 
                        ${
                          selectedClassFilter.includes(filteredButton.btnName)
                            ? "active"
                            : ""
                        }`}
                  type="button"
                >
                  {filteredButton.label}
                </CustomButton>
              ))}
            </div>
            <div>
              <p className="font-[600] mt-5">Poligon range</p>
              <RangeSelector
                onRangeUpdate={handleRangeSelector}
                minimumValue={selectedMinRange}
                updateMinimumValue={setSelectedMinRange}
                maximumValue={selectedMaxRange}
                updateMaximumValue={setSelectedMaxRange}
              />
              <div className="flex justify-between mt-5 px-5">
                <div
                  className="font-[600] cursor-pointer"
                  onClick={clearFilters}
                >
                  <i className="bi bi-trash" />
                  Clear filters{" "}
                </div>
                <div className="text-gray-400 cursor-pointer">Need help? </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-[75%]">
          <div className="px-5">
            <div className="flex justify-between">
              <div className="text-[32px] font-[600] ">
                Bone-fracture-detection{" "}
              </div>
              <div className="mt-3">
                <span className="font-[700]">
                  {" "}
                  {displayImageRange()}
                  <span className="font-[400]"> images</span>
                </span>
              </div>
            </div>
            <div className="flex border-b border-gray-300 mt-5">
              {menus.map((menu, index: number) => (
                <button
                  key={index}
                  onClick={menu.handleOnclick}
                  className={`${
                    tab == menu.tab
                      ? "font-medium text-[#FFD75C] border-b-2 border-[#FFD75C] bg-[#ffd75c42]"
                      : "text-gray-700 text-[#041D32] hover:text-[#FFD75C] hover:border-b-2 hover:border-[#FFD75C]"
                  } px-6 pt-2 focus:outline-none text-sm`}
                >
                  {menu.label}
                </button>
              ))}
            </div>
            <div className="flex justify-center mt-5">
              {isLoading ? (
                <ImageGridSkeleton count={54} />
              ) : (
                getTabContent(tab)
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// import React, { useState, useEffect } from "react";
// import FilterSidebar from "./FilterSidebar"; // Adjust path as necessary
// // import ImageDisplayArea from "./ImageDisplayArea"; // Adjust path as necessary
// import { useAlbumData } from "../../hooks/useAlbumData";

// const AlbumViewer = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
//   const [selectedRange, setSelectedRange] = useState<{ min: number; max: number }>({ min: 0, max: 100 }); // Example range

//   const {
//     photos,
//     isLoading,
//     error,
//     fetchAlbumData,
//   } = useAlbumData();

//   useEffect(() => {
//     fetchAlbumData("bone-fracture-detection");
//   }, [fetchAlbumData]);

//   const handleFilterChange = (filters: string[]) => {
//     setSelectedFilters(filters);
//     // Potentially refetch or filter data based on new filters
//   };

//   const handleRangeChange = (range: { min: number; max: number }) => {
//     setSelectedRange(range);
//     // Potentially refetch or filter data based on new range
//   };

//   if (error) {
//     return <div>Failed to load data: {error.message}</div>;
//   }

//   return (
//     <div className="flex flex-row">
//       <FilterSidebar
//         selectedFilters={selectedFilters}
//         onFilterChange={handleFilterChange}
//         selectedRange={selectedRange}
//         onRangeChange={handleRangeChange}
//       />
//       {/* <ImageDisplayArea
//         photos={photos} // Consider filtering photos based on selectedFilters and selectedRange
//         isLoading={isLoading}
//         currentPage={currentPage}
//         onPageChange={setCurrentPage}
//       /> */}
//     </div>
//   );
// };

// export default AlbumViewer;
