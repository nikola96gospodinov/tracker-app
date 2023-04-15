export const calculateProgressPercentage = (
    current: number,
    total: number
): number => {
    if (current === 0 || total === 0) return 0

    return (current / total) * 100
}
