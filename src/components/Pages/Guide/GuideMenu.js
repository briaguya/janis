import React, { Component, useEffect } from 'react';

import classNames from 'classnames';
import { hyphenate } from './helpers';
import { isMobileOrTablet } from 'js/helpers/reactMediaQueries';

function GuideMenuLink({ title, anchorTag, isHeading, isCurrentSection }) {
  // Each GuideSectionWrapper has an id={this.props.anchorTag}
  function goToSection(e) {
    history.pushState(null, null, `#${anchorTag}`);
    document.getElementById(anchorTag).scrollIntoView(true);
  }

  return (
    <div
      className={classNames('coa-GuideMenu__link-wrapper', {
        'coa-GuideMenu__current-section': isCurrentSection,
      })}
      id={`menu-${anchorTag}`}
    >
      <div
        className={classNames('coa-GuideMenu__link', {
          'coa-GuideMenu__heading': isHeading,
          'coa-GuideMenu__subheading': !isHeading,
          'coa-GuideMenu__current-section': isCurrentSection,
        })}
        onClick={goToSection}
      >
        <span className="coa-GuideMenu__title-text">{title}</span>
      </div>
    </div>
  );
}

function GuideMenuSection({ section, currentSection }) {
  const headingAnchorTag = hyphenate(section.heading);
  const subHeadings = section.pages.map((page, index) => {
    const title =
      (page.servicePage && page.servicePage.title) ||
      (page.informationPage && page.informationPage.title);
    const anchorTag = `${headingAnchorTag}-${index + 1}`;
    return {
      title,
      anchorTag,
    };
  });

  return (
    <div className="coa-GuideMenu__section">
      <GuideMenuLink
        title={section.heading}
        anchorTag={headingAnchorTag}
        isHeading={true}
        isCurrentSection={currentSection === headingAnchorTag}
      />
      {subHeadings.map((subHeading, index) => (
        <GuideMenuLink
          key={index}
          title={subHeading.title}
          anchorTag={subHeading.anchorTag}
          isHeading={false}
          isCurrentSection={currentSection === subHeading.anchorTag}
        />
      ))}
    </div>
  );
}

function GuideMenu({ contact, sections, currentSection }) {
  useEffect(() => {
    const el = document.getElementById(`menu-${currentSection}`);
    if (el) {
      el.scrollIntoView();
    }
  });

  return (
    <div>
      <div className="coa-GuideMenu__section">
        {contact && (
          <GuideMenuLink
            title="Contact information"
            anchorTag="Contact-information"
            isHeading={true}
            isCurrentSection={currentSection === 'Contact-information'}
          />
        )}
      </div>
      {sections.map((section, index) => (
        <GuideMenuSection
          key={index}
          section={section}
          currentSection={currentSection}
        />
      ))}
    </div>
  );
}

export default GuideMenu;
