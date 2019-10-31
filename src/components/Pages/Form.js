import React, { useRef } from 'react';
import { withRouteData, Head } from 'react-static';
import { injectIntl } from 'react-intl';
/**
  In order for IframeResizer to work, you must inject iframeResizer.contentWindow.min.js
  into the source html of page containing your iFrame.
  On Framestack, this is done by modifying the html in the "Advanced Code Editor" of your custom template.
  See: https://github.com/davidjbradshaw/iframe-resizer
**/
import IframeResizer from 'iframe-resizer-react'
import { misc as i18n2, services as i18n3 } from 'js/i18n/definitions';

import PageHeader from 'components/PageHeader';
import HtmlFromAdmin from 'components/HtmlFromAdmin';
import ApplicationBlock from 'components/ApplicationBlock';
import ContactDetails from 'components/Contact/ContactDetails';
import ContextualNav from 'components/PageSections/ContextualNav';
import RelatedToMobile from '../PageSections/ContextualNav/RelatedToMobile';

function FormPage({
  formPage: {
    title,
    slug,
    topic,
    topics,
    theme,
    department,
    relatedDepartments,
    toplink,
    description,
    formUrl,
    contacts,
    coaGlobal,
    contextualNavData,
  },
  intl,
}) {
  const iframeRef = useRef(null);

  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      {!coaGlobal && (
        <ContextualNav
          parent={contextualNavData.parent}
          relatedTo={contextualNavData.relatedTo}
          offeredBy={contextualNavData.offeredBy}
        />
      )}
      <div>
        <PageHeader contentType={'information'} description={description}>
          {title}
        </PageHeader>
        <div className="coa-Page__all-of-the-content">
          <div className="coa-Page__main-content">
            {formUrl && (
              <IframeResizer
                forwardRef={iframeRef}
                src={formUrl}
                className="coa-FormPage__IframeResizer-default"
                frameBorder="0"
              />
            )}
          </div>
          <div className="coa-Page__side-content">
            <div className="coa-ServicePage__contacts-desktop">
              {!!contacts && !!contacts.length && (
                <ContactDetails contact={contacts[0]} />
              )}
            </div>
          </div>
        </div>
        {!coaGlobal && (
          <RelatedToMobile
            relatedTo={contextualNavData.relatedTo}
            offeredBy={contextualNavData.offeredBy}
          />
        )}
      </div>
    </div>
  );
}

export default withRouteData(injectIntl(FormPage));