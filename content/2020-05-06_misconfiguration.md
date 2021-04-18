---
title: Misconfiguration
date: '2020-05-06T06:08:24.873Z'
severity: under-maintenance
affectedsystems:
  - us-nw-1
resolved: true
modified: '2020-05-06T06:45:04.965Z'
---

A misconfiguration in the `router` service is preventing a rollover to v2.21.0. As far as we are aware this is not affecting any services.

<!--- language code: en -->

::: update Resolved | 2020-05-06T06:45:04.965Z
The `router` service has been [rolled back to v2.20.7](https://github.com/stencila/gaia/blob/573fe2ec9a6004dede2180256e1e21d8a89233f7/clusters/us-nw-1/flux/router-deployment.yaml#L72). There was a temporary outage while we resolved this issue. The issue stemmed from the `monitor` service erroring due to a known issue with Prometheus.
We are looking into fixing that, but also ways to avoid the `router` baulking if an upstream service is unavailable as happened in this situation: `
nginx: [emerg] host not found in upstream "monitor" in /etc/nginx/conf.d/default.conf:24`.
:::
