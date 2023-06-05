import { Flex, Text } from '@chakra-ui/react'
import { FunctionComponent } from 'react'

import AddIcon from '../Icons/AddIcon'
import CloseIcon from '../Icons/CloseIcon'

export const Tag: FunctionComponent<{
    text: string
    isDisabled?: boolean
    isActive?: boolean
    onClick?: () => void
}> = ({ text, isDisabled = false, isActive, onClick }) => {
    const Icon = () => {
        if (isDisabled) return <></>
        if (isActive)
            return (
                <CloseIcon
                    _hover={{
                        color: 'red.700'
                    }}
                />
            )
        return (
            <AddIcon
                _hover={{
                    color: 'green.700'
                }}
            />
        )
    }

    return (
        <Flex
            align='center'
            justify='space-between'
            gap={2}
            bg={isDisabled ? 'neutral.50' : 'white'}
            color={isDisabled ? 'neutral.600' : 'neutral.900'}
            py={0.5}
            px={3}
            borderRadius={20}
            boxShadow='inset'
            cursor={isDisabled ? 'not-allowed' : 'pointer'}
            onClick={onClick}
            _hover={{
                bg: isActive ? 'red.50' : 'green.50'
            }}
        >
            <Text>{text}</Text>
            <Icon />
        </Flex>
    )
}
