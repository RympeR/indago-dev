import "./LoadingOverlay.scss";

import { useEffect, useState } from "react";

import { AnimationTools } from "../tools/AnimationTools";

export interface ILoadingOverlay {
  active: boolean;
  isGlobal?: boolean;
  loadingMessage?: string;
}

export function LoadingOverlay(props: ILoadingOverlay) {
  const [isDetached, setIsDetached] = useState<boolean>(!props.active);
  const [isHidden, setIsHidden] = useState<boolean>(!props.active);

  const [lastAnimationTimeout, setLastAnimationTimeout] =
    useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (lastAnimationTimeout) {
      clearTimeout(lastAnimationTimeout);
    }

    let timeout = AnimationTools.autoShowHideTransition(
      props.active,
      setIsDetached,
      setIsHidden
    );

    setLastAnimationTimeout(timeout);
  }, [props.active]);

  return (
    (!isDetached && (
      <div
        className={
          "loading-wrapper" +
          (isHidden ? " hidden" : "") +
          (props.isGlobal ? " global" : "")
        }
      >
        <div className="loading">
          <svg viewBox="0 0 50 50" className="spinner">
            <circle className="ring" cx="25" cy="25" r="22.5" />
            <circle className="line" cx="25" cy="25" r="22.5" />
          </svg>
        </div>
      </div>
    )) ||
    null
  );
}
