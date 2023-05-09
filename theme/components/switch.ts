import { switchAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
    createMultiStyleConfigHelpers(switchAnatomy.keys)

const baseStyle = definePartsStyle({
    track: {
        bg: 'neutral.300',
        _checked: {
            bg: 'purple.500'
        }
    }
})

export const Switch = defineMultiStyleConfig({ baseStyle })
