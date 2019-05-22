import React from 'react';
import ExternalLink from 'components/ExternalLink';
import { injectIntl, FormattedMessage } from 'react-intl';
import { misc as i18n } from 'js/i18n/definitions';

// The secret to using non-static routes is here.

// We only display the contents of the 404 page after the component mounts.
// This way, when a non-static route loads as the first page, it will not flash
// the static 404 content before react mounts.

// If the route is in fact matched by a non-static route, it will render before
// the 404 page mounts :)
class FourOhFour extends React.Component {
  state = {
    ready: false,
  };
  componentDidMount() {
    this.makeReady();
  }
  makeReady = () => {
    if (!this.state.ready) {
      this.setState({
        ready: true,
      });
    }
  };
  render() {
    return this.state.ready ? (
      <div className="coa-404">
        <div className="wrapper container-fluid">
          <h1 className="coa-404__title">404</h1>
          <div className="coa-404__copy">
            <p>{this.props.intl.formatMessage(i18n.sorry404)}</p>

            <FormattedMessage
              id="misc.browseOrContact404"
              // values={{
              //   name: 'Eric',
              // }}
            />

            <p>
              You can browse from the <a href="/">home page</a>, or{' '}
              <ExternalLink to={'https://projects.austintexas.io/contact/'}>
                contact us
              </ExternalLink>
              .
            </p>
          </div>
        </div>
      </div>
    ) : null;
  }
}

export default injectIntl(FourOhFour);
