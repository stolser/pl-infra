# IaC with Pulumi (TypeScript)

## Pulumi docs

https://www.pulumi.com/docs/intro/concepts/

## Local setup and installations

### Bats

1. Install [bats-core](https://bats-core.readthedocs.io/en/stable/installation.html)
into the project and save it in the package.json:
    ```
    npm install --save-dev bats
    ```
2. Install Bats modules (from .gitmodules):
   ```
   git submodule update --init --recursive
   ```
3. [Optional] Install Bats modules manually or add more with `git submodule add`:
   ```
   git submodule add https://github.com/bats-core/bats-support.git bash/test/bats_helper/bats-support
   ```
   ```
   git submodule add https://github.com/bats-core/bats-assert.git bash/test/bats_helper/bats-assert
   ```
   ```
   git submodule add https://github.com/bats-core/bats-file.git bash/test/bats_helper/bats-file
   ```

Run Bats tests from the root:
```
bats bash/test/test.bats
```
