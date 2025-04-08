import { useControls } from "react-zoom-pan-pinch";
import { Plus, Minus, Expand, Minimize } from "lucide-react";

interface FitControlsProps {
  isFit: boolean;
  setIsFit: (value: boolean) => void;
}

// controls for zooming and panning
const Controls: React.FC<{
  fit: FitControlsProps;
  zoomLevel: number;
  calculateOffset: () => {
    offsetX: number;
    offsetY: number;
    scale: number;
  };
}> = ({ fit, zoomLevel, calculateOffset }) => {
  const { isFit, setIsFit } = fit;
  const { zoomIn, zoomOut, setTransform, resetTransform } = useControls();

  const buttonClass =
    "focus:ring-primary focus:ring-1 focus:ring-offset-1 focus:outline-none cursor-pointer p-2";

  const buttonSize = 16;

  return (
    <>
      {/* zoom button - bottom right */}
      <div
        className="bg-card absolute right-0 bottom-1 z-10 flex w-12 flex-col items-center gap-1 rounded-4xl border py-2 dark:text-white"
        role="toolbar"
        aria-label="Zoom controls"
      >
        {/* percentage display */}
        <span
          aria-label="Current Zoom Level"
          title="Current Zoom Level"
          className="m-1 text-xs"
        >
          {zoomLevel}%
        </span>
        {/* Zoom in */}
        <button
          onClick={() => (zoomIn(0.3), setIsFit(false))}
          aria-label="Zoom in"
          title="Zoom in"
          className={`border-t border-b ${buttonClass}`}
        >
          <span aria-hidden="true">
            <Plus size={buttonSize} />
          </span>
        </button>

        {/* Zoom Out */}
        <button
          onClick={() => (zoomOut(), setIsFit(false))}
          aria-label="Zoom out"
          title="Zoom out"
          className={buttonClass}
        >
          <span aria-hidden="true">
            <Minus size={buttonSize} />
          </span>
        </button>
      </div>

      {/* Fit - Reset button */}
      <div
        className="bg-card absolute top-1 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3 rounded-4xl border px-4 text-xs text-black dark:text-white"
        role="toolbar"
        aria-label="Zoom and pan controls"
      >
        {/* Zoom to 75% */}
        <button
          onClick={() => (setTransform(0, 0, 0.75), setIsFit(false))}
          aria-label="Zoom out"
          title="Zoom out"
          className={`border-r ${buttonClass}`}
        >
          <span aria-hidden="true">75%</span>
        </button>

        {/* Zoom to 100% */}
        <button
          onClick={() => (resetTransform(), setIsFit(false))}
          aria-label="Zoom out"
          title="Zoom out"
          className={`border-r ${buttonClass}`}
        >
          <span aria-hidden="true">100%</span>
        </button>

        {/* Fit to screen */}
        <div className="flex items-center">
          <button
            onClick={() => {
              if (isFit) {
                // zooms to 100%
                setTransform(0, 0, 1);
                setIsFit(false);
              } else {
                // fits to the screen
                const { offsetX, offsetY, scale } = calculateOffset();
                setTransform(offsetX, offsetY, scale);
                setIsFit(true);
              }
            }}
            aria-label="Fit Screen"
            title="Fit Screen"
            className={buttonClass}
          >
            {isFit ? (
              <Expand size={buttonSize} />
            ) : (
              <Minimize size={buttonSize} />
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default Controls;
