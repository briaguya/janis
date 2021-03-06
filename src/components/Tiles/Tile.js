import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { misc } from 'js/i18n/definitions';
import { tilePropTypes } from './proptypes';
import guideIcon from 'images/guide_icon.png';

const Tile = ({ url, text, compact, pageType, isPageType }) => {
  let typeIcon;
  if (pageType == 'guide page') {
    typeIcon = guideIcon;
  }

  let tileClasses = compact ? 'coa-Tile--compact' : 'coa-Tile';
  tileClasses += isPageType === 'information page' ? ' coa-Tile--blue' : '';

  return (
    <Link className={tileClasses} to={url}>
      <div className="coa-Tile__content">
        <p className="coa-Tile__text">{text}</p>
        {typeIcon ? (
          <img src={typeIcon} alt={misc.guideIcon.defaultMessage} />
        ) : (
          <i className="material-icons">arrow_forward</i>
        )}
      </div>
    </Link>
  );
};

Tile.propTypes = tilePropTypes;

export default Tile;
