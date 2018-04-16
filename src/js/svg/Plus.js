import React from 'react';
import SVG from 'js/svg/Svg';

const PlusSVG = ({ title="Plus", ...rest }) => (
  <SVG
    title={title}
    {...rest}
  >
    <path d="M1600 736v192q0 40-28 68t-68 28h-416v416q0 40-28 68t-68 28h-192q-40 0-68-28t-28-68v-416h-416q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h416v-416q0-40 28-68t68-28h192q40 0 68 28t28 68v416h416q40 0 68 28t28 68z"/>
  </SVG>
)

export default PlusSVG;
