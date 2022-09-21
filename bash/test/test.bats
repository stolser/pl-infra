# This setup function will be called before each individual test in the file.
# Each file can only define one setup function for all tests in the file.
# However, the setup functions can differ between different files.
setup() {
    load 'bats_helper/bats-support/load'
    load 'bats_helper/bats-assert/load'
    load 'bats_helper/bats-file/load'

    # get the containing directory of this file
    # use $BATS_TEST_FILENAME instead of ${BASH_SOURCE[0]} or $0,
    # as those will point to the bats executable's location or the preprocessed file respectively
    DIR="$( cd "$( dirname "$BATS_TEST_FILENAME" )" >/dev/null 2>&1 && pwd )"
    # make executables in src/ visible to PATH
    PATH="$DIR/../src:$PATH"
}

@test "file project.sh should exist" {
  assert_exists ./bash/src/project.sh
}

@test "file project.sh can be run successfully" {
    # As we added src/ to $PATH, we can omit the relative path to `src/project.sh`
    run project.sh
    assert_output 'Success!!!'
}
