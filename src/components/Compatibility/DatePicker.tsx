import React, { useEffect, useState } from "react";
import "./DatePicker.css";
import DatePickerItem from "./DatePickerItem";

interface DatePickerProps {
  onDateChange: (selectedDate: Date) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ onDateChange }) => {
  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState<Date>(currentDate);

  const days = Array.from({ length: 31 }, (_, index) => (index + 1).toString());
  const months = Array.from({ length: 12 }, (_, index) =>
    new Date(0, index).toLocaleDateString(undefined, { month: "long" })
  );
  const years = Array.from({ length: 81 }, (_, index) =>
    (currentDate.getFullYear() - 80 + index).toString()
  );

  const handleDaySelect = (day: string) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(parseInt(day));
    setSelectedDate(newDate);
  };

  const handleMonthSelect = (month: string) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(months.indexOf(month));
    setSelectedDate(newDate);
  };

  const handleYearSelect = (year: string) => {
    const newDate = new Date(selectedDate);
    newDate.setFullYear(parseInt(year));
    setSelectedDate(newDate);
  };

  useEffect(() => {
    if (onDateChange) {
      onDateChange(selectedDate); // Call the callback when selectedDate changes
    }
  }, [selectedDate, onDateChange]);

  return (
    <>
      <div className="date-picker-container">
        <DatePickerItem
          data={days}
          selectedValue={selectedDate.getDate().toString()}
          onSelect={handleDaySelect}
          unit="day"
        />
        <DatePickerItem
          data={months}
          selectedValue={new Date(
            0,
            selectedDate.getMonth()
          ).toLocaleDateString(undefined, { month: "long" })}
          onSelect={handleMonthSelect}
          unit="month"
        />
        <DatePickerItem
          data={years}
          selectedValue={selectedDate.getFullYear().toString()}
          onSelect={handleYearSelect}
          unit="year"
        />
      </div>
      <div className="date-picker-selected-date">
        {/* {selectedDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })} */}
      </div>
    </>
  );
};

export default DatePicker;
