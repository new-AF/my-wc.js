/*
solution wc (word count) 
Abdullah Fatota
*/

const fs = require("fs");

const log = console.log;
/*
0 - node executable
1 - current file
2 - ... optional command line arguments
last - optional file name
*/
const args = process.argv;
const argsLength = args.length;
let userOptions;
let fileName;
let text;
let buffer;
const formatter = new Intl.NumberFormat();
const SPACE = " ";
const OPTIONS = {
    byte: "-c",
    line: "-l",
    word: "-w",
    "multi-byte": "-m",
    debug: "-debug",
    help: "-help",
};
const OK_EXIT = 0;
const ERROR_EXIT = 1;

function exit(status) {
    process.exit(status);
}

function formatNumber(val) {
    return formatter.format(val);
}

function enclose(str) {
    return '"' + str + '"';
}

function printHelp() {
    const [program, script] = args;

    log(`*** help ***

Usage:

${program.includes(SPACE) ? enclose(program) : program} ${
        script.includes(SPACE) ? enclose(script) : script
    }       NON_MANDATORY_OPTIONS       FILE

NON_MANDATORY_OPTIONS, one or more of following:
${OPTIONS["byte"]}      to output number of bytes in FILE
${OPTIONS["line"]}      to output number of lines in FILE
${OPTIONS["word"]}      to output number of words in FILE
${OPTIONS["multi-byte"]}      to outputs number of \\u0000-\\uFFFF
        unicode characters in FILE
${OPTIONS["debug"]}  to outuput developmmnt debug information
${OPTIONS["help"]}   to print this help information

FILE, can be either

        a local file name or,
        a full file path

== end of help ==
`);
}

function printDebug() {
    log(`*** debug information ***`);
    log({
        args,
        userOptions,
        fileName,
        "buffer instanceof Buffer": buffer instanceof Buffer,
    });
    log(`
== end of debug information ==
    `);
}

/* parse cli arguments */

/* system error */
if (argsLength < 2) {
    log(`System Error related to handling command line arguments,
length of arguments should be at least 2,
however currnet arguments length is {argsLength},
process.argv = {args}`);
    exit(ERROR_EXIT);
}

log();
log("My wc (word count among other things) utility");
log("by Abdullah Fatota - 2023");
log();

/* no file name */
if (argsLength === 2) {
    printHelp();
    exit(ERROR_EXIT);
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

/* get byte count */
function getByteCount() {
    initBuffer();
    return buffer.length;
}

/* get line count */
function getLineCount() {
    initText();

    const matches = text.match(/\n/g);
    /* matches.length + 1 ? */
    return matches === null ? 0 : matches.length;
}

/* get word count */
function getWordCount() {
    initText();

    /* any sequence of non-whitespace characters */
    const matches = text.match(/\S+/g);
    return matches === null ? 0 : matches.length;
}

/* get multi-byte characters */
function getMultibyteCharacterCount() {
    initText();

    /* (not all) multibyte characters */
    const matches = text.match(/[\u0000-\uffff]/g);
    return matches === null ? 0 : matches.length;
}

/* file name available; but empty userOptions */
if (argsLength === 3) {
    /* last argument is the file name */
    fileName = args.at(-1);
    userOptions = [
        OPTIONS.help,
        OPTIONS.debug,
        OPTIONS.byte,
        OPTIONS.line,
        OPTIONS.word,
        OPTIONS["multi-byte"],
    ];
} else if (argsLength >= 4) {
    /* 3rd to (last - 1) elements are OPTIONS
    last is file name */

    fileName = args.at(-1);
    userOptions = args.slice(2, -1);

    /* convert all user userOptions to lower case */
    userOptions = userOptions.map((str) => str.toLowerCase());

    /* ignore whitespace sequences */
    userOptions = userOptions.filter((str) => /\s+/.test(str) === false);
}

/* start printing stuff per userOptions */

/* print help */
if (userOptions.includes("-help")) {
    printHelp();
}

/* print debug info */
if (userOptions.includes("-debug")) {
    userOptions = userOptions.concat([
        OPTIONS.byte,
        OPTIONS.line,
        OPTIONS.word,
        OPTIONS["multi-byte"],
    ]);
    printDebug();
}

/* print file name */
if (
    userOptions.includes(OPTIONS.byte) ||
    userOptions.includes(OPTIONS.line) ||
    userOptions.includes(OPTIONS.word) ||
    userOptions.includes(OPTIONS["multi-byte"])
) {
    log(
        "File target:",
        fileName.includes(SPACE) ? enclose(fileName) : fileName
    );
    log();
}

if (userOptions.includes(OPTIONS.byte)) {
    log(`(${OPTIONS.byte}) byte count:`, formatNumber(getByteCount()));
}

if (userOptions.includes(OPTIONS.line)) {
    log(`(${OPTIONS.line}) line count:`, formatNumber(getLineCount()));
}

if (userOptions.includes(OPTIONS.word)) {
    log(`(${OPTIONS.word}) word count:`, formatNumber(getWordCount()));
}

if (userOptions.includes(OPTIONS["multi-byte"])) {
    log(
        `(${OPTIONS["multi-byte"]}) multi-byte characters:`,
        formatNumber(getMultibyteCharacterCount())
    );
}
exit(OK_EXIT);
