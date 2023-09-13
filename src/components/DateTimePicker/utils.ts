export const normalize = (value: number | string, max: number): string => {
  return String(value).padStart(max, '0')
}

export const calculateMaxValue = (digits: number): number => {
  return Math.pow(10, digits) - 1;
}

export const getCurrentYear = (): number => {
  return new Date().getFullYear()
}

export const stringify = (value: Date): string => {
  return value.toISOString().split('T')[0]
}

export const isNotTheDate = (date: Date) => {
  return date.toString() === 'Invalid Date'
}

export const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month, 0).getDate();
}

export const format = (hour: string, minute: string, period: string) => {
  const formattedHour = hour === '12' ? (period === 'AM' ? '00' : '12') : (period === 'PM' ? String(Number(hour) + 12) : hour)
  const formattedMinute = normalize(minute, 2)
  return `${formattedHour}:${formattedMinute}`
}

export const parse = (value: string) => {
  const [hourStr, minute] = value.split(':')
  const hour = Number(hourStr)
  const formattedHour = hour === 0 || hour === 12 ? '12' : hour > 12 ? String(hour - 12) : hourStr
  const period = hour < 12 ? 'AM' : 'PM'
  return { hour: formattedHour, minute, period }
}
