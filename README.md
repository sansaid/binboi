# binboi

A bin collection reminder for Reading council.

## Contributing

Binboi is a monorepo that stores its frontend and backend code in two separate directories:

* [frontboi](./frontboi/)
* [backboi](./backboi/)

It's just easier to maintain a monorepo at small scale than create two separate Github repos, so if you want to contribute to either source code, please follow the README in each directory.

The recommended IDE to develop Binboi with is [VS Code](https://code.visualstudio.com/download), since there is a supplied devcontainer with this codebase. The same devcontainer is used for both the frontend and backend code.

## System Design

![binboi system design](./images/system-design.png)