export const toKebabCase = (str: string) =>
    str
        .match(
            /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
        )
        ?.join('-')
        .toLowerCase()

export const capitalizeFirstLetter = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1)

export const removeLastCharacter = (str: string) =>
    str.substring(0, str.length - 1)
