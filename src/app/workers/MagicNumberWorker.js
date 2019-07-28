const self = this

export default () => {

    const numbers = []
    const magicNumbers = []
    let range = 0

    self.addEventListener("message", e => {

        if (!e || isNaN(e.data)) return;


        range = Number(e.data);
        for (var number = 1; number < range; number++) {
            numbers.push(isMagicNumber(number));
        }
        postMessage([numbers, magicNumbers]);

        // clear arrays.
        numbers.splice(0, numbers.length)
        magicNumbers.splice(0, magicNumbers.length)
    });


    function isMagicNumber(number) {
        let numbersSet = [1];
        let setSum = 0;
        let middle = number / 2;
        for (let i = 2; i <= middle; i++) {
            if (number % i === 0) {
                if (numbersSet.indexOf(i) === -1) {
                    numbersSet.push(i);
                    setSum += i;
                }
                middle = number / i;
                if (numbersSet.indexOf(middle) === -1) {
                    numbersSet.push(middle);
                    setSum += middle;
                }
            }
        }
        if (setSum > number) {
            numbersSet.sort(function (a, b) { return b - a; });
            if (!isSubsetSum(numbersSet, numbersSet.length, number)) {
                magicNumbers.push(number)
                return {
                    number: number,
                    valid: true
                }
            }
            else {
                return {
                    number: number,
                    valid: false
                }
            }
        } else {
            return {
                number: number,
                valid: false
            }
        }
    }

    function isSubsetSum(set, n, sum) {
        if (sum === 0) { return true; }
        if (n === 0 && sum !== 0) { return false; }
        if (set[n - 1] > sum) { return isSubsetSum(set, n - 1, sum); }
        return isSubsetSum(set, n - 1, sum) ||
            isSubsetSum(set, n - 1, sum - set[n - 1]);
    }
};





