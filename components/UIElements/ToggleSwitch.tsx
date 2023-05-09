import { Flex, Switch, SwitchProps, Text } from '@chakra-ui/react'

const ToggleSwitch: React.FunctionComponent<
    {
        text?: string
    } & SwitchProps
> = ({ text, ...args }) => (
    <Flex alignItems='center'>
        <Switch {...args} colorScheme='purple' />
        <Text ml={2}>{text}</Text>
    </Flex>
)

export default ToggleSwitch
