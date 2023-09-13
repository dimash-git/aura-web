import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FormField } from "@/types";
import DateInput from "./DateInput";
import ErrorText from "../ErrorText";
import { stringify, getCurrentYear } from "./utils";
import { IDate, getDateAsString } from "@/services/date";

export function DatePicker(
  props: FormField<Date | IDate | string>
): JSX.Element {
  const { t } = useTranslation();
  const { name, value, inputClassName, onValid, onInvalid } = props;
  const date = getDateAsString(value);
  const [initYear, initMonth, initDay] = date.split("-");
  const [year, setYear] = useState(initYear);
  const [month, setMonth] = useState(initMonth);
  const [day, setDay] = useState(initDay);
  const [hasError, setHasError] = useState(false);
  const isValid = (value: string) => {
    const date = new Date(value);
    const isCorrectDate = stringify(date) === value;
    const isNotFutureDate = date.getTime() <= Date.now();
    const isNotMinDate = date.getFullYear() >= getCurrentYear() - 200;
    return isCorrectDate && isNotFutureDate && isNotMinDate;
  };

  useEffect(() => {
    if (year && month && day) {
      const currentValue = `${year}-${month}-${day}`;
      setHasError(!isValid(currentValue));
      isValid(currentValue) ? onValid(currentValue) : onInvalid();
    } else {
      setHasError(false);
      onValid("");
    }
  }, [year, month, day, hasError, onValid, onInvalid]);

  return (
    <form name={name} className="date-picker">
      <div className="date-picker__container">
        <DateInput
          name="year"
          value={year ? String(parseInt(year, 10)) : ""}
          max={getCurrentYear()}
          maxLength={4}
          label={t("year")}
          placeholder="YYYY"
          inputClassName={inputClassName}
          onChange={(year: string) => setYear(year)}
        />
        <DateInput
          name="month"
          value={month}
          max={12}
          maxLength={2}
          label={t("month")}
          placeholder="MM"
          inputClassName={inputClassName}
          onChange={(month: string) => setMonth(month)}
        />
        <DateInput
          name="day"
          value={day}
          max={31}
          maxLength={2}
          label={t("day")}
          placeholder="DD"
          inputClassName={inputClassName}
          onChange={(day: string) => setDay(day)}
        />
      </div>
      <ErrorText isShown={hasError} message={t("invalid_date")} />
    </form>
  );
}
