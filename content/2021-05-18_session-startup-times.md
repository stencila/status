---
title: Slow session start up times
date: '2021-05-18T21:30:32.457Z'
severity: degraded-performance
affectedsystems:
  - broker
  - workers
resolved: true
modified: '2021-05-18T23:17:16.732Z'
---
Our monitoring is showing slower than normal start up times for session jobs. We're currently investigating.

<!--- language code: en -->

::: update Resolved | 2021-05-18T23:17:16.732Z

The root cause of this incident was not found. Logs indicated issues with workers connecting to the `broker` service. The broker pod was deleted (using `kubectrl delete pod` which automatically recreates a new one). We also deleted the single `worker` pod running at the time. This resolved the issue and monitoring is showing normal event processing by the `overseer` service.

:::
