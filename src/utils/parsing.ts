export function getNested(obj: any, ...args: any[]) {
    return args.reduce((obj, level) => obj && obj[level], obj)
}