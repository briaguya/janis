import React from 'react';
import SVG from 'components/SVGs/Svg';

const MinusSVG = ({ title = 'Minus', ...rest }) => (
  <SVG title={title} {...rest}>
    <path d="M1600 736v192q0 40-28 68t-68 28h-1216q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h1216q40 0 68 28t28 68z" />
  </SVG>
);

export default MinusSVG;
