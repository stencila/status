---
title: Stencila Hub is unreachable
date: "2021-05-03T18:40:25.284Z"
severity: major-outage
affectedsystems:
  - manager
  - storage
resolved: true
modified: "2021-05-04T00:51:55.840Z"
---

Attempting to visit Stencila Hub results in a `502 Error`.

<!--- language code: en -->

::: update Monitoring | 2021-05-03T19:16:54.777Z
Incident has been resolved. We're monitoring the system and will shortly update
this entry with a detailed report on the cause of the problem.

:::

::: update Resolved | 2021-05-03T22:51:55.840Z

In order to start up, Stencila Hub depends on a connection to a NFS data storage service.
Due to a lost connection with the data store, the Hub experienced errors triggering a
Kubernetes to automatically restart the `manager` (Hub) service.

However the `storage` service, despite not reporting any errors, was unable to be attached
to the new `manager` pod, and thus prevented `manager` from starting up.

After manually deleting and recreating the the `storage` service instance,
the `manager` service was able to establish a connection and successfully start up again.

:::
