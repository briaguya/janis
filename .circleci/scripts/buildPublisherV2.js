const axios = require('axios');

const { defaultValues, branchOverrides } = require("./branchConfig.js")
const branch = process.env.CIRCLE_BRANCH;

const env_vars = Object.assign(
  defaultValues,
  branchOverrides[branch]
);

// In Publisher v2, the joplin_appname is passed separately from the rest of the env_vars
const joplin_appname = env_vars.joplin_appname
delete env_vars.joplin_appname

let payload = {
  "janis_branch": branch,
  "env_vars": env_vars,
  "joplin_appname": joplin_appname,
  "build_type": "rebuild",
};

let apiKey, publisherUrl;
switch(branch) {
  case "master":
    apiKey = process.env.COA_PUBLISHER_V2_API_KEY_STAGING
    publisherUrl = process.env.CI_COA_PUBLISHER_V2_URL_STAGING
    break;
  case "production":
    apiKey = process.env.COA_PUBLISHER_V2_API_KEY_PROD
    publisherUrl = process.env.CI_COA_PUBLISHER_V2_URL_PROD

    payload = {
      "janis_branch": "production",
      "env_vars": {},
      "joplin_appname": "joplin",
      "build_type": "rebuild",
    }
    break;
  default:
    apiKey = process.env.COA_PUBLISHER_V2_API_KEY_PR
    publisherUrl = process.env.CI_COA_PUBLISHER_V2_URL_PR
}

const headers = {
  'Content-Type': 'application/json',
  "x-api-key": apiKey,
}

return axios.post(publisherUrl, payload, {"headers": headers})
.then((res) => {
  console.log("Success")
  console.log("New build instructions sent to coa-publisher v2")
  console.log(res.data)
  process.exit(0)
})
.catch((error) => {
  console.log("Failure")
  console.error(error)
  process.exit(1)
})
