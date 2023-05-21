import { Flex, Text } from '@chakra-ui/react'
import { FunctionComponent } from 'react'

import CheckIcon from '../Icons/CheckIcon'
import DangerIcon from '../Icons/DangerIcon'
import CloseIcon from '../Icons/CloseIcon'

export const Toast: FunctionComponent<{
    type: 'success' | 'error'
    text: string
    onClose?: () => void
}> = ({ type, text, onClose }) => {
    const Icon = type === 'success' ? CheckIcon : DangerIcon
    const lightColor = type === 'success' ? 'green.50' : 'red.50'
    const darkColor = type === 'success' ? 'green.600' : 'red.600'

    return (
        <Flex
            bg={lightColor}
            borderRadius='lg'
            borderLeft='solid'
            borderLeftWidth={6}
            borderColor={darkColor}
            p={4}
            alignItems='center'
            justifyContent='space-between'
            gap={2}
            width='auto'
        >
            <Icon color={darkColor} boxSize={5} />
            <Text>{text}</Text>
            <CloseIcon
                onClick={onClose}
                cursor='pointer'
                color='neutral.700'
                boxSize={5}
                ml={4}
                _hover={{
                    color: 'red.700'
                }}
            />
        </Flex>
    )
}
