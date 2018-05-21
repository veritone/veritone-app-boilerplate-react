# Veritone App Boilerplate - React

The [Veritone][veri] app boilerplate is a full-fledged boilerplate for creating [Veritone][veri] powered web applications ([SPA](https://en.wikipedia.org/wiki/Single-page_application)s).

### Tech Stack
* [React][react] + [Redux][redux] for UI and state management.

### Requirements
* node `^8.11.0`
* yarn `^1.6.0` 

You can use [nvm](https://github.com/creationix/nvm#installation) to easily switch Node versions between different projects.

### Installation
We use [Yarn](https://yarnpkg.com/) for dependency management.
```bash
$ yarn install # Install project dependencies
```

### Quick Start
* Clone this repo and install the dependencies
```sh
git clone https://github.com/veritone/veritone-app-boilerplate-react.git
cd veritone-app-boilerplate-react/
yarn install
```

* Create a local development alias in your `hosts` file for the new app.
  * edit `/etc/hosts` with `sudo` using your preferred text editor
  * add: `127.0.0.1   local.veritone-sample-app.com`

* [Create a Veritone developer account](https://www.veritone.com/onboarding/#/signUp?type=developer) if you don't already have one.

* [Register a new Veritone application](https://developer.veritone.com/applications/overview/new/details).
  * URL: `http://local.veritone-sample-app.com:3001`
  * Oauth2 Redirect URL: `http://local.veritone-sample-app.com:3001`

* Start the development server
```sh
yarn start
```

* The sample app should now be serving at `http://local.veritone-sample-app.com:3001`.

### Building for Production
```bash
$ yarn build  # Build production assets
```

[react]: https://facebook.github.io/react/
[redux]: http://redux.js.org/
[veri]: https://veritone.com/
[rdce]: https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd

# License
Copyright 2018, Veritone Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
