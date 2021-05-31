---
title: Slower than normal times for project archiving
date: '2021-05-31T07:55:26.080Z'
severity: degraded-performance
affectedsystems:
  - workers
  - storage
resolved: true
modified: '2021-05-31T08:35:03.130Z'
---
There are slower than normal times, and some failures, when archiving projects during snapshots. We are currently working to fix the issue. There may be partial outages of some services during this time.

<!--- language code: en -->

::: update Resolved | 2021-05-31T08:35:03.130Z

This issue has been resolved. It was related to a failure to mount a cloud storage bucket for snapshot archiving. This issue is reoccurring, for unknown reasons, or causes. We are looking into a longer term fix.

:::
