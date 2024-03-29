import React, { FC } from 'react';

import DefaultValueBox from './DefaultValueBox';
import { FormattedGraphPoint, ScatterGraphPropTypes } from '../types/types';
import useScatterPlot from './useScatterPlot';
import { CallableStyleElements, GenericStyleElements } from './constants';
import { getCallableStyles } from './utils';

import './styles.css';

const ScatterGraph: FC<ScatterGraphPropTypes> = ({
  data,
  graphHeight,
  gridLineColor,
  originAxisColor,
  renderYLabel,
  renderXLabel,
  renderValueBox,
  scatterPointColor,
  styles = {}
}) => {
  const {
    pos,
    setPos,
    showVerticalLine,
    setShowVerticalLine,
    yPointsRef,
    textHeight,
    formattedGraphPoints,
    getGraphCoordinate,
    graphWidth,
    yPoints,
    xPoints,
    axisValues,
    yRatio,
    parentNode
  } = useScatterPlot(data, graphHeight);

  return (
    <div className='container' style={styles[GenericStyleElements.Root]}>
      {showVerticalLine && (
        <div
          className='valueBoxContainer'
          style={{
            top: pos.yPlot + 20,
            left: pos.xPlot + 40
          }}
        >
          {renderValueBox ? renderValueBox(pos.x, pos.y) : <DefaultValueBox x={pos.x} y={pos.y} />}
        </div>
      )}
      <div className='yPointsContainer' ref={yPointsRef}>
        {yPoints.reverse().map((yLabel: number | string, index: number) => (
          <div
            key={yLabel}
            className='yPoints'
            style={{
              top: index * getGraphCoordinate(axisValues.yInterval, yRatio) - index * textHeight - 7,
              ...getCallableStyles(styles, CallableStyleElements.YLabel, yLabel)
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
              stroke={gridLineColor}
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
              stroke={gridLineColor}
              strokeWidth={1}
            />
          )}
          {formattedGraphPoints.map((graphPoint: FormattedGraphPoint, index: number) => (
            <circle
              data-testid='graph-point'
              key={index}
              cx={graphPoint.xPlot}
              cy={graphPoint.yPlot}
              fill={scatterPointColor ? scatterPointColor(graphPoint) : '#f00'}
              className='dotHover'
              onMouseEnter={(): void => {
                setPos(graphPoint);
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
        <div className='xPointsContainer'>
          {xPoints.map((xLabel, index) => (
            <div
              key={xLabel}
              className='xPoints'
              style={{
                top: graphHeight + 5,
                left: index * (graphWidth / (xPoints.length - 1)),
                ...getCallableStyles(styles, CallableStyleElements.XLabel, xLabel)
              }}
            >
              <div className='xPointsLabel'>{renderXLabel ? renderXLabel(xLabel) : xLabel}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

ScatterGraph.defaultProps = {
  graphHeight: 400,
  gridLineColor: '#9E9E9E',
  originAxisColor: '#9E9E9E'
};

export default ScatterGraph;
