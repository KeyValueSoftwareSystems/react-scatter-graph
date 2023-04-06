import React, { FC, useRef, useState, ReactElement } from 'react';

import { GraphPoint, FormattedGraphPoint, ScatterGraphPropTypes, DefaultValueBoxPropTypes } from '../types/types';
import { getAxisRanges } from './utils';
import { useGraphWidthResize } from './hooks';

import './styles.css';

export const DefaultValueBox: FC<DefaultValueBoxPropTypes> = ({ x, y }): ReactElement => (
  <div className="verticalLine" data-testId="value-box">
      x: {x}
    <br />
    y: {y}
  </div>
);

const ScatterGraph: FC<ScatterGraphPropTypes> = ({
  data,
  graphHeight,
  axisColor,
  originAxisColor,
  renderYLabel,
  renderXLabel,
  renderValueBox,
  scatterPointColor
}) => {
  // states
  const [pos, setPos] = useState({ x: 0, y: 0, yPlot: 0, xPlot: 0 });
  const [showVerticalLine, setShowVerticalLine] = useState(false);

  // refs
  const parentNode = useRef<HTMLDivElement | null>(null);
  const yPointsRef = useRef<HTMLDivElement | null>(null);

  const axisValues = getAxisRanges(data);

  // hooks
  const graphWidth = useGraphWidthResize(parentNode);

  // consts
  const textHeight = 16;
  const graphHeightDiff = axisValues.yMax - axisValues.yMin;
  const graphWidthDiff = axisValues.xMax - axisValues.xMin;
  const yPoints = Array.from({ length: graphHeightDiff / axisValues.yInterval + 1 }, (_, index) => index * axisValues.yInterval + axisValues.yMin);
  const xPoints = Array.from({ length: graphWidthDiff / axisValues.xInterval + 1 }, (_, index) => index * axisValues.xInterval + axisValues.xMin);
  const yRangeDiff = (yPoints[yPoints.length - 1] - yPoints[0]);
  const xRangeDiff = (xPoints[xPoints.length - 1] - xPoints[0]);
  const yRatio = graphHeight / yRangeDiff;
  const xRatio = graphWidth / xRangeDiff;

  const getGraphCoordinate = (point: number, ratio: number): number => point * ratio;

  const formattedGraphPoints = data.map((point: GraphPoint) => ({
    ...point,
    yPlot: graphHeight - getGraphCoordinate(point.y, yRatio) + getGraphCoordinate(axisValues.yMin, yRatio),
    xPlot: (getGraphCoordinate(point.x, xRatio) - getGraphCoordinate(axisValues.xMin, xRatio))
  }));

  return (
    <div style={{ position: 'relative', display: 'flex' }}>
      {showVerticalLine && (
        <div
          className='valueBox'
          style={{
            top: pos.yPlot + 20,
            left: pos.xPlot + 40
          }}
        >
          {renderValueBox ? renderValueBox(pos.x, pos.y) : <DefaultValueBox x={pos.x} y={pos.y} />}
        </div>
      )}
      <div style={{ paddingRight: 6 }} ref={yPointsRef}>
        {yPoints.reverse().map((yLabel: number | string, index: number) => (
          <div
            key={yLabel}
            className='yPoints'
            style={{
              top: index * getGraphCoordinate(axisValues.yInterval, yRatio) - index * textHeight - 7
            }}
          >
            {renderYLabel ? renderYLabel(yLabel) : yLabel}
          </div>
        ))}
      </div>
      <div className='svgWrapper' id='graph-svg-wrapper' ref={parentNode}>
        <svg width={graphWidth} height={graphHeight} version='1.1' viewBox={`0 0 ${graphWidth} ${graphHeight}`}>
          {yPoints.map((_, index) => (
            <line
              key={index}
              x1='0'
              x2={graphWidth}
              y1={index * getGraphCoordinate(axisValues.yInterval, yRatio)}
              y2={index * getGraphCoordinate(axisValues.yInterval, yRatio)}
              strokeDasharray={4}
              stroke={axisColor}
              strokeWidth={1}
              style={{ zIndex: 1 }}
            />
          ))}
          {showVerticalLine && (
            <line
              x1={pos.xPlot}
              x2={pos.xPlot}
              y1={0}
              y2={graphHeight}
              strokeDasharray='4'
              stroke={axisColor}
              strokeWidth={1}
              className='hoverVerticalLine'
            />
          )}
          {formattedGraphPoints.map((grapghPoint: FormattedGraphPoint, index: number) => (
            <circle
              data-testid="graph-point"
              key={index}
              cx={grapghPoint.xPlot}
              cy={grapghPoint.yPlot}
              fill={scatterPointColor ? scatterPointColor(grapghPoint) : '#f00'}
              className='dotHover'
              onMouseEnter={(): void => {
                setPos(grapghPoint);
                setShowVerticalLine(true);
              }}
              onMouseLeave={(): void => {
                setShowVerticalLine(false);
              }}
            />
          ))}
          <line x1={0} x2={graphWidth} y1={graphHeight} y2={graphHeight} stroke={originAxisColor} strokeWidth={1} />
          <line x1={0} x2={0} y1={0} y2={graphHeight} stroke={originAxisColor} strokeWidth={1} />
        </svg>
        <div style={{ paddingRight: 6, display: 'flex' }}>
          {xPoints.map((text, index) => (
            <div
              key={text}
              className='xPoints'
              style={{
                top: graphHeight + 5,
                left: index * (graphWidth / (xPoints.length - 1)) - 10.5
              }}
            >
              {renderXLabel ? renderXLabel(text) : text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

ScatterGraph.defaultProps = {
  graphHeight: 400,
  axisColor: '#9E9E9E',
  originAxisColor: '#9E9E9E'
};

export default ScatterGraph;
