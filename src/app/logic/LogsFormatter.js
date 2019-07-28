export default class LogsFormatter {
    input = ''

    constructor(input) {
        this.input = input;
    }

    formatInput = () => {
        const logs = this.input.map((entry) => {
            return `${entry.number} ==> ${entry.valid} \n`
        })
        return logs.toString().replace(new RegExp(',', 'g'), '')
    }
}