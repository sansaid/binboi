# Debugging

When things go wrong, here is the order in which to check things to get started (this doc is a work in progress and may be substantial):

1. Check the messages in the Github Actions console
2. Check the `flyctl logs`
3. Check for the status of deployments (if recently deployed):
    a. Find the instance ID of the failed deployment: `flyctl status --all`
    b. Check the logs of the failed instance: `flyctl vm status ${INSTANCE_ID}`