"use client";
import {
  TransformWrapper,
  TransformComponent,
  useControls,
} from "react-zoom-pan-pinch";

import { Stage, Layer, Image as KonvaImage } from "react-konva";
import useImage from "use-image";
import sampleImage from "@/data/image/invoice.jpg";
import Loader from "@/components/loader";
import { useRef } from "react";

// controls for zooming and panning
const Controls = () => {
  const { zoomIn, zoomOut, resetTransform } = useControls();

  return (
    <div className="absolute top-0 left-0 z-10 flex gap-3 text-black">
      <button onClick={() => zoomIn()}>+</button>
      <button onClick={() => zoomOut()}>-</button>
      <button onClick={() => resetTransform()}>x</button>
    </div>
  );
};

/**
 * =============================================================
 * Main Document Previewer component
 * @description This component is used to preview the document
 * @returns {JSX.Element}
 * =============================================================
 */
const DocumentPreviewer: React.FC = () => {
  const [image, status] = useImage(sampleImage.src);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="bg-card text-card-foreground w-[420px] shrink-0 grow gap-6 overflow-hidden rounded-xl border p-4 shadow-sm">
      <div ref={containerRef} className="relative h-full overflow-hidden">
        {status === "loading" ? (
          <Loader />
        ) : status === "failed" ? (
          <p>Image failed to load.</p>
        ) : (
          <TransformWrapper
            initialScale={1}
            minScale={0.1}
            maxScale={1.6}
            wheel={{ disabled: true }}
          >
            <>
              <Controls />
              <TransformComponent wrapperClass="!w-full !h-full">
                <Stage width={image?.width} height={image?.height}>
                  <Layer>{image && <KonvaImage image={image} />}</Layer>
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
