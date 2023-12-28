import React, { FC, ReactElement } from 'react';

import { DefaultValueBoxPropTypes } from '../types/types';

import './styles.css';

const DefaultValueBox: FC<DefaultValueBoxPropTypes> = ({ x, y }): ReactElement => (
  <div className='valueBox' data-testid='value-box'>
    x: {x}
    <br />
    y: {y}
  </div>
);

export default DefaultValueBox;
