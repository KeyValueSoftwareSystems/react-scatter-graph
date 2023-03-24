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
  yMin?: number;
  yMax: number;
  xMin?: number;
  xMax: number;
  yInterval: number;
  xInterval: number;
  graphHeight: number;
  axesColor?: string;
  originAxisColor?: string;
  renderYLabel?: (arg: number | string) => string;
  renderXLabel?: (arg: number | string) => string;
  scatterPointColor?: (arg: GraphPoint) => string;
}