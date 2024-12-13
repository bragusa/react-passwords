import './Wait.scss';
import React, { useState } from 'react';

interface Props {
  active?: boolean;
  spinner?: boolean;
  relative?: boolean;
  transparent?: boolean;
}

const Wait: React.FC<Props> = ({ active, spinner, relative, transparent }) => {
  return ( active?
      <div data-transparent={transparent} className={`Wait-underlay${relative?' Wait-relative':''}`}>
        {spinner?<div className="Wait-spinner"></div>:null}
      </div>
    :null
  );
};

export default Wait;