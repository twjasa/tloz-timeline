import { ERA_HEIGHT, ERA_WIDTH } from "../constants/variables";

export const centerWindow = async (panzoomRef: any) => {
  const panzoomWindow = document.querySelector("main");
  const children = panzoomWindow?.children || [];
  let extraTop = 0;
  let extraBottom = 0;
  let extraLeft = 0;
  let extraRight = 0;
  const mainHeight = panzoomWindow?.getBoundingClientRect().height || 0;
  const mainWidth = panzoomWindow?.getBoundingClientRect().width || 0;
  for (const child of children as any) {
    debugger;
    const { offsetTop: top = 0, offsetLeft: left = 0 } = child;
    if (left < 0) {
      extraLeft = Math.min(extraLeft, left);
    } else {
      // if (top + ERA_WIDTH > mainWidth) {
      //   extraRight = Math.max(extraRight, Math.abs(mainWidth - left));
      // }
    }
    if (top < 0) {
      extraTop = Math.min(extraTop, top);
    }
    if (top > 0) {
      if (top + ERA_HEIGHT > mainHeight) {
        extraBottom = Math.max(extraBottom, Math.abs(mainHeight - top));
      }
    }
  }
  extraTop = Math.abs(extraTop);
  if (extraBottom > 0) {
    extraBottom += ERA_HEIGHT;
  }
  extraRight += ERA_WIDTH;
  extraLeft = Math.abs(extraLeft);
  const mainHeightIncreased = (mainHeight + extraBottom + extraTop);
  const newZoom = mainHeight / mainHeightIncreased;
  const newX = mainWidth / 2;

  let newY = mainHeight / 2;
  console.log(extraTop, extraBottom, mainHeight, mainHeightIncreased);
  if (extraTop > extraBottom) {
    newY = mainHeight - extraTop / 2;
  }
  panzoomRef.current.smoothZoom(
    newX,
    mainHeight,
    newZoom,
    5
  );
}; 