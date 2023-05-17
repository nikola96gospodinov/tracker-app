import { Td, Flex, Text } from '@chakra-ui/react'
import { FunctionComponent } from 'react'
import { inputStyles } from '../data'
import { Input } from '../../../../../../components/Form/Input'
import { Milestone } from '../../../../goals.types'
import { Dispatch } from '../../../../../../typings'

export const ProgressCell: FunctionComponent<{
    milestone: Milestone
    isActiveMilestone: boolean
    progress: number | undefined
    setProgress: Dispatch<number | undefined>
    target: number | undefined
    setTarget: Dispatch<number | undefined>
}> = ({
    milestone,
    isActiveMilestone,
    progress,
    setProgress,
    target,
    setTarget
}) => {
    const text = (() => {
        if (
            milestone.completed ||
            (milestone.progress &&
                milestone.target &&
                milestone.progress >= milestone.target)
        ) {
            return 'Completed! 🥳'
        }

        if (!milestone.target) return 'N/A'

        if (!milestone.progress && milestone.target)
            return `0 / ${milestone.target}`

        return `${milestone.progress} / ${milestone.target}`
    })()

    return (
        <Td>
            {isActiveMilestone ? (
                <Flex gap={1}>
                    <Input
                        value={progress ?? milestone.progress}
                        type='number'
                        onChange={(e) => {
                            setProgress(e.target.valueAsNumber)
                        }}
                        {...inputStyles}
                        placeholder='Progress'
                    />
                    <Text>/</Text>
                    <Input
                        value={target ?? milestone.target}
                        type='number'
                        onChange={(e) => {
                            setTarget(e.target.valueAsNumber)
                        }}
                        {...inputStyles}
                        placeholder='Target'
                    />
                </Flex>
            ) : (
                <Text>{text}</Text>
            )}
        </Td>
    )
}
