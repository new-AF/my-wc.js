/*
solution wc (word count) 
Abdullah Fatota
*/

const fs = require("fs");
/*
0 - node executable
1 - current file
2 - optional command line arguments
3 - optional file name
*/
const log = console.log;
const args = process.argv;
const argsLength = args.length;
let options;
let fileName;
let text;
let buffer;
const SPACE = " ";
const OPTIONS = {
    byte: "-c",
    line: "-l",
    word: "-w",
    "multi-byte": "-m",
    debug: "-debug",
    help: "-help",
};

function enclose(str) {
    return '"' + str + '"';
}

function printHelp() {
    const [program, script] = args;

    log(`*** My wc whitespace utility help ***

Usage:

${program.includes(SPACE) ? enclose(program) : program} ${
        script.includes(SPACE) ? enclose(script) : script
    } NON_MANDATORY_OPTIONS FILE

NON_MANDATORY_OPTIONS, one or more of following:
${OPTIONS["byte"]}      to output number of bytes in FILE
${OPTIONS["line"]}      to output number of lines in FILE
${OPTIONS["word"]}      to output number of words in FILE
${OPTIONS["multi-byte"]}      to outputs number of \\u0000-\\uFFFF
        unicode characters in FILE
${OPTIONS["debug"]}  to outuput developmmnt debug information
${options["help"]}   to print this help information

FILE, can be either

        a local file name or,
        a full file path

2023 Abdullah Fatota

== end of help ==
`);
}

function printDebug() {
    log(`*** debug information ***`);
    log({
        args,
        options,
        fileName,
        "buffer instanceof Buffer": buffer instanceof Buffer,
    });
    log(`
== end of debug information ==
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

/* parse cli arguments */
/* system error */
if (argsLength < 2) {
    log(`System Error related to handling command line arguments,
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

/* file name available; but empty options */
if (argsLength === 3) {
    /* the last argument is the file name */
    fileName = args.at(-1);
    options = [
        OPTIONS.help,
        OPTIONS.debug,
        OPTIONS.byte,
        OPTIONS.line,
        OPTIONS.word,
        OPTIONS["multi-byte"],
    ];
} else if (argsLength >= 4) {
    /* file name and other options available */
    /* ignore 1st and 2nd arguments;
    3rd - (last - 1) are OPTIONS
    last is file name */

    fileName = args.at(-1);
    options = args.slice(2, -1);
}

/* convert all options to lower case */
options = options.map((str) => str.toLowerCase());

if (options.includes("-help")) {
    printHelp();
}

if (options.includes("-debug")) {
    printDebug();
    options = options.concat([
        OPTIONS.byte,
        OPTIONS.line,
        OPTIONS.word,
        OPTIONS["multi-byte"],
    ]);
}

/* print file name */
if (
    options.includes(OPTIONS.byte) ||
    options.includes(OPTIONS.line) ||
    options.includes(OPTIONS.word) ||
    options.includes(OPTIONS["multi-byte"])
) {
    log(fileName.includes(SPACE) ? enclose(fileName) : fileName);
}

if (options.includes(OPTIONS.byte)) {
    log(`(${OPTIONS.byte}) byte count:`, getByteCount());
}

if (options.includes(OPTIONS.line)) {
    log(`(${OPTIONS.line}) line count:`, getLineCount());
}

if (options.includes(OPTIONS.word)) {
    log(`(${OPTIONS.word}) word count:`, getWordCount());
}

if (options.includes(OPTIONS["multi-byte"])) {
    log(
        `(${OPTIONS["multi-byte"]}) multi-byte characters:`,
        getMultibyteCharacterCount()
    );
}
