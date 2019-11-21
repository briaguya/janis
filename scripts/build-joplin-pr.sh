# Add your Joplin PR API and Media Links here...
# - NOTE: make sure CMS_API has `/api/graphiql` endpoints
# - AND... CMS_MEDIA has `/media` endpoints

# Examples
# - export CMS_API='https://joplin-pr-3244-guide-icon-tile.herokuapp.com/api/graphql'
# - export CMS_MEDIA='https://joplin-pr-3244-guide-icon-tile.herokuapp.com/media'

# Or,  maybe you want to use staging or production media
# - Staging Media: `https://joplin-austin-gov-static.s3.amazonaws.com/staging/media`
# - Production Media: `https://joplin-austin-gov-static.s3.amazonaws.com/production/media`

export NODE_PATH='./src'

# export CMS_API='https://joplin-pr-3244-guide-icon-tile.herokuapp.com/api/graphql'
export CMS_API='http://localhost:8000/api/graphql'
export CMS_MEDIA='https://joplin-staging.herokuapp.com/media'
export PAGE_ID='SW5mb3JtYXRpb25QYWdlTm9kZTo3'

yarn npm-run-all build-css build-js

echo " 🏗 END of the Joplin PR Build 🏗 "

http-server dist
