export function compare(word, guess) {
    let matches = 0;
    const letterCount = {};
    for (let letter of word.toLowerCase()) {
        letterCount[letter] = letterCount[letter] + 1 || 1;
    }
    for (let letter of guess.toLowerCase()) {
        if (letterCount[letter]) {
            letterCount[letter] -= 1;
            matches += 1;
        }
    }
    return matches;
}