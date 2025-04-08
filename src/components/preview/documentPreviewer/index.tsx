"use client";

import {
  TransformWrapper,
  TransformComponent,
  ReactZoomPanPinchRef,
} from "react-zoom-pan-pinch";

import { Stage, Layer, Image as KonvaImage, Rect } from "react-konva";
import useImage from "use-image";
import sampleImage from "@/data/image/invoice.jpg";
import Loader from "@/components/loader";
import { useCallback, useEffect, useRef, useState } from "react";
import Controls from "./controls";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { formatRTKQueryError } from "@/lib/formatRtkError";
import useDebounce from "@/hooks/useDebounceFunction";
import { useAppSelector } from "@/store/hooks";
import setColor from "@/lib/colorUtils";
import { useHoveredSection } from "@/hooks/useSection";

/**
 * =============================================================
 * Main Document Previewer component
 * @description This component is used to preview the document
 * @returns {JSX.Element}
 * =============================================================
 */
const DocumentPreviewer: React.FC<{
  isLoading: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
}> = (props) => {
  const { isLoading, error } = props;

  // accessing store states
  const fields = useAppSelector((state) => state.sectionsLists.sections);
  const selectedFields = useAppSelector(
    (state) => state.sectionSelected.selectedIds,
  );

  const { updateHoveredID, hoveredID } = useHoveredSection();

  /**
   * handle local states
   */
  const [isZoomReady, setIsZoomReady] = useState(false);
  const [isFit, setIsFit] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(0);

  const [image] = useImage(sampleImage.src);
  const containerRef = useRef<HTMLDivElement>(null);
  const zoomApiRef = useRef<ReactZoomPanPinchRef | null>(null);

  /**
   * handle zoom api init
   * @param api
   */
  const handleInit = (api: ReactZoomPanPinchRef) => {
    zoomApiRef.current = api;
    setIsZoomReady(true);
  };

  /**
   * Calculate offset position and scale of the image
   */
  const calculateOffset = useCallback(() => {
    let offsetX = 0,
      offsetY = 0,
      scale = 0;

    if (!zoomApiRef.current || !image || !isZoomReady || !containerRef.current)
      return { offsetX, offsetY, scale };

    const container = containerRef.current;

    // get minimum image ratio
    scale = Math.min(
      container.clientWidth / image.naturalWidth,
      container.clientHeight / image.naturalHeight,
    );

    // calculate offset position
    offsetX = (container.clientWidth - image.width * scale) / 2;
    offsetY = (container.clientHeight - image.height * scale) / 2;

    return { offsetX, offsetY, scale };
  }, [image, isZoomReady]);

  /**
   *  useEffect to calculate position after the previwer is ready
   */
  useEffect(() => {
    const { offsetX, offsetY, scale } = calculateOffset();

    // need setTimeout to trigger the transform
    setTimeout(() => {
      if (zoomApiRef.current) {
        zoomApiRef.current.setTransform(offsetX, offsetY, scale);
        setIsFit(true);
      }
    }, 1);
  }, [isZoomReady, calculateOffset]);

  /**
   * handle zoom percentage
   */
  const handleTransformed = useDebounce(
    ((state: { scale: number; positionX: number; positionY: number }) => {
      const percentage = Math.round(state.scale * 100);
      setZoomLevel(percentage);
    }) as (...args: unknown[]) => void,
    300,
  );

  return (
    <div className="bg-muted-foreground text-card-foreground w-[420px] shrink-0 grow gap-6 overflow-hidden rounded-xl border p-4 shadow-sm">
      <div ref={containerRef} className="relative h-full overflow-hidden">
        {isLoading ? (
          <Loader />
        ) : error ? (
          <p>Error: {formatRTKQueryError(error)}</p>
        ) : (
          <TransformWrapper
            onInit={handleInit}
            minScale={0.2}
            maxScale={1.6}
            wheel={{ disabled: true }}
            onTransformed={(ref, state) => {
              handleTransformed(state);
            }}
          >
            <>
              {/* zoom controls */}
              <Controls
                fit={{ isFit, setIsFit }}
                zoomLevel={zoomLevel}
                calculateOffset={calculateOffset}
              />

              {/* document previewer */}
              <TransformComponent wrapperClass="!w-full !h-full">
                <Stage id="canvas" width={image?.width} height={image?.height}>
                  <Layer>
                    {/* render image/document */}
                    {image && <KonvaImage image={image} />}
                    {/* render bounding boxes */}
                    {fields.map((field, index) => (
                      <Rect
                        key={field.id}
                        x={field?.content?.position[0]}
                        y={field?.content?.position[1]}
                        width={field?.content?.position[2]}
                        height={field?.content?.position[3]}
                        onMouseEnter={() => updateHoveredID(field.id)}
                        onMouseLeave={() => updateHoveredID(0)}
                        fill={`rgb(${setColor(index)})`}
                        opacity={
                          hoveredID === field.id ||
                          selectedFields.includes(field.id)
                            ? 0.5
                            : 0
                        }
                        className="cursor-pointer"
                        cursor="pointer"
                      />
                    ))}
                  </Layer>
                </Stage>
              </TransformComponent>
            </>
          </TransformWrapper>
        )}
      </div>
    </div>
  );
};

export default DocumentPreviewer;
