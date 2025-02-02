# Change Log

All notable changes to this project will be documented in this file

<a name="Upgrade"></a>

# Migrate (2019-17-10)

- Reference document [migration guide neutrino v8 to v9](https://master.neutrinojs.org/migration-guide/#neutrino-v8-to-v9)
- **Babel7, Webpack4**
- **React:** v16.3.2 -> v16.10.2
- **Material-ul:** v1.0.0 -> v4.5.1
- **Neutrino:** v8.3.0 -> 9.0.0-rc.4

  - **@neutrinojs/jest:** v8.3.0 -> 9.0.0-rc.4,
    - _requires an installation of **jest**_
    - _create *jest.config.js* file_
  - **@neutrinojs/react:** v8.3.0 -> 9.0.0-rc.4
    - _requires an installation of **webpack**, **webpack-dev-server**, and **webpack-cli**_
    - _create *webpack.config.js* file_
  - **@neutrinojs/style-loader:** v8.3.0 -> 9.0.0-rc.4
  - modify **neutrinorc.js** file :

    - the Neutrino API now only recognizes functions as middleware

      from

      ```javascript
      module.exports = {
        use: [['@neutrinojs/react', options]]
      };
      ```

      to

      ```javascript
      const react = require('@neutrinojs/react');

      module.exports = {
        use: [
          react(), //or
          react(options)
        ]
      };
      ```

    - **html-template:** addition `src/index.ejs` to override default template and help more in-depth customization of content
    - **babel**:
      - install **@babel/plugin-proposal-decorators --dev**
      - replace `babel-plugin-transform-decorators-legacy` to `["@babel/plugin-proposal-decorators",{"legacy": true}]`

- **Scripts:** the removal of most of the Neutrino CLI's commands

  form

  ```javascript
  "scripts" : {
      "start": "neutrino start",
      "build": "neutrino build",
      "test" : "neutrino test",
  }
  ```

  to

  ```javascript
  "scripts" : {
      "start": "webpack-dev-server --mode development --open",
      "build": "webpack --mode production",
      "test" :  "jest",
  }
  ```
