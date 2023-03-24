
# React Scatter graph
<a href="https://www.npmjs.com/package/react-vertical-stepper"><img src="https://badgen.net/npm/v/react-vertical-stepper?color=blue" alt="npm version"></a> <a href="https://www.npmjs.com/package/react-vertical-stepper" ><img src="https://img.shields.io/npm/dw/react-vertical-stepper?label=Downloads" /></a> <a href="https://github.com/KeyValueSoftwareSystems/react-vertical-stepper"><img src="https://github.com/KeyValueSoftwareSystems/react-vertical-stepper/actions/workflows/update-and-publish.yml/badge.svg" alt="" /></a>

<div align="center">
<img src="./src/assets/vertical-stepper-example.png" alt="" width="269" height="416"/>
</div>

A fully customizable ready to use scatter graph UI package for React.
Try tweaking a vertical stepper using this codesandbox link <a href="https://codesandbox.io/s/vertical-stepper-demo-x24q7u" >here</a>

## Installation

```bash
npm install @keyvaluesystems/react-scatter-graph
```

You’ll need to install React separately since it isn't included in the package.

## Usage

React Scatter Graph can run in a very basic mode like this:

```jsx
import  React,  {  useState  }  from  'react';
import ReactScatterGraph from '@keyvaluesystems/react-scatter-graph';

function  App()  {  
  data = [
    { x: 450, y: 150 },
    { x: 360, y: 330 },
    { x: 650, y: 315 },
    { x: 270, y: 200}
  ];

  return (
    <ScatterGraph
      data={data}
      yMax={500}
      xMax={600}
      yInterval={50}
      xInterval={50}
      graphHeight={500}
    />
  );
}

export default App;
```
The `data` array is an array of objects with { x, y } cordinates.

>Note: The graph width is resposive. So the it can be adjusted by paraent wrapper. Need to provide the height.

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
  </tbody>
</table>
