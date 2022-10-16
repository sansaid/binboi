# binboi

A bin collection reminder for Reading council.

## Contributing

Binboi is a monorepo that stores its frontend and backend code in two separate directories:

* [frontboi](./frontboi/)
* [backboi](./backboi/)

The directories should be as self-contained as possible, such that it should be easy to pull them out into their own Github repos in the future. For the time being, it's just easier to maintain a monorepo at small scale than create two separate Github repos. If you want to contribute to either source code, please follow the README in each directory. Otherwise, docs are globally maintained in the [`docs`](./docs/) directory.

The recommended IDE to develop Binboi with is [VS Code](https://code.visualstudio.com/download), since there is a supplied devcontainer with this codebase. The same devcontainer is used for developing both the frontend and backend of Binboi.

## System Design

![binboi system design](./images/system-design.png)

## Design Decisions

* [Notifications] To start, e-mail will be the only notification channel. This is cheap and many cloud messaging platforms offer free/cheap messaging systems for e-mail. PWA was explored, but it looks like push notifications are disable on iOS by default, and it PWA will deprecate push notifications in the future without an active session. Using WhatsApp and SMS early stage with Twillio would have been too costly for a service we intend to run for free.
* [Tech stack] React will be used to develop the front end because of familiarity. Svelte would have made the code base smaller and easier to manage state with, but we're not sure how well supported it will be in future (it's not as popular as React at the moment).
* [Tech stack] fly.io will be chosen as the hosting provider. It offers a risk-free hobby tier that's free without needing to provide credit card details (so we won't on the hook for pay-as-you-go spikes)
* [Tech stack] PostgreSQL will be the persistent store of choice. This is only because it's provided on fly.io for a good deal

### Open Questions

* Most e-mail providers limit free tier to around 300 messages a day. We will not need more than this to start with. Should we opt into the free tier or host our own SMTP server?
    * Hosting our own SMTP server is a faff - it looks like it needs to be stateful (some options:https://geekflare.com/self-hosted-email-server/)
    * We could opt into the free tiers to PoC Binboi