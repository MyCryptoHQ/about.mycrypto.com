# MyCrypto About / Team Page

Live site can be found at [https://about.mycrypto.com](https://about.mycrypto.com).


### Quick Start Guide
To build this project locally, you need to have Node.js installed. Clone the project with Git and run:


`$ cd about.mycrypto.com`

`$ yarn install`

`$ gulp` (if this fails, make dependancy `gulp@3.9.1` and rerun `yarn install`)

This will run Gulp to build the project and watch for changes. You can open `dist/index.html` to view your local copy.

### To Release

* Open 2 terminal windows 
  * On the first terminal, be in `./dist` and run;
     * Create a new git repo: `git init`
     * Add the same remote: `git remote add dist git@github.com:MyCryptoHQ/about.mycrypto.com.git`
     * Checkout into the current live version: `git checkout gh-pages`
     * Create a new branch for the release: `git checkout -b gh-pages-release-<date>`
  * On the second terminal, be in `./` and run `gulp` to build the project 
* Check to see if the build was successful by opening `./dist/index.html` in the browser
* Navigate to the first terminal
  * Add all the changed files: `git add .`
  * Commit them: `git commit -m "Compile for release`
  * Push to remote: `git push dist gh-pages-release-<date>`
* Now create a PR from `gh-pages-release-<date>` into `gh-pages` (like: https://github.com/MyCryptoHQ/about.mycrypto.com/pull/42)
* Get Infra to clear CF caches (project is live at https://mycryptohq.github.io/about.mycrypto.com/ without this though)