import {
    Stack,
    RadioGroup as ChakraRadioGroup,
    FormControl,
    FormLabel,
    Radio
} from '@chakra-ui/react'

interface Option {
    value: string
    label: string
}

export const RadioGroup: React.FunctionComponent<{
    options: Option[]
    currentValue: string
    name: string
    onChange: (val: string) => void
    description?: string
}> = ({ description, options, currentValue, name, onChange }) => {
    return (
        <FormControl>
            {description && <FormLabel mb={1}>{description}</FormLabel>}
            <ChakraRadioGroup
                name={name}
                onChange={onChange}
                value={currentValue}
            >
                <Stack direction='row' gap={2}>
                    {options.map(({ value, label }) => (
                        <Radio key={value} value={value} colorScheme='purple'>
                            {label}
                        </Radio>
                    ))}
                </Stack>
            </ChakraRadioGroup>
        </FormControl>
    )
}
