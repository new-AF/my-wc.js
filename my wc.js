/*
solution wc (word count) 
Abdullah Fatota
*/

const fs = require("fs");

const log = console.log;
/*
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
