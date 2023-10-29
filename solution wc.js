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
let options;
let fileName;
let text;
let buffer;

function printHelp() {
    console.log(`
My wc whitespace utility

Usage: 

${args[0]} ${args[1]} NON_MANDATORY_OPTIONS FILE

NON_MANDATORY_OPTIONS, one or more of following:

-c      to output number of bytes in FILE
-l      to output number of lines in FILE
-w      to output number of words in FILE
-m      to outputs number of \\u0000-\\uFFFF
        unicode characters in FILE

FILE, can be either

local file name or,
full file path
`);
}

/* open file as binary sequence */
function initBuffer() {
    if (!(buffer === undefined)) {
        return;
    }
    buffer = fs.readFileSync(fileName, null);
}
/* convert buffer to text */
function initText() {
    if (!(text === undefined)) {
        return;
    }
    initBuffer();
    text = buffer.toString("utf8");
}
/*  */
function getByteCount() {
    initBuffer();
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

/* parse cli arguments.
system error */
if (argsLength < 2) {
    console.log(`System Error related to handling command line arguments,
length of arguments should be at least 2,
however currnet arguments length is {argsLength},
process.argv = {args}`);
    process.exit(1);
}
/* no file name */
if (argsLength === 2) {
    printHelp();
    process.exit(0);
}

/* file name available */
if (argsLength === 3) {
    /* the last argument is the file name */
    fileName = args.at(-1);
} else if (argsLength >= 4) {
    /* file name and other options available */
    /* ignore 1st and 2nd arguments;
    3rd - (last - 1) are OPTIONS
    last is file name */

    fileName = args.at(-1);
    options = args.slice(2, -1).map((str) => str.toLowerCase());
}

console.log({
    args,
    options,
    fileName,
    "buffer instanceof Buffer": buffer instanceof Buffer,

    "buffer length": getByteCount(),
    "line count": getLineCount(),
    "word count": getWordCount(),
    "non-byte characters": getMultibyteCharacterCount(),
});
