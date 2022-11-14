# binboi

A bin collection reminder for Reading council.

## Contributing

Binboi is a monorepo that stores its frontend and backend code in two separate directories:

* [frontboi](./frontboi/)
* [backboi](./backboi/)

The directories should be as self-contained as possible, such that it should be easy to pull them out into their own Github repos in the future. For the time being, it's just easier to maintain a monorepo at small scale than create two separate Github repos. If you want to contribute to either source code, please follow the README in each directory. Otherwise, docs are globally maintained in the [`docs`](./docs/) directory.

The recommended IDE to develop Binboi with is [VS Code](https://code.visualstudio.com/download), since there is a supplied devcontainer with this codebase. The same devcontainer is used for developing both the frontend and backend of Binboi.

## Design Decisions

* [Notifications] Decided not to use e-mail since it requires purchasing a domain name, which is more faff than we need right now (especially since the user count will be low). We'll settle for generating an .ics file that people can just import into their calendars annually.
* [Tech stack] React will be used to develop the front end because of familiarity. Svelte would have made the code base smaller and easier to manage state with, but we're not sure how well supported it will be in future (it's not as popular as React at the moment).
* [Tech stack] fly.io will be chosen as the hosting provider. It offers a risk-free hobby tier that's free without needing to provide credit card details (so we won't on the hook for pay-as-you-go spikes)

### Open Questions

_None yet_