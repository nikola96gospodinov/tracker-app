const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

export const formatDateFromString = (date: string): string => {
    const d = new Date(date)
    const fullYear = d.getFullYear()
    const month = months[d.getMonth()]
    const day = d.getDate()
    return `${day} ${month} ${fullYear}`
}