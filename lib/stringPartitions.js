// adapted from johnLate's answer to "All ways to partition a string"
// https://stackoverflow.com/a/37025846/9453525

// ES6 function generator
function* stringPartitions(str) {
    for (let cutpoints = 0; cutpoints < (1 << (str.length - 1)); cutpoints++) {
        const result = [];
        let lastcut = 0;
        for (let i = 0; i < str.length - 1; i++) {
            if (((1 << i) & cutpoints) !== 0) {
                result.push(str.slice(lastcut, i + 1));
                lastcut = i + 1;
            }
        }
        result.push(str.slice(lastcut));
        yield result;
    }
}

/*
for (var partition of stringPartitions("abcd")) {
    console.log(partition);
}
*/
