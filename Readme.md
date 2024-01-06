# `my wc.js` - JavaScript CLI version of `wc`

JavaScript CLI / Node solution to [John Crickett's wc CLI Coding Challenge](https://codingchallenges.fyi/challenges/challenge-wc/).

# Screenshot

![screenshot](./screenshot%201.png)

# Worked on

-   [NodeJS](https://nodejs.org/en/download) version `v18.16.0`

# Usage

```
> "C:\Program Files\nodejs\node.exe" "my wc.js" NON_MANDATORY_OPTIONS FILE

NON_MANDATORY_OPTIONS, one or more of following:

        -c      to output number of bytes in FILE
        -l      to output number of lines in FILE
        -w      to output number of words in FILE
        -m      to outputs number of \u0000-\uFFFF
                unicode characters in FILE
        -debug  to outuput developmmnt debug information
        -help   to print this help information

FILE, can be either:

        a local file name or,
        a full file path
```
