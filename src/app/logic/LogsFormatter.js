export default class LogsFormatter {
    input = ''

    constructor(input) {
        this.input = input;
    }

    formatInput = () => {
        const logs = this.input.map((entry, index) => {
            return `-> ~$ (admin) ${index + 1}: Value: ${entry.number} || Magic: ${entry.valid} \n`
        })
        return logs.toString().replace(new RegExp(',', 'g'), '')
    }
}