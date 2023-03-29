import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ScatterGraph from '../scatter-graph/ScatterGraph';
import { GraphPoint } from '../types/types';
import { data, data2, data3 } from '../data';

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default {
  title: 'Example/ScatterGraph',
  component: ScatterGraph,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen'
  }
} as ComponentMeta<typeof ScatterGraph>;

const Template: ComponentStory<typeof ScatterGraph> = () => (
  <ScatterGraph
    data={data}
    yMax={500}
    xMax={600}
    yInterval={50}
    xInterval={50}
    graphHeight={500}
  />
);

const Template2: ComponentStory<typeof ScatterGraph> = () => (
  <ScatterGraph
    data={data2}
    yMax={500}
    xMax={800}
    yMin={50}
    xMin={40}
    yInterval={50}
    xInterval={40}
    graphHeight={300}
    scatterPointColor={({ x }: GraphPoint): string => {
      if (x > 400) return '#0000FF';
      else return '#FF0000';
    }}
  />
);

const Template3: ComponentStory<typeof ScatterGraph> = () => (
  <ScatterGraph
    data={data2}
    yMax={500}
    xMax={800}
    yInterval={50}
    xInterval={40}
    graphHeight={300}
    axesColor='#00FF00'
    originAxisColor='#DDDDDD'
  />
);

const Template4: ComponentStory<typeof ScatterGraph> = () => (
  <ScatterGraph
    data={data3}
    yMax={500}
    yMin={100}
    xMax={1674172800000}
    xMin={1672531200000}
    yInterval={50}
    xInterval={172800000}
    graphHeight={300}
    scatterPointColor={({ x }: GraphPoint): string => {
      if (x > 400) return '#0000FF';
      else return '#FF0000';
    }}
    renderXLabel={(item: string | number) => `${new Date(item).getDate()} ${months[new Date(item).getMonth()]} ${new Date(item).getFullYear()}`}
    renderValueBox={(x: number, y: number) => (
      <div className="valueBoxTest">
        x value: {`${new Date(x).getDate()} ${months[new Date(x).getMonth()]} ${new Date(x).getFullYear()}`}
        <br />
        y value: {y}
      </div>
    )}
  />
);

export const ScatterGraph1 = Template.bind({});
export const ScatterGraph2 = Template2.bind({});
export const ScatterGraph3 = Template3.bind({});
export const ScatterGraph4 = Template4.bind({});
