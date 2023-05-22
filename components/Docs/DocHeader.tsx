import { Flex, Heading, Button } from '@chakra-ui/react'
import { ChangeEvent, FunctionComponent, ReactNode } from 'react'

import { Option, Select } from '../Form/Select'
import { Dispatch } from '../../typings'

export const DocHeader: FunctionComponent<{
    heading: ReactNode
    filteringOptions: Option[]
    activeOptionValue: string
    setActiveOptionValue: Dispatch<string>
    onClick?: () => void
}> = ({
    heading,
    filteringOptions,
    activeOptionValue,
    setActiveOptionValue,
    onClick
}) => {
    const onSelectionChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setActiveOptionValue(e.target.value)
    }

    return (
        <Flex alignItems='center' justifyContent='space-between' mb={8}>
            <Heading as='h1' fontWeight={600} fontSize='3xl'>
                {heading}
            </Heading>
            <Flex gap={4}>
                <Select
                    options={filteringOptions}
                    activeOptionValue={activeOptionValue}
                    width={40}
                    onChange={onSelectionChange}
                />
                <Button
                    onClick={onClick}
                    fontSize='4xl'
                    color='purple.700'
                    bg='purple.50'
                    borderRadius='lg'
                    boxShadow='inset'
                    p={0}
                    fontWeight={900}
                    _hover={{ bg: 'purple.100', color: 'purple.900' }}
                >
                    +
                </Button>
            </Flex>
        </Flex>
    )
}
