const BASE62 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

export function parseIntToBase62(number){
        if (number === 0) return "0"
    let str = ""
    while (number > 0) {
        const rem = number % 62
        str = BASE62[rem] + str
        number = Math.floor(number / 62)
    }
    return str

}