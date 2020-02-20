import React, { useState } from "react";
import DatePickerITF from "./DatePicker";

import './example.scss';

const DatePickerExample = (props: {
  initialStartDate?: Date;
  initialEndDate?: Date;
}) => {
  const { initialStartDate, initialEndDate } = props;
  const [startDate, setStartDate] = useState<Date | null>(
    initialStartDate ? initialStartDate : null
  );
  const [endDate, setEndDate] = useState<Date | null>(
    initialEndDate ? initialEndDate : null
  );

  // consider clear dates button

  return (
    <>
      <button
        className="btn btn--eg"
        onClick={() => {
          setStartDate(null);
          setEndDate(null);
        }}
      >
        Clear Dates
      </button>
      <DatePickerITF
        startDate={startDate}
        endDate={endDate}
        onDateChange={(startDate, endDate) => {
          setStartDate(startDate);
          setEndDate(endDate);
        }}
      />
    </>
  );
};

export default DatePickerExample;
