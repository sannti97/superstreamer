import cn from "clsx";
import { InterstitialProgress } from "./InterstitialProgress";
import { Progress } from "./Progress";
import { TimeStat } from "./TimeStat";
import { useSelector } from "../..";
import { useAppStore } from "../hooks/useAppStore";

export function Seekbar() {
  const interstitial = useSelector((facade) => facade.interstitial);
  const settings = useAppStore((state) => state.settings);

  return (
    <div
      className={cn(
        "relative mb-2 transition-opacity",
        !!settings && "opacity-0 pointer-events-none",
      )}
    >
      {interstitial ? (
        <div className="absolute left-0 right-0 bottom-0 px-4">
          <InterstitialProgress interstitial={interstitial} />
        </div>
      ) : (
        <div className="absolute left-0 right-0 bottom-0 flex items-center px-4">
          <Progress />
          <TimeStat />
        </div>
      )}
    </div>
  );
}
