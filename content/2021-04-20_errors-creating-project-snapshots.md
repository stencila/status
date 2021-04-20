---
title: Errors creating project Snapshots
date: '2021-04-20T14:43:29.191Z'
severity: partial-outage
affectedsystems:
  - workers
resolved: true
modified: '2021-04-20T21:32:36.549Z'
---

<!--- language code: en -->

Creating a project Snapshot fails when attempting to pin the Docker container version.

::: update Resolved | 2021-04-20T21:32:36.549Z
The error stemmed from rotating all API tokens after the recent [CodeCov security incident](https://about.codecov.io/security-update/).
After the tokens were regenerated, some of secrets were not updated in the deployed pods.

This caused the Worker process to attempt to use the outdated Docker credentials when
pinning the project Snapshot, and hence fail.
:::
