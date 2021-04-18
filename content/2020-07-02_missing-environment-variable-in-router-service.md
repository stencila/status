---
title: Missing environment variable in router service
date: '2020-06-06T13:00:00.000Z'
severity: major-outage
affectedsystems:
  - us-nw-1
resolved: true
---

The `router` service failed due to the renaming of an environment variable necessary for the upcoming release of v3.0. This change was inadvertently deployed by our Flux-based continuous deployment. 

Automatic updates should have been turned off prior to the release of this change.
This has now been [done and all images pinned to version v2.32.1](https://github.com/stencila/gaia/commit/b700327c73e3043d7146f6f3048b005daff0f669).

Within the `us-nw-1` cluster we are using Prometheus (deployed as the `monitor` service) for internal monitoring of services. However, `monitor` is not yet set up to monitor the `router` service. We are now using an external site monitoring service (Pingdom) to provide additional monitoring and alerting of https://hub.stenci.la.
