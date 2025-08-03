export const randomId = (prefix: string) => {
    return prefix + "_" + crypto.randomUUID()
}