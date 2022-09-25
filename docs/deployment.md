# Deployment

Binboi is deployed using [fly.io](fly.io) on the Hobby Plan.

Deployment is automatically done through a Github Action. The [following documentation](https://fly.io/docs/app-guides/continuous-deployment-with-github-actions/) was used for setup, but in case the documentation is updated, running the following commands in the devcontainer:

```sh
# Login as the power user
flyctl auth login

# Retrieve deployment token - copy output of auth token and paste as Secret in Github: FLY_API_TOKEN
flyctl auth token

# Create the app in fly.io
flyctl apps create binboi

# Create the fly.toml that will be used in the deployment Action
flyctl config save -a binboi
```