import React, { Component } from 'react';
import request from 'graphql-request';

import allTopicPagesQuery from 'js/queries/allTopicPagesQuery';
import I18nNavLink from 'js/modules/I18nNavLink';
import ExternalLink from 'js/modules/ExternalLink';
import MenuItem from 'js/page_sections/Menu/MenuItem';
import navigation from '__tmpdata/navigation';

import CloseSVG from 'js/svg/Close';
import AirplaneSVG from 'js/svg/Airplane';
import citySealImg from 'images/coa_seal.png';


class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openSection: null,
    };
    this.DESKTOP_BREAKPOINT = 1080;
  }

  focusOnClose = () => {
    this.refs.closeTrigger && this.refs.closeTrigger.focus();
  }

  componentDidUpdate(prevProps) {
    if (this.props.isOpen && !prevProps.isOpen) {
      this.focusOnClose();
    }
  }

  toggleSublist = (e, openSectionId) => {
    console.log(openSectionId)
    e.preventDefault();
    if (openSectionId === this.state.openSection) {
      this.setState({
        openSection: null
      })
    } else {
      this.setState({
        openSection: openSectionId,
      })
    }
  }

  render() {
    const { allThemes } = navigation.data;

    return allThemes.edges.length && (
      <div className="wrapper">
        <nav className={`coa-Menu ${this.props.isOpen ? 'coa-Menu--open' : ''}`} role="navigation">
          <button className="coa-Menu__close-btn d-lg-none"
            onClick={this.props.toggleMenu}
            ref="closeTrigger"
            tabIndex="0"
          >
            <CloseSVG size="40" />
          </button>
          <ul className="coa-Menu__list">
            <HomeMobileListItem handleClick={this.props.toggleMenu} />
            <AirportMobileListItem />
            <ThreeOneOneMobileListItem />
        {
          allThemes.edges.map(({node: theme}, i) => (
            <MenuItem id={i} {...this.state}
              theme={theme}
              handleMenuToggle={this.props.toggleMenu}
              handleSublistToggle={this.toggleSublist}
            />
          ))
        }
            <PrivacyPolicyListItem />
            <MobileFooter />
          </ul>
        </nav>
      </div>
    );
  }
}

const HomeMobileListItem = ({handleClick}) => (
  <li onClick={handleClick}
    className="coa-Menu__item coa-Menu__item--small d-lg-none"
  >
    <I18nNavLink to="/" exact>
      Home
    </I18nNavLink>
  </li>
)

const AirportMobileListItem = () => (
  <li className="coa-Menu__item coa-Menu__item--small d-lg-none">
    <a href="http://www.austintexas.gov/airport">
      <div className="coa-Menu__airplane-icon">
        <AirplaneSVG size="15"/>
      </div>
      <span className="d-lg-none">Airport</span>
    </a>
  </li>
)

const ThreeOneOneMobileListItem = () => (
  <li className="coa-Menu__item coa-Menu__item--flex coa-Menu__item--small d-lg-none">
    <a href="tel:311">
      Call 311
    </a>
    &nbsp;or&nbsp;
    <a href="http://311.austintexas.gov/">
      Submit an Online Request
    </a>
  </li>
)

const PrivacyPolicyListItem = () => (
  <li className="coa-Menu__item coa-Menu__item--small d-lg-none">
    <a href="#">
      Read About Privacy
    </a>
  </li>
)

const MobileFooter = () => (
  <div>
    <p className="coa-Menu__footer-text d-lg-none">
      Alpha.austin.gov is a work in progress. For the full City of Austin website, visit <ExternalLink to="https://austintexas.gov">austintexas.gov</ExternalLink>.
    </p>
    <img className="d-lg-none" src={citySealImg} alt="City of Austin Seal"/>
  </div>
)

export default Menu;
