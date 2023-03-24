import React from 'react';
import { render, queryByAttribute } from '@testing-library/react';

import ReactScatterGraph from '../scatter-graph/ScatterGraph';
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



