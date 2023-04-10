import { AxisRanges, AxisRangesArguments } from "../types/types";

// This function takes in a range of values and calculates a suitable interval to
// divide that range into smaller segments for display purposes.
const getInterval = (min: number, max: number): number => {
  const range = max - min;
  // This formula calculates an interval that is a power of 10,
  //  such as 1, 10, 100, etc., based on the magnitude of the range.
  let interval = Math.pow(10, Math.floor(Math.log10(range)));
  // The array [1, 2, 5] represents a common set
  // of "step" values used to create commonly-used and visually appealing intervals on a graph or chart.
  const steps = [1, 2, 5];
  for (let i = 0; i < steps.length; i++) {
    if ((range / (interval * steps[i])) <= 8) {
      interval *= steps[i];
      break;
    }
  }
  return interval;
}

export const getAxisRanges = (testData: AxisRangesArguments): AxisRanges => {
  let xmin = testData[0].x, xmax = testData[0].x, ymin = testData[0].y, ymax = testData[0].y;

  // find minimum and maximum values for x and y
  for (let i = 0; i < testData.length; i++) {
    const { x, y } = testData[i];
    if (x < xmin) xmin = x;
    if (x > xmax) xmax = x;
    if (y < ymin) ymin = y;
    if (y > ymax) ymax = y;
  }

  // calculate a suitable interval for a range of values between min and max.
  const xInterval = getInterval(xmin, xmax);
  const yInterval = getInterval(ymin, ymax);

  return {
    xMin: xmin - xInterval,
    xMax: xmax + xInterval,
    yMin: ymin - yInterval,
    yMax: ymax + yInterval,
    xInterval: xInterval,
    yInterval: yInterval
  };
}