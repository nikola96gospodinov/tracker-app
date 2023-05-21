import { FunctionComponent } from 'react'

import ToggleSwitch from '../../components/UIElements/ToggleSwitch'
import { SetProgress } from './SetProgress'

export const UpdateMetrics: FunctionComponent<{
    toggleText: string
    onToggleChange: () => void
    isCompleted: boolean
    target?: number | null
    progress?: number | null
    progressText?: string
    onProgressChange?: (progress: number, target: number) => void
    onClick?: () => void
}> = ({
    toggleText,
    onToggleChange,
    isCompleted,
    target,
    progress,
    progressText,
    onProgressChange,
    onClick
}) => {
    if (!target || target === 1)
        return (
            <ToggleSwitch
                text={toggleText}
                onChange={onToggleChange}
                isChecked={isCompleted}
                size='sm'
            />
        )

    return (
        <SetProgress
            progress={progress}
            target={target}
            onClick={onClick}
            onProgressChange={onProgressChange}
            progressText={progressText}
        />
    )
}
