import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ScatterGraph from '../scatter-graph/ScatterGraph';
import { GraphPoint } from '../types/types';
import { data, data2 } from '../data';

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


export const ScatterGraph1 = Template.bind({});
export const ScatterGraph2 = Template2.bind({});
export const ScatterGraph3 = Template3.bind({});
