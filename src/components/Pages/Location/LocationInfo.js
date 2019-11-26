import React, { Fragment } from 'react';
import { capitalize } from 'lodash';
import { useIntl } from 'react-intl';

import ResponsiveImage from 'components/ResponsiveImage';
import { FULL_WIDTH_RESPONSIVE_IMAGE_SIZES } from 'js/helpers/constants';
import getImageData from 'components/ResponsiveImage/getImageData';
import { getDaysInOrder } from 'js/helpers/date';
import { date as i18nDate, locations as i18nLocations } from 'js/i18n/definitions';

const LocationPageBlock = ({title, content}) => (
  <div className="coa-LocationPage__sub-section-block">
    <div className="coa-LocationPage__sub-section-block-title">
      {title}
    </div>
    <div className="coa-LocationPage__sub-section-block-contents">
      {content}
    </div>
  </div>
);

const LocationPageContact = ({phone, email}) => {
  const intl = useIntl();
  // TODO: use 'libphonenumber-js' for real phone from Joplin API
  const phoneContent = (
    <Fragment>
      {`${phone.name}: `}
      <a href={`tel:${phone.value}`}>
        {phone.value}
      </a>
    </Fragment>
  );
  const emailContent = (
    <a href={`mailto:${email.value}`}>{email.value}</a>
  )

  return (
    <div className="coa-LocationPage__sub-section">
      <h2 className="coa-LocationPage__sub-section-title">
        {intl.formatMessage(i18nLocations.contact)}
      </h2>
      <div className="coa-LocationPage__sub-section-block-container">
        <LocationPageBlock
          title={intl.formatMessage(i18nLocations.phone)}
          content={phoneContent}
        />
        <LocationPageBlock
          title={intl.formatMessage(i18nLocations.emailAddress)}
          content={emailContent}
        />
      </div>
    </div>
  );
}

const LocationPageAddress = ({title, address}) => {
  const {street, city, state, zip} = address;
  const AddressText = (
    <div>
      <span className="coa-LocationPage__address-line">{street}</span>
      <span className="coa-LocationPage__address-line">
        {city}, {state} {zip}
      </span>
    </div>
  );

  return (
    <LocationPageBlock
      title={title}
      content={AddressText}
    />
  )
}

const LocationPageLocation = ({location, image}) => {
  const intl = useIntl();
  const imageData = (image) ? getImageData(image) : null;

  // Only include "Physical Address" if no "Mailing Address" is present
  const addresses = (location["Mailing address"]) ? (
    <Fragment>
      <LocationPageAddress
        title={intl.formatMessage(i18nLocations.physicalAddress)}
        address={location["Physical address"]}
      />
      <LocationPageAddress
        title={intl.formatMessage(i18nLocations.mailingAddress)}
        address={location["Mailing address"]}
      />
    </Fragment>
  ) : (
    <LocationPageAddress
      title={intl.formatMessage(i18nLocations.address)}
      address={location["Physical address"]}
    />
  )

  return (
    <div className="coa-LocationPage__sub-section">
      <h2 className="coa-LocationPage__sub-section-title">
        {intl.formatMessage(i18nLocations.location)}
      </h2>
      <div className="coa-LocationPage__sub-section-block-container">
        {addresses}
      </div>
      {imageData && (
        <ResponsiveImage
          className="coa-LocationPage__location-image"
          filename={imageData.imageFilename}
          defaultWidth="width-828"
          widths={FULL_WIDTH_RESPONSIVE_IMAGE_SIZES}
          extension={imageData.imageExtension}
          aria-label={imageData.imageTitle}
          altText={imageData.imageTitle}
        />
      )}
    </div>
  );
}

const LocationPageFacilityHours = ({hours}) => {
  const intl = useIntl();

  const HoursText = (
    <div className="coa-LocationPage__facility-hours-container">
      <table className="coa-LocationPage__table">
        <tbody>
          {getDaysInOrder().map((day, i) => (
            <tr key={i}>
              <td>
                {intl.formatMessage(
                  i18nDate['weekday' + capitalize(day)],
                )}
              </td>
              <td>{hours[day]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="coa-LocationPage__sub-section">
      <h2 className="coa-LocationPage__sub-section-title">
        {intl.formatMessage(i18nLocations.facilityHours)}
      </h2>
      <div className="coa-LocationPage__sub-section-block-container">
        <LocationPageBlock
          title={intl.formatMessage(i18nLocations.standardHours)}
          content={HoursText}
        />
      </div>
    </div>
  );
}

const LocationPageInfo = ({phone, email, location, image, hours}) => (
  <div className="coa-LocationPage__section">
    <LocationPageContact
      phone={phone}
      email={email}
    />
    <LocationPageLocation
      location={location}
      image={image}
    />
    <LocationPageFacilityHours
      hours={hours}
    />
  </div>
);

export default LocationPageInfo;