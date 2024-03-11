import { useEffect, useState } from "react";

import { classAttr } from "@/utils/constants";

export default function ShapeOverlay({ image }: { image: any }) {
  const [classId, setClassId] = useState<string>("");
  const [polygonCoords, setPolygonCoords] = useState<string>("");

  useEffect(() => {
    const fetchLabel = async () => {
      try {
        setClassId(`${image?.classId}`);

        const viewBoxWidth = 1;
        const viewBoxHeight = 1;

        // Mapping coordinates to fit within the SVG viewBox
        const absoluteCoordinates = image?.coordinates?.map(
          (coord: { x: number; y: number }) => ({
            x: coord.x * viewBoxWidth,
            y: coord.y * viewBoxHeight,
          })
        );

        // Formatting coordinates for the SVG polygon points attribute
        const polygonCoords = absoluteCoordinates
          ?.map((coord: { x: any; y: any }) => `${coord.x} ${coord.y}`)
          .join(" ");
        setPolygonCoords(polygonCoords);
      } catch (error: any) {
        console.error(error.message);
      }
    };

    fetchLabel();
  }, [image]);

  const fillColor = classAttr[parseInt(classId, 10)]?.color || "none";

  return (
    <svg
      width="100%"
      height="100%"
      viewBox={"0 0 1 1"}
      style={{ position: "absolute", top: 0, left: 0 }}
    >
      <polygon points={polygonCoords} fill={fillColor} strokeOpacity={2} />
    </svg>
  );
}
