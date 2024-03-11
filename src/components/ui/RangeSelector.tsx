import { calculateRangeArray } from "@/utils/tools";

interface IRangeSelector {
  onRangeUpdate: (newRange: string[]) => void;
  minimumValue: number;
  updateMinimumValue: (value: number) => void;
  maximumValue: number;
  updateMaximumValue: (value: number) => void;
}

export default function RangeSelector({
  onRangeUpdate,
  minimumValue,
  maximumValue,
  updateMinimumValue,
  updateMaximumValue,
}: IRangeSelector) {
  const extendedMaxValue = parseInt(`${maximumValue}`) + 2;

  const handleLowerBoundChange = (lowerValue: number) => {
    updateMinimumValue(lowerValue);
    const selectedRange = calculateRangeArray(lowerValue, extendedMaxValue);
    onRangeUpdate(selectedRange);
  };

  const handleUpperBoundChange = (upperValue: number) => {
    updateMaximumValue(upperValue);
    const upperValueAdjusted = parseInt(`${upperValue}`) + 2;
    const selectedRange = calculateRangeArray(minimumValue, upperValueAdjusted);
    onRangeUpdate(selectedRange);
  };

  return (
    <div className="grid w-full">
      <div className="flex justify-between mb-5 mt-3 px-3">
        <div>
          min <span className="font-semibold">{minimumValue}</span>{" "}
        </div>
        <div>
          max <span className="font-semibold">{extendedMaxValue}</span>
        </div>
      </div>
      <div className="flex-1 relative ">
        <div className=" grid grid-cols-2 gap-1">
          <div className="">
            <div className="flex  gap-2 ">
              <div
                className={`w-1/2 h-1 ${
                  minimumValue > 0 ? `border border-[#FFD75C]` : "bg-[#FFD75C]"
                } left-0 right-0 top-1/2 transform -translate-y-1/2 rounded-xl`}
              />
              <div className="w-1/2 h-1 bg-[#FFD75C] left-0 right-0 top-1/2 transform -translate-y-1/2 rounded-xl" />
            </div>
            <input
              type="range"
              min="0"
              max="2"
              value={minimumValue}
              className={`absolute w-[50%]s h-full opacity-0s cursor-pointer bg-transparent -mt-3 `}
              onChange={(e: any) =>
                handleLowerBoundChange(Number(e.target.value))
              }
            />
          </div>
          <div>
            <div className="flex  gap-2 ">
              <div className="w-1/2 h-1 bg-[#FFD75C] left-0 right-0 top-1/2 transform -translate-y-1/2 rounded-xl" />
              <div
                className={`w-1/2 h-1 ${
                  maximumValue < 2 ? `border border-[#FFD75C]` : "bg-[#FFD75C]"
                } left-0 right-0 top-1/2 transform -translate-y-1/2 rounded-xl`}
              />
            </div>
            <input
              type="range"
              min="0"
              max="2"
              value={maximumValue}
              className={`absolute w-[50%]s h-full opacity-0s cursor-pointer bg-transparent -mt-3`}
              onChange={(e: any) =>
                handleUpperBoundChange(Number(e.target.value))
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
