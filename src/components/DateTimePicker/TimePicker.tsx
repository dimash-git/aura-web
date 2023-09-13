import { useEffect, useState } from "react"
import { normalize, parse, format } from "./utils"

type TimePickerProps = {
  value: string
  onChange: (value: string) => void
}

export function TimePicker({ value, onChange }: TimePickerProps): JSX.Element {
  const parsedValue = parse(value)
  const [hour, setHour] = useState(parsedValue.hour)
  const [minute, setMinute] = useState(parsedValue.minute)
  const [period, setPeriod] = useState(parsedValue.period)

  useEffect(() => {
    onChange(format(hour, minute, period))
  }, [hour, minute, period, onChange])

  return (
    <div className='date-picker'>
      <div className='date-picker__container'>
        <div className="date-picker__field">
          <select
            className="date-picker__field-select"
            value={hour}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setHour(e.target.value)}>
            {Array.from(Array(12).keys()).map((hour) => (
              <option key={hour} value={hour + 1}>{hour + 1}</option>
            ))}
          </select>
        </div>
        <div className="date-picker__field">
          <select
            className="date-picker__field-select"
            value={minute}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setMinute(e.target.value)}>
            {Array.from(Array(60).keys()).map((minute) => {
              return (
                <option key={minute} value={normalize(minute, 2)}>{normalize(minute, 2)}</option>
              );
            })}
          </select>
        </div>
        <div className="date-picker__field">
          <select
            className="date-picker__field-select"
            value={period}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setPeriod(e.target.value)}>
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </div>
      </div>
    </div>
  )
}
