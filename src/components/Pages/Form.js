import React, { useRef } from 'react';
import { withRouteData, Head } from 'react-static';
import { injectIntl } from 'react-intl';
/**
  In order for IframeResizer to work, you must inject iframeResizer.contentWindow.min.js
  into the source html of page containing your iFrame.
  On Framestack, this is done by modifying the html in the "Advanced Code Editor" of your custom template.
  See: https://github.com/davidjbradshaw/iframe-resizer
**/
import IframeResizer from 'iframe-resizer-react';
import { misc as i18n2, services as i18n3 } from 'js/i18n/definitions';

import PageHeader from 'components/PageHeader';
import HtmlFromAdmin from 'components/HtmlFromAdmin';
import ApplicationBlock from 'components/ApplicationBlock';
import ContactDetails from 'components/Contact/ContactDetails';
import ContextualNav from 'components/PageSections/ContextualNav';
import RelatedToMobile from '../PageSections/ContextualNav/RelatedToMobile';

function FormContainer({
  formContainer: {
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
    coaGlobal,
    contextualNavData,
  },
  intl,
}) {
  const iframeRef = useRef(null);

  // Go to the top of the page when we transition to the form Confirmation Page.
  // "init" events after the first "init" means that there was a page transition within the iframe.
  let iframeLoaded = false;
  const onResized = ({ iframe, height, width, type }) => {
    // 🚨remove delay for testing!
    setTimeout(function(){
    //🚨remove delay for testing!
    if (type === 'init') {
      if (iframeLoaded) {
        document.getElementById('coa-FormContainer__top').scrollIntoView(true);
      } else {
        iframeLoaded = true;
        const msg = document.getElementById('coa-LockedIframeRequestMessage')
        const loader = document.getElementById('coa-loadingWheel')
        const iFrameForm = document.getElementById('coa-iFrameForm')
        iFrameForm.style.opacity = 1
        msg.style.display = "none"
        loader.style.display = "none"
      }
    }
    //🚨remove delay for testing!
  },1500)
    //🚨remove delay for testing!
  };

  setTimeout(function(){
    if (!iframeLoaded) {
      const msg = document.getElementById('coa-LockedIframeRequestMessage')
      msg.style.display = "block"
      msg.style.opacity = 0
      // Think of a better way of setting this transition up 🤔
      setTimeout(function(){msg.style.opacity = 1},100)
    }
  },5000)

  const onLoad = () => {
    const loader = document.getElementById('coa-loadingWheel')
    loader.style.display = "block"
  }

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
      <div id="coa-FormContainer__top">
        <PageHeader contentType={'information'} description={description}>
          {title}
        </PageHeader>
        <div id="coa-loadingWheel"></div>
        <div id="coa-LockedIframeRequestMessage"
          style={{
            display: 'none',
            padding: 10,
            margin: 10,
            backgroundColor: '#ccc',
            opacity: 0,
          }}>
          ...We are still waiting on the form to load. 😐
          <br/><br/>
          <strong> ? Why hasn't it loaded yet ? </strong> <br/>
          &nbsp; &bull; A plugin could be blocking it (Like... "Privacy Badger") <br/>
          &nbsp; &bull; It may have failed to load ("404 error") <br/><br/>

        <strong> ! Here's an option to go to the direct link instead... 🤩</strong> <br/><br/>
        <a href={formUrl}> {formUrl} </a>

        </div>
        <div className="coa-Page__all-of-the-content">
          <div className="coa-Page__main-content">
            <div className="coa-FormContainer__iframe-container">
              {formUrl && (
                <IframeResizer
                  id="coa-iFrameForm"
                  onLoad={onLoad}
                  forwardRef={iframeRef}
                  src={formUrl}
                  className="coa-FormContainer__IframeResizer-default"
                  heightCalculationMethod="lowestElement"
                  frameBorder="0"
                  onResized={onResized}
                />
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

export default withRouteData(injectIntl(FormContainer));
