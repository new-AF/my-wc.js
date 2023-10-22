/* solution wc (word count) */
/* read file */
const fs = require("fs");
// import fs from "fs";
// const text=fs.readFileSync('./te')
/* array
0 - node executable
1 - current file
2 - optional command line arguments
3 - optional file name
*/
const args = process.argv;
const argsLength = args.length;
const [cliOptions, fileName] = [getCliOptions(), getFileName()];

function getCliOptions() {
    if (argsLength <= 3) {
        return "";
    }
    /* 4 elements or more */
    return args[2];
}

function getFileName() {
    switch (argsLength) {
        case 0:
        case 1:
        case 2:
            return "";
        /* 3 elements or more */
        default:
            return args.at(-1);
    }
}

const buffer = fs.readFileSync(fileName, null);

function getByteCount() {
    return buffer.length;
}

console.log(
    { args, cliOptions, fileName, "buffer length": getByteCount() },
    buffer instanceof Buffer
);
