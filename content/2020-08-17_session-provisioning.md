---
title: Session Provisioning
date: '2020-08-17T13:44:32.060Z'
severity: major-outage
affectedsystems:
  - us-ce-1
resolved: true
modified: '2020-08-17T21:53:38.463Z'
---
While scaling the Worker pods, an issue with the Kubernetes configuration is preventing Session Jobs from being taken
off the Queue, causing indefinite wait times when attempting to execute a document.

<!--- language code: en -->
