import { FormField } from '@/types'
import { normalize, calculateMaxValue } from './utils'

type DatePartValue = string | undefined

type DateInputProps = Omit<FormField<DatePartValue>, 'onValid' | 'onInvalid'> & {
  max: number
  maxLength: number
  onChange: (part: string) => void
}

function DateInput(props: DateInputProps): JSX.Element {
  const { label, placeholder, name, inputClassName, value = '', max, maxLength, onChange } = props
  const validate = (value: number): boolean => value >= 0 && value <= max
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const datePart = e.target.value ? parseInt(e.target.value, 10) : 0
    if (isNaN(datePart)) return
    if (datePart > calculateMaxValue(maxLength)) return
    if (!validate(datePart)) return
    onChange(datePart > 0 ? normalize(datePart, maxLength) : '')
  }
  return (
    <div className={`date-picker__field ${inputClassName ?? ''}`}>
      <h3 className='date-picker__field-label'>{label}</h3>
      <label className="date-picker__input">
        <input
            name={name}
            type="number"
            placeholder=" "
            maxLength={maxLength}
            value={value}
            onChange={handleChange}
          />
        <p className="date-picker__input-placeholder">{placeholder}</p>
      </label>
    </div>
  )
}

export default DateInput
