import { GraphQLClient } from 'graphql-request';
import { SUPPORTED_LANG_CODES } from 'js/i18n/constants';

// QUERIES
import allServicePagesQuery from 'js/queries/allServicePagesQuery';
import allTopicPagesQuery from 'js/queries/allTopicPagesQuery';
import allDepartmentPagesQuery from 'js/queries/allDepartmentPagesQuery';
import topServicesQuery from 'js/queries/topServicesQuery';
import allThemesQuery from 'js/queries/allThemesQuery';


const createGraphQLClientsByLang = (lang) => {
  const { CMS_API } = process.env;

  return new GraphQLClient(CMS_API, {
    headers: { 'Accept-Language': lang }
  })
}

const makeAllPages = async (langCode) => {
  const path = `/${!!langCode ? langCode : ''}`
  console.log(`- Building routes for ${path}...`);

  const client = createGraphQLClientsByLang(langCode);
  const { allThemes } = await client.request(allThemesQuery);

  const data = {
    path: path,
    component: 'src/js/pages/Home',
    children: await makeChildPages(client, allThemes),
    getData: async () => {
      const { allServicePages: topServices } = await client.request(topServicesQuery);

      return {
        topServices,
        allThemes,
        image: {
          file: 'original_images/lady-bird-lake.jpg',
          title: 'Lady Bird Lake walking trail'
        }
      };
    },
  };

  return data;
}

const makeChildPages = (client, allThemes) => {
  return Promise.all([
    makeServicePages(client, allThemes),
    makeTopicPages(client, allThemes),
    makeThemePages(allThemes),
    makeDepartmentPages(client, allThemes),
  ]);
}

const makeServicePages = async (client, allThemes) => {
  const { allServicePages: allServices } = await client.request(allServicePagesQuery);

  const data = {
    path: '/services',
    component: 'src/js/pages/Services',
    getData: async () => ({
      allServices,
      allThemes,
    }),
    children: allServices.edges.map(({node: service}) => ({
      path: `/${service.slug}`,
      component: 'src/js/pages/Service',
      getData: async () => ({
        service,
        allThemes,
      }),
    })),
  };

  return data;
}

const makeTopicPages = async (client, allThemes) => {
  const { allTopics } = await client.request(allTopicPagesQuery);

  const data = {
    path: '/topics',
    component: 'src/js/pages/Topics',
    getData: async () => ({
      allTopics,
      allThemes,
    }),
    children: allTopics.edges.map(({node: topic}) => ({
      path: `/${topic.slug}`,
      component: 'src/js/pages/Topic',
      getData: async () => ({
        topic,
        allThemes,
      })
    }))
  };

  return data;
}

const makeThemePages = async (allThemes) => ({
    path: '/themes',
    component: 'src/js/pages/Themes',
    getData: async () => ({
      allThemes,
    }),
    children: allThemes.edges.map(({node: theme}) => ({
      path: `/${theme.slug}`,
      component: 'src/js/pages/Theme',
      getData: async () => ({
        theme,
        allThemes,
      })
    }))
});

const makeDepartmentPages = async (client, allThemes) => {
  const { allDepartments } = await client.request(allDepartmentPagesQuery);

  const data = {
    path: '/departments',
    component: 'src/js/pages/Departments',
    getData: async () => ({
      allDepartments,
      allThemes,
    }),
    children: allDepartments.edges.map(({node: department}) => ({
      path: `${department.id}`,
      component: 'src/js/pages/Department',
      getData: async () => ({
        department,
        allThemes,
      })
    }))
  };

  return data;
}

export default {
  getSiteProps: () => ({
    title: 'City of Austin',
  }),
  getRoutes: async () => {
    const routes = [
      {
        path: '/search',
        component: 'src/js/pages/Search', //TODO: update search page to be conscious of all languages
      },
      {
        is404: true,
        component: 'src/js/pages/404', //TODO: update 404 page to be conscious of all languages
      },
    ];

    const allLangs = Array.from(SUPPORTED_LANG_CODES);
    allLangs.unshift(undefined);
    const translatedRoutes = await Promise.all(allLangs.map((langCode) => makeAllPages(langCode)));
    const allRoutes = routes.concat(translatedRoutes)

    return allRoutes;
  },
}
