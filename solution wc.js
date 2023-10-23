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

let text;

function initText() {
    if (text !== undefined) {
        return;
    }
    text = buffer.toString("utf8");
}

function getByteCount() {
    return buffer.length;
}

function getLineCount() {
    initText();

    const matches = text.match(/\n/g);
    /* matches.length + 1 ? */
    return matches === null ? 0 : matches.length;
}

function getWordCount() {
    initText();

    /* any sequence of non-whitespace characters */
    const matches = text.match(/\S+/g);
    return matches === null ? 0 : matches.length;
}

function getMultibyteCharacterCount() {
    initText();

    /* (not all) multibyte characters */
    const matches = text.match(/[\u0000-\uffff]/g);
    return matches === null ? 0 : matches.length;
}

console.log({
    args,
    cliOptions,
    fileName,
    "buffer instanceof Buffer": buffer instanceof Buffer,
    "buffer length": getByteCount(),
    "line count": getLineCount(),
    "word count": getWordCount(),
    "non-byte characters": getMultibyteCharacterCount(),
});
