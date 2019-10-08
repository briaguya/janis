const informationPageFragment = `
  fragment informationPageInfo on InformationPageNode {
    id
    title
    slug
    relatedDepartments {
      edges {
        node {
          relatedDepartment {
            id
            title
            slug
          }
        }
      }
    }
    topics {
      edges {
        node {
          toplink
          topic {
            id,
            slug,
            title,
            description,
            topiccollections {
              edges {
                node {
                  topiccollection {
                    id
                    title
                    slug
                    theme {
                      id
                      slug
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    description
    options
    additionalContent
    contacts {
      edges {
        node {
          contact {
            name
            email
            phoneNumber {
              edges {
                node {
                  id
                  phoneDescription
                  phoneNumber
                }
              }
            }
            hours {
              edges {
                node {
                  dayOfWeek
                  startTime
                  endTime
                }
              }
            }
            location {
              name
              street
              city
              state
              zip
              country
            }
          }
        }
      }
    }
  }
`;

export default informationPageFragment;
