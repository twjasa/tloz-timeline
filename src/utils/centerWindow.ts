type EasingName = keyof typeof easings;

const easings = {
  linear: (t: number) => t,
  easeInQuad: (t: number) => t * t,
  easeOutQuad: (t: number) => t * (2 - t),
  easeInOutQuad: (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  easeOutCubic: (t: number) => (--t) * t * t + 1,
  easeInOutCubic: (t: number) =>
    t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
};


export const centerWindow = (
  panzoomRef: any,
  duration: number = 500,
  easingName: EasingName = "easeInOutQuad"
) => {
  const panzoomWindow = document.querySelector("main");
  if (!panzoomWindow || !panzoomRef.current) return;

  const children = Array.from(panzoomWindow.children) as HTMLElement[];
  if (children.length === 0) return;

  let minLeft = Infinity, minTop = Infinity, maxRight = -Infinity, maxBottom = -Infinity;
  for (const child of children) {
    const rect = child.getBoundingClientRect();
    const parentRect = panzoomWindow.getBoundingClientRect();

    const left = rect.left - parentRect.left + panzoomWindow.scrollLeft;
    const top = rect.top - parentRect.top + panzoomWindow.scrollTop;
    const right = left + rect.width;
    const bottom = top + rect.height;

    minLeft = Math.min(minLeft, left);
    minTop = Math.min(minTop, top);
    maxRight = Math.max(maxRight, right);
    maxBottom = Math.max(maxBottom, bottom);
  }

  const contentWidth = maxRight - minLeft;
  const contentHeight = maxBottom - minTop;
  const containerWidth = panzoomWindow.clientWidth;
  const containerHeight = panzoomWindow.clientHeight;

  const targetScale = Math.min(containerWidth / contentWidth, containerHeight / contentHeight);

  const contentCenterX = minLeft + contentWidth / 2;
  const contentCenterY = minTop + contentHeight / 2;

  const viewportCenterX = containerWidth / 2;
  const viewportCenterY = containerHeight / 2;

  const targetX = viewportCenterX - contentCenterX * targetScale;
  const targetY = viewportCenterY - contentCenterY * targetScale;

  const panzoom = panzoomRef.current;
  const transform = panzoom.getTransform();

  const startScale = transform.scale;
  const startX = transform.x;
  const startY = transform.y;

  const easingFn = easings[easingName] || easings.linear;

  const startTime = performance.now();

  function animate(currentTime: number) {
    const elapsed = currentTime - startTime;
    const t = Math.min(elapsed / duration, 1);
    const easedT = easingFn(t);

    const currentScale = startScale + (targetScale - startScale) * easedT;
    const currentX = startX + (targetX - startX) * easedT;
    const currentY = startY + (targetY - startY) * easedT;

    panzoom.zoomAbs(0, 0, currentScale);
    panzoom.moveTo(currentX, currentY);

    if (t < 1) {
      requestAnimationFrame(animate);
    }
  }

  requestAnimationFrame(animate);
};
