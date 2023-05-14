import { radioAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
    createMultiStyleConfigHelpers(radioAnatomy.keys)

const baseStyle = definePartsStyle({
    control: {
        borderColor: 'neutral.400'
    }
})

export const Radio = defineMultiStyleConfig({ baseStyle })
