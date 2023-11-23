import { useEffect, useState, useRef } from 'react';
import { getAxisRanges } from './utils';
import { GraphPoint, GraphDetailsHookProps } from '../types/types';

const useScatterPlot = (data: Array<GraphPoint>, graphHeight: number): GraphDetailsHookProps => {
  // states
  const [pos, setPos] = useState({ x: 0, y: 0, yPlot: 0, xPlot: 0 });
  const [showVerticalLine, setShowVerticalLine] = useState(false);
  const [graphWidth, setGraphWidth] = useState(0);

  // refs
  const parentNode = useRef<HTMLDivElement | null>(null);
  const yPointsRef = useRef<HTMLDivElement | null>(null);

  const axisValues = getAxisRanges(data);

  const gutterSpacing = 30;

  const getGraphParentWidth = (elem: React.MutableRefObject<HTMLDivElement | null>): number =>
    (elem?.current?.clientWidth || 0) - gutterSpacing;

  useEffect(() => {
    setGraphWidth(getGraphParentWidth(parentNode));
  }, []);

  useEffect(() => {
    window.onresize = (): void => setGraphWidth(getGraphParentWidth(parentNode));
  }, [parentNode]);

  // consts
  const textHeight = 16;

  const graphHeightDiff = axisValues.yMax - axisValues.yMin;
  const graphWidthDiff = axisValues.xMax - axisValues.xMin;

  const yPoints = Array.from(
    { length: graphHeightDiff / axisValues.yInterval + 1 },
    (_, index) => Math.round(index * axisValues.yInterval * 1000) / 1000 + axisValues.yMin
  );
  const xPoints = Array.from(
    { length: graphWidthDiff / axisValues.xInterval + 1 },
    (_, index) => Math.round(index * axisValues.xInterval * 1000) / 1000 + axisValues.xMin
  );

  const yRangeDiff = yPoints[yPoints.length - 1] - yPoints[0];
  const xRangeDiff = xPoints[xPoints.length - 1] - xPoints[0];

  const yRatio = graphHeight / yRangeDiff;
  const xRatio = graphWidth / xRangeDiff;

  const getGraphCoordinate = (point: number, ratio: number): number => point * ratio;

  const formattedGraphPoints = data.map((point: GraphPoint) => ({
    ...point,
    yPlot: graphHeight - getGraphCoordinate(point.y, yRatio) + getGraphCoordinate(axisValues.yMin, yRatio),
    xPlot: getGraphCoordinate(point.x, xRatio) - getGraphCoordinate(axisValues.xMin, xRatio)
  }));

  return {
    pos,
    setPos,
    showVerticalLine,
    setShowVerticalLine,
    yPointsRef,
    textHeight,
    formattedGraphPoints,
    getGraphCoordinate,
    graphWidth,
    axisValues,
    yPoints,
    xPoints,
    yRatio,
    parentNode
  };
};

export default useScatterPlot;
