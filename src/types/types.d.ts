export type GraphPoint = {
  x: number;
  y: number;
}

export type FormattedGraphPoint = {
  x: number;
  y: number;
  yPlot: number;
  xPlot: number;
}

export type ScatterGraphPropTypes = {
  data: Array<GraphPoint>;
  graphHeight: number;
  axisColor?: string;
  originAxisColor?: string;
  renderYLabel?: (arg: number | string) => string;
  renderXLabel?: (arg: number | string) => string;
  renderValueBox?: (x: number, y: number) => ReactElement;
  scatterPointColor?: (arg: GraphPoint) => string;
}

export type AxisRangesArguments = { x: number; y: number }[]

export type AxisRanges = {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
  xInterval: number;
  yInterval: number;
}

export type DefaultValueBoxPropTypes = {
  x: number,
  y: number
}

import { FC } from 'react';

declare const ReactScatterGraph: FC<ScatterGraphPropTypes>;

export default ReactScatterGraph;