export const getAxisRanges = (testData: { x: number; y: number }[]): {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
  xInterval: number;
  yInterval: number;
} => {
  let xmin = testData[0].x, xmax = testData[0].x, ymin = testData[0].y, ymax = testData[0].y;

  // find minimum and maximum values for x and y
  for (let i = 0; i < testData.length; i++) {
    const { x, y } = testData[i];
    if (x < xmin) xmin = x;
    if (x > xmax) xmax = x;
    if (y < ymin) ymin = y;
    if (y > ymax) ymax = y;
  }

  // calculate suggested interval for labeling the x-axis
  const xRange = xmax - xmin;
  let xInterval = Math.pow(10, Math.floor(Math.log10(xRange)));
  const xSteps = [1, 2, 5];
  for (let i = 0; i < xSteps.length; i++) {
    if ((xRange / (xInterval * xSteps[i])) <= 8) {
      xInterval *= xSteps[i];
      break;
    }
  }

  // calculate suggested interval for labeling the y-axis
  const yRange = ymax - ymin;
  let yInterval = Math.pow(10, Math.floor(Math.log10(yRange)));
  const ySteps = [1, 2, 5];
  for (let i = 0; i < ySteps.length; i++) {
    if (yRange / (yInterval * ySteps[i]) <= 8) {
      yInterval *= ySteps[i];
      break;
    }
  }

  return {
    xMin: xmin - xInterval,
    xMax: xmax + xInterval,
    yMin: ymin - yInterval,
    yMax: ymax + yInterval,
    xInterval: xInterval,
    yInterval: yInterval
  };
}