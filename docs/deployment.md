# Deployment

Binboi is deployed using [fly.io](fly.io) on the Hobby Plan.

Deployment is automatically done through a Github Action. The [following documentation](https://fly.io/docs/app-guides/continuous-deployment-with-github-actions/) was used to create the `fly.toml` for each component of Binboi: frontboi and backboi. In case the documentation is updated, the following commands were run in the devcontainer:

```sh
# Login as the power user
flyctl auth login

# Retrieve deployment token - copy output of auth token and paste as Secret in Github: FLY_API_TOKEN
flyctl auth token

# ! The below commands were run for each of the Binboi components: backboi and frontboi

# Create the app in fly.io
flyctl apps create $COMPONENT

# Create the fly.toml for each component - this will be used in the Github Actions
cd $COMPONENT
flyctl config save -a $COMPONENT
```