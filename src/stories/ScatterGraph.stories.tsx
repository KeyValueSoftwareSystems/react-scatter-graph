import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ScatterGraph from '../scatter-graph';
import { GraphPoint } from '../types/types';
import { data, data2, data3 } from '../data';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default {
  title: 'Example/ScatterGraph',
  component: ScatterGraph,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen'
  }
} as ComponentMeta<typeof ScatterGraph>;

const Template: ComponentStory<typeof ScatterGraph> = () => <ScatterGraph data={data} graphHeight={500} />;

const Template2: ComponentStory<typeof ScatterGraph> = () => (
  <ScatterGraph
    data={data2}
    graphHeight={300}
    scatterPointColor={({ x }: GraphPoint): string => {
      if (x > 0.4) return '#0000FF';
      else return '#FF0000';
    }}
  />
);

const Template3: ComponentStory<typeof ScatterGraph> = () => (
  <ScatterGraph data={data2} graphHeight={300} axisColor='#00FF00' originAxisColor='#DDDDDD' />
);

const Template4: ComponentStory<typeof ScatterGraph> = () => (
  <ScatterGraph
    data={data3}
    graphHeight={300}
    scatterPointColor={({ x }: GraphPoint): string => {
      if (x > 400) return '#0000FF';
      else return '#FF0000';
    }}
    renderXLabel={(item: string | number) =>
      `${new Date(item).getDate()} ${months[new Date(item).getMonth()]} ${new Date(item).getFullYear()}`
    }
    renderValueBox={(x: number, y: number) => (
      <div className='valueBoxTest'>
        x value: {`${new Date(x).getDate()} ${months[new Date(x).getMonth()]} ${new Date(x).getFullYear()}`}
        <br />y value: {y}
      </div>
    )}
  />
);

export const Basic = Template.bind({});
export const WithCustomDataPointColors = Template2.bind({});
export const WithCustomAxisColors = Template3.bind({});
export const WithCustomRenderProps = Template4.bind({});
