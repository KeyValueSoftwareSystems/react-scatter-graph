import React from 'react';
import { render, queryByAttribute, fireEvent } from '@testing-library/react';

import ReactScatterGraph, { DefaultValueBox } from '../scatter-graph/ScatterGraph';
import { data, data2 } from '../data';
import { GraphPoint } from '../types/types';

const getById = queryByAttribute.bind(null, 'id');

test('Scatter graph Component - simple', async () => {
  const dom = render(
    <ReactScatterGraph
      data={data}
      yMax={500}
      xMax={600}
      yInterval={50}
      xInterval={50}
      graphHeight={500}
    />
  );
  const label = await getById(dom.container, 'graph-svg-wrapper');
  expect(label).not.toBeNull();
});

test('Scatter graph Component - with custom X axis label', async () => {
  const dom = render(
    <ReactScatterGraph
      data={data}
      yMax={500}
      xMax={600}
      yInterval={50}
      xInterval={50}
      graphHeight={500}
      renderXLabel={(item: string | number): string => `${item} X`}
    />
  );
  const label = await getById(dom.container, 'graph-svg-wrapper');
  expect(label).not.toBeNull();
});

test('Scatter graph Component - with custom Y axis label', async () => {
  const dom = render(
    <ReactScatterGraph
      data={data}
      yMax={500}
      xMax={600}
      yInterval={50}
      xInterval={50}
      graphHeight={500}
      renderYLabel={(item: string | number): string => `${item} Y`}
    />
  );
  const label = await getById(dom.container, 'graph-svg-wrapper');
  expect(label).not.toBeNull();
});

test('Scatter graph Component - with scatter point color', async () => {
  const dom = render(
    <ReactScatterGraph
      data={data2}
      yMax={500}
      xMax={600}
      yInterval={50}
      xInterval={50}
      graphHeight={500}
      scatterPointColor={({ x }: GraphPoint): string => {
        if (x > 400) return '#0000FF';
        else return '#FF0000';
      }}
    />
  );
  const label = await getById(dom.container, 'graph-svg-wrapper');
  expect(label).not.toBeNull();
});


test('Default value box component - with x and y values', async () => {
  const { getByText } = render(
    <DefaultValueBox
      x={100}
      y={100}
    />
  );
expect(getByText(/100/)).not.toBeNull();
});

test('Value box component - on graph point hover', async () => {
  const { getAllByTestId } = render(
    <ReactScatterGraph
      data={data2}
      yMax={500}
      xMax={600}
      yInterval={50}
      xInterval={50}
      graphHeight={500}
      scatterPointColor={({ x }: GraphPoint): string => {
        if (x > 400) return '#0000FF';
        else return '#FF0000';
      }}
    />
  );
  expect(() => getAllByTestId("value-box")[0]).toThrow();
  fireEvent.mouseEnter(getAllByTestId("graph-point")[0]);
  expect(getAllByTestId("value-box")[0]).not.toBeNull();
  fireEvent.mouseLeave(getAllByTestId("graph-point")[0]);
  expect(() => getAllByTestId("value-box")[0]).toThrow();
});

test('fires window resize event', () => {
  const resizeSpy = jest.fn();
  window.addEventListener('resize', resizeSpy);

  render(<ReactScatterGraph
    data={data2}
    yMax={500}
    xMax={600}
    yInterval={50}
    xInterval={50}
    graphHeight={500}
    scatterPointColor={({ x }: GraphPoint): string => {
      if (x > 400) return '#0000FF';
      else return '#FF0000';
    }}
  />);

  window.dispatchEvent(new Event('resize'));

  expect(resizeSpy).toHaveBeenCalledTimes(1);
});

test('Scatter graph Component - with custom value box', async () => {
  const dom = render(
    <ReactScatterGraph
      data={data}
      yMax={500}
      xMax={600}
      yInterval={50}
      xInterval={50}
      graphHeight={500}
      renderYLabel={(item: string | number): string => `${item} Y`}
      renderValueBox={(x: number, y: number) => (
        <div>
          x value: {x}
          <br />
          y value: {y}
        </div>
      )}
    />
  );
  const label = await getById(dom.container, 'graph-svg-wrapper');
  expect(label).not.toBeNull();
});

