# React Scatter Graph

<a href="https://www.npmjs.com/package/@keyvaluesystems/react-scatter-graph"><img src="https://badgen.net/npm/v/@keyvaluesystems/react-scatter-graph?color=blue" alt="npm version"></a> <a href="https://www.npmjs.com/package/@keyvaluesystems/react-scatter-graph" ><img src="https://img.shields.io/npm/dw/@keyvaluesystems/react-scatter-graph?label=Downloads" /></a> <a href="https://github.com/KeyValueSoftwareSystems/@keyvaluesystems/react-scatter-graph"><img src="https://github.com/KeyValueSoftwareSystems/@keyvaluesystems/react-scatter-graph/actions/workflows/update-and-publish.yml/badge.svg" alt="" /></a>

<div align="center">
<img src="https://raw.githubusercontent.com/KeyValueSoftwareSystems/react-scatter-graph/master/assets/react-scatter-graph-example-2.png" alt="" width="700"/>
</div>

A fully customizable ready to use scatter graph UI package for React.
Try tweaking React Scatter Graph using this codesandbox link <a href="https://codesandbox.io/s/stupefied-currying-ornk52" >here</a>

## Installation

```bash
npm install @keyvaluesystems/react-scatter-graph
```

You’ll need to install React separately since it isn't included in the package.

## Usage

React Scatter Graph can run in a very basic mode like this:

```jsx
import React, { useState } from 'react';
import ReactScatterGraph from '@keyvaluesystems/react-scatter-graph';

function App() {
  data = [
    { x: 450, y: 150 },
    { x: 360, y: 330 },
    { x: 650, y: 315 },
    { x: 270, y: 200 }
  ];

  return <ScatterGraph data={data} yMax={500} xMax={600} yInterval={50} xInterval={50} graphHeight={500} />;
}

export default App;
```

The `data` array is an array of objects with { x, y } cordinates.

> Note: The graph width is responsive. So it can be adjusted by a parent wrapper. You need to provide the height.



### React Scatter Graph for date inputs:

Scatter graph is a useful tool for plotting date values. In order to do so, timestamps must be provided for the x-axis values.


<div align="center">
<img src="./assets/react-scatter-graph-example-4.png" alt="" width="700"/>
</div>



```jsx
import  React,  {  useState  }  from  'react';
import ReactScatterGraph from '@keyvaluesystems/react-scatter-graph';

function  App()  {  
  data = [
    // x given in milliseconds curresponding to the date
    { x: 1672876800000, y: 150 },
    { x: 1673568000000, y: 330 },
    { x: 1674086400000, y: 315 },
    { x: 1673222400000, y: 200}
  ];

  return (
    <ScatterGraph
      data={data}
      yMax={500}
      xMax={1674172800000}
      xMin={1672531200000}
      yInterval={50}
      // x interval given in milliseconds curresponding to a particular date period.
      xInterval={172800000}
      graphHeight={500}
    />
  );
}

export default App;
```

## Props

Props that can be passed to the component are listed below:

<table>
  <thead>
    <tr>
      <th>Prop</th>
      <th>Description</th>
      <th>Default</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><b>data:</b> object[]</code></td>
      <td>An array of x-y cordinates to render.</td>
      <td><code>undefined</code></td>
    </tr>
    <tr>
      <td><code><b>yMin?:</b> number</code></td>
      <td>Minimum value of Y - axis.</td>
      <td><code>0</code></td>
    </tr>
    <tr>
      <td><code><b>yMax:</b> number</code></td>
      <td>Maximum value of Y - axis.</td>
      <td><code>undefuned</code></td>
    </tr>
    <tr>
      <td><code><b>xMin?:</b> number</code></td>
      <td>Minimum value of X - axis.</td>
      <td><code>0</code></td>
    </tr>
    <tr>
      <td><code><b>xMax:</b> number</code></td>
      <td>Maximum value of X - axis.</td>
      <td><code>undefuned</code></td>
    </tr>
    <tr>
      <td><code><b>xInterval:</b> number</code></td>
      <td>Interval value X - axis.</td>
      <td><code>undefuned</code></td>
    </tr>
    <tr>
      <td><code><b>yInterval:</b> number</code></td>
      <td>Interval value Y - axis.</td>
      <td><code>undefuned</code></td>
    </tr>
    <tr>
      <td><code><b>graphHeight:</b> number</code></td>
      <td>Height of graph in pixel</td>
      <td><code>undefuned</code></td>
    <tr>
      <td><code><b>axesColor:</b> string</code></td>
      <td>Color for the x and y axes color which indicates the lines that are used to measure data</td>
      <td><code>#9E9E9E</code></td>
    </tr>
    <tr>
      <td><code><b>originAxisColor:</b> string</code></td>
      <td>Color for the origin axis color</td>
      <td><code>#9E9E9E</code></td>
    </tr>
    <tr>
      <td><code><b>renderYLabel?:</b> (arg: number | string): string</code></td>
      <td>
        Render function for customizing Y axis label
      </td>
      <td><code>undefined</code></td>
    </tr>
        <tr>
      <td><code><b>renderXLabel?:</b> (arg: number | string): string</code></td>
      <td>
        Render function for customizing X axis label
      </td>
      <td><code>undefined</code></td>
    </tr>
    <tr>
      <td><code><b>scatterPointColor?:</b> (arg: { x: number, y: number }): string</code></td>
      <td>
        Function for customizing scatter point color. Based on the args, we can customise the color. Return value should be the color hash / string.
      </td>
      <td><code>undefined</code></td>
    </tr>
    <tr>
      <td><code><b>renderValuebox?:</b> (x: number, y: number): ReactElement</code></td>
      <td>
        Render function for customizing the value box shown on hover.
      </td>
      <td><code>undefined</code></td>
    </tr>
  </tbody>
</table>
