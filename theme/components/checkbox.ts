import { checkboxAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
    createMultiStyleConfigHelpers(checkboxAnatomy.keys)

const baseStyle = definePartsStyle({
    control: {
        borderColor: 'purple.500',
        _checked: {
            bg: 'purple.500',
            borderColor: 'purple.500',
            _hover: {
                bg: 'purple.600',
                borderColor: 'purple.600'
            }
        }
    }
})

export const Checkbox = defineMultiStyleConfig({
    baseStyle
})
