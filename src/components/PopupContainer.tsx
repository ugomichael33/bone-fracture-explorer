import React, { ReactNode } from "react";

interface IPopupContainerProps {
  isVisible: boolean;
  toggleVisibility: (isVisible: boolean) => void;
  header: ReactNode;
  content: ReactNode;
  containerWidth: string;
}

const PopupContainer = ({
  isVisible,
  toggleVisibility,
  header,
  content,
  containerWidth,
}: IPopupContainerProps) => {
  return (
    <>
      {isVisible && (
        <>
          <div className="justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-[999] outline-none focus:outline-none">
            <div
              className={`relative w-auto my-6 mx-auto max-w-3xl ${containerWidth}`}
            >
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <button
                  className="right-0 absolute p-2 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => toggleVisibility(false)}
                >
                  <span className="text-2xl block outline-none focus:outline-none">
                    <i className="bi bi-x text-gray-300" />
                  </span>
                </button>
                <div className="mt-5 px-6">{header}</div>
                <div className="p-6 flex-auto">{content}</div>
              </div>
            </div>
          </div>
          <div className="opacity-50 fixed inset-0 z-40 bg-[#697ba2]"></div>
        </>
      )}
    </>
  );
};

export default PopupContainer;
