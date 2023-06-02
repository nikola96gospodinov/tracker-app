import { kebabCase } from 'lodash'

export const capitalizeFirstLetter = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1)

export const removeLastCharacter = (str: string) =>
    str.substring(0, str.length - 1)

interface GetUrlPathProps {
    name: string
    paths?: string[]
}

export const getUrlPath = ({ name, paths }: GetUrlPathProps): string => {
    let urlPath = kebabCase(name)

    let i = 0
    while (paths?.includes(urlPath)) {
        if (i === 0) urlPath = `${kebabCase(name)}-2`
        else urlPath = `${kebabCase(name)}-${i + 2}`
        i++
    }

    return urlPath
}
