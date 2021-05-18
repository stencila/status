# 🚦Status

**Stencila's status reporting**

## 👋 Introduction

This repository is for Stencila's status reporting and https://status.stenci.la. We use [Statusfy](https://statusfy.co/) to create and update incident reports. The site is automatically built and deployed by Azure CI.

Incident reports do not have to be only for degraded performance or outages. Stencila team members are encouraged to create report for maintenance tasks, using the `under-maintenance` severity tag, so that users have an indication that there may be some instability.

## 🏃‍♀️ Getting started

```
git clone git@github.com:stencila/status
cd status
npm install
npm run dev
```

## 🚨 Create an incident report

Either create a new Markdown file for the incident in [`content`](content), or run,

```sh
npm run new-incident
```

See the [docs](https://docs.statusfy.co/guide/incidents) and the previous incident reports for more on how to write the Markdown.

Then to deploy the new report,

```sh
git add content
git commit -m "Add incident report"
git push
```

The CI will generate the status page and publish it on Github Pages at https://status.stenci.la. You can check the status of the CI build themselves here: [![Build Status](https://dev.azure.com/stencila/stencila/_apis/build/status/stencila.gaia?branchName=master)](https://dev.azure.com/stencila/stencila/_build/latest?definitionId=7&branchName=master).

If you want to bypass the CI (you're in a hurry, or it's broken), you can just do:

```sh
npm run publish
```

Use `npm run dev` if you wish to preview any changes before publishing.

## ⏲️ Update an incident report

Either edit the existing Markdown file for the incident located in [`content`](content), or run,

```sh
npm run update-incident
```

Then to deploy the update,

```sh
git commit -m "Update incident report on..."
git push
```

## 🙏 Acknowledgments

Thanks to the developers of [Statusfy](https://statusfy.co/) which powers this status page.
