# MANY WAYS TO WEBSITE:

Caroline example

See it live [HERE](https://aaroncaraway.github.io/caroline-googlesheets/)

### =========================================

### TO RUN:

`yarn start`

### TO PUSH LIVE (to gh-pages):

`yarn run deploy`

### =========================================

### TO HOST ON github pages

[HELP HERE](https://dev.to/yuribenjamin/how-to-deploy-react-app-in-github-pages-2a1f)

1. npm i gh-pages --save-dev
2. Update package json to include "homepage" and two other options in "scripts" (see below)
3. NOTE: On github, in settings, for github pages options, branch is gh-pages
4. npm run deploy

```json
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
    ...
  }
```

## TODO:
