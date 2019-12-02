import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

import GuideMenu from 'components/Pages/Guide/GuideMenu';
import { hyphenate } from './helpers';

function GuideMenuMobile({ title, contact, sections, currentSection, scrollGuideMenu, handleSectionClick, clickedSection }) {
  const [menuOpened, setMenuOpened] = useState(false);

  // Freeze the body of the page when mobile menu is opened.
  // Unfreeze the body of the page when mobile menu is closed.
  useEffect(() => {
    if (menuOpened) {
      window.document.body.classList.add('frozen-body');
    } else {
      window.document.body.classList.remove('frozen-body');
    }
  }, [menuOpened]);

  // Close menu when user pressed "back" button on browser
  useEffect(() => {
    window.onpopstate = function(event) {
      if (menuOpened) setMenuOpened(false);
    };
  }, [menuOpened]);

  function toggleMenuOpened() {
    setMenuOpened(!menuOpened);
  }

  return (
    <div className="coa-GuideMenu__mobile-container" onClick={toggleMenuOpened}>
      <div
        className={classNames('coa-GuideMenu__mobile-background', {
          'coa-GuideMenu__mobile-background--visible': menuOpened,
        })}
      />
      <div
        className={classNames('coa-GuideMenu__mobile-popup', {
          'coa-GuideMenu__mobile-popup-open': menuOpened,
        })}
      >
        <div className="coa-GuideMenu__mobile-padding" />
        <div className="coa-GuideMenu__mobile-content-container">
          <div className="coa-GuideMenu__mobile-content-title">
            <h2>Table of contents</h2>
            <h3>{title}</h3>
          </div>
          <div className="coa-GuideMenu__mobile-content">
            <GuideMenu
              contact={contact}
              sections={sections}
              currentSection={currentSection}
              scrollGuideMenu={scrollGuideMenu}
              handleSectionClick={handleSectionClick}
              clickedSection={clickedSection}
            />
          </div>
        </div>
      </div>
      <div className="coa-GuideMenu__mobile-button">
        <i className="material-icons">list</i>
        <span>Table of contents</span>
        <i className="material-icons">
          {menuOpened ? 'expand_more' : 'expand_less'}
        </i>
      </div>
    </div>
  );
}

export default GuideMenuMobile;
