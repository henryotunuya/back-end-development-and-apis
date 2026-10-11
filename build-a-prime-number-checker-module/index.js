
function isPrime(arg) {
    const nums = [2, 3, 4, 5, 6, 7, 8, 9]
    for (n of nums) {
        if (arg != n) {
            aux = arg % n
            if (aux == 0 || arg == 1) {
                return false
            }
        }
    }
    return true
}

module.exports = { isPrime }