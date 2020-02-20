import React, { useState, createContext, useContext, useRef } from "react";
import Dropdown from "../Dropdown/Dropdown";
import {
  dayLabels,
  getDaysInMonth,
  getFirstDayOfMonth,
  yearSelectionOpts,
  datesAreOnSameDay,
  isDateInRange
} from "../helpers";
import "./index.scss";
import { useOutsideAlerter } from "../helpers/useOutsideAlerter";
import { TransitionGroup, CSSTransition } from "react-transition-group";

interface DatePickerContext {
  activeInput: "START" | "END" | null;
  startDate: Date | null;
  endDate: Date | null;
  viewedMonth: number;
  viewedYear: number;
  isTransitionDisabled: Boolean;
}

interface DatePickerInputAreaProps {
  activeInput: "START" | "END" | null;
  setActiveInput: (value: "START" | "END" | null) => void;
  startDate: Date | null;
  endDate: Date | null;
  disabled?: boolean;
}

const DatePickerInputArea = (props: DatePickerInputAreaProps) => {
  const { activeInput, setActiveInput, startDate, endDate, disabled } = props;

  return (
    <div className="datepicker-itf__input-area">
      <div
        className={`datepicker-itf__input-wrapper
        ${
          activeInput === "START" ? "datepicker-itf__input-wrapper--active" : ""
        }
        ${disabled ? "datepicker-itf__input-wrapper--disabled" : ""}
        `}
      >
        <input
          className={`
            datepicker-itf__input datepicker-itf__input--start
          `}
          type="text"
          value={startDate ? startDate.toLocaleDateString("en-GB") : ""}
          onFocus={() => {
            setActiveInput("START");
          }}
          placeholder="Date from"
          readOnly
          disabled={disabled}
        />
      </div>
      <div
        className={`datepicker-itf__input-wrapper
          ${
            activeInput === "END" ? "datepicker-itf__input-wrapper--active" : ""
          }
          ${disabled ? "datepicker-itf__input-wrapper--disabled" : ""}
        `}
      >
        <input
          className={`
            datepicker-itf__input datepicker-itf__input--end
          `}
          value={endDate ? endDate.toLocaleDateString("en-GB") : ""}
          onFocus={() => {
            setActiveInput("END");
          }}
          type="text"
          placeholder="Date to"
          readOnly
          disabled={disabled}
        />
      </div>
    </div>
  );
};

interface DatePickerSwitcherProps {
  currentYear: number;
  viewedYear: number;
  viewedMonth: number;
  setSelectedYear: (year: number) => void;
  setSelectedMonth: (year: number) => void;
  setTransitionType: (type: "SLIDE-RIGHT" | "SLIDE-LEFT") => void;
  setIsTransitionDisabled: (isDisabled: boolean) => void;
}

const DatePickerSwitcher = (props: DatePickerSwitcherProps) => {
  const {
    viewedMonth,
    setSelectedMonth,
    setSelectedYear,
    viewedYear,
    setTransitionType,
    setIsTransitionDisabled,
    currentYear
  } = props;

  const { isTransitionDisabled } = useContext(DatePickerContext);

  return (
    <div className="datepicker-itf__switcher">
      <button
        onClick={() => {
          if (!isTransitionDisabled) {
            setIsTransitionDisabled(true);
            setTransitionType("SLIDE-LEFT");
            if (viewedMonth - 1 > 0) {
              setSelectedMonth(viewedMonth - 1);
            } else {
              setSelectedMonth(12);
              setSelectedYear(viewedYear - 1);
            }
          }
        }}
        className="datepicker-itf__month-switcher datepicker-itf__month-switcher--previous"
      >
        left
      </button>
      <DatePickerYears
        viewedMonth={viewedMonth}
        setSelectedYear={setSelectedYear}
        currentYear={currentYear}
        viewedYear={viewedYear}
      />
      <button
        onClick={() => {
          if (!isTransitionDisabled) {
            setIsTransitionDisabled(true);
            setTransitionType("SLIDE-RIGHT");
            if (viewedMonth + 1 <= 12) {
              setSelectedMonth(viewedMonth + 1);
            } else {
              setSelectedMonth(1);
              setSelectedYear(viewedYear + 1);
            }
          }
        }}
        className="datepicker-itf__month-switcher datepicker-itf__month-switcher--next"
      >
        right
      </button>
    </div>
  );
};

interface DatePickerYearsProps {
  currentYear: number;
  viewedYear: number;
  viewedMonth: number;
  setSelectedYear: (year: number) => void;
}

const DatePickerYears = (props: DatePickerYearsProps) => {
  const { currentYear, viewedYear, setSelectedYear, viewedMonth } = props;
  const options = yearSelectionOpts(currentYear, viewedMonth, viewedYear);
  const selectedValue = options.filter(option => {
    return option.value === viewedYear;
  })[0];

  return (
    <div className="datepicker-itf__years">
      <Dropdown
        options={options}
        onChange={value => {
          setSelectedYear(value.value as number);
        }}
        value={selectedValue}
      />
    </div>
  );
};

interface DatePickerDateProps {
  dateOfMonth: number;
  outsideMonth?: boolean;
  setActiveInput: (value: "START" | "END" | null) => void;
  onDateChange: (startDate: Date | null, endDate: Date | null) => void;
}

const DatePickerDate = (props: DatePickerDateProps) => {
  const { dateOfMonth, outsideMonth, setActiveInput, onDateChange } = props;
  const {
    activeInput,
    viewedMonth,
    viewedYear,
    startDate,
    endDate
  } = useContext(DatePickerContext);

  let isStartDate = false;
  let isEndDate = false;
  let isBetweenStartAndEndDate = false;
  let isDisabled = false;
  let thisDate = new Date(viewedYear, viewedMonth - 1, dateOfMonth);

  if (outsideMonth && outsideMonth) {
    isDisabled = true;
  }

  // if a start date is selected
  // and we're setting an end date
  // and this date is in the past
  if (startDate && activeInput === "END" && thisDate < startDate) {
    isDisabled = true;
  }

  if (startDate && !outsideMonth) {
    isStartDate = datesAreOnSameDay(startDate, thisDate);
  }

  if (endDate && !outsideMonth) {
    isEndDate = datesAreOnSameDay(endDate, thisDate);
  }

  if (startDate && endDate && !outsideMonth) {
    isBetweenStartAndEndDate = isDateInRange(thisDate, startDate, endDate);
  }

  return (
    <div
      className={`datepicker-itf__date ${
        outsideMonth ? "datepicker-itf__date--outside-month" : ""
      } ${isStartDate ? "datepicker-itf__date--start-date" : ""}
       ${isEndDate ? "datepicker-itf__date--end-date" : ""}
       ${isBetweenStartAndEndDate ? "datepicker-itf__date--range-date" : ""}
       ${isDisabled ? "datepicker-itf__date--disabled" : ""}
      `}
    >
      <button
        disabled={isDisabled}
        onClick={() => {
          if (!outsideMonth) {
            if (activeInput === "START") {
              onDateChange(thisDate, endDate);
              setActiveInput("END");
            } else if (activeInput === "END") {
              onDateChange(startDate, thisDate);
              setActiveInput(null);
            }
          }
        }}
      >
        {dateOfMonth}
      </button>
    </div>
  );
};

interface DatePickerDatesProps {
  noOfDays: number;
  noOfDaysPrevMonth: number;
  firstDayOfMonth: number;
  setActiveInput: (value: "START" | "END" | null) => void;
  onDateChange: (startDate: Date | null, endDate: Date | null) => void;
}

const DatePickerDates = (props: DatePickerDatesProps) => {
  const {
    noOfDays,
    firstDayOfMonth,
    noOfDaysPrevMonth,
    setActiveInput,
    onDateChange
  } = props;
  const previousMonthDays = [];
  const inMonthDays = [];
  const nextMonthDays = [];
  let numberOfDatesShowing = 42;

  // add in days for prev month
  for (let i = 1; i <= firstDayOfMonth; i++) {
    previousMonthDays.push(
      <DatePickerDate
        dateOfMonth={noOfDaysPrevMonth - i + 1}
        outsideMonth
        key={i + "a"}
        setActiveInput={setActiveInput}
        onDateChange={onDateChange}
      />
    );
  }

  // add in days for this month
  for (let i = 1; i <= noOfDays; i++) {
    inMonthDays.push(
      <DatePickerDate
        dateOfMonth={i}
        setActiveInput={setActiveInput}
        key={i + "b"}
        onDateChange={onDateChange}
      />
    );
  }

  // add in days for next month
  for (let i = 1; i <= numberOfDatesShowing - firstDayOfMonth - noOfDays; i++) {
    nextMonthDays.push(
      <DatePickerDate
        dateOfMonth={i}
        outsideMonth
        setActiveInput={setActiveInput}
        key={i + "c"}
        onDateChange={onDateChange}
      />
    );
  }

  return (
    <div className="datepicker-itf__dates">
      {previousMonthDays.reverse()}
      {inMonthDays}
      {nextMonthDays}
    </div>
  );
};

interface DatePickerITFProps {
  disabled?: boolean;
  startDate: Date | null;
  endDate: Date | null;
  onDateChange: (startDate: Date | null, endDate: Date | null) => void;
  bemModifier?: string;
  elementId?: string;
}

const DatePickerITF = (props: DatePickerITFProps) => {
  const {
    bemModifier,
    disabled,
    onDateChange,
    startDate,
    endDate,
    elementId
  } = props;
  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();

  const datepickerRef = useRef(null);

  const [viewedMonth, setSelectedMonth] = useState<number>(currentMonth);
  const [viewedYear, setSelectedYear] = useState(currentYear);
  const [activeInput, setActiveInput] = useState<"START" | "END" | null>(null);
  const [transitionType, setTransitionType] = useState<
    "SLIDE-LEFT" | "SLIDE-RIGHT"
  >();
  const [isTransitionDisabled, setIsTransitionDisabled] = useState(false);

  const noOfDays = getDaysInMonth(viewedYear, viewedMonth);
  const firstDayOfMonth = getFirstDayOfMonth(viewedYear, viewedMonth);
  let noOfDaysPrevMonth;

  if (viewedMonth !== 0) {
    noOfDaysPrevMonth = getDaysInMonth(viewedYear, viewedMonth - 1);
  } else {
    noOfDaysPrevMonth = getDaysInMonth(viewedYear - 1, 11);
  }

  // global props
  const context = {
    activeInput,
    startDate,
    endDate,
    viewedMonth,
    viewedYear,
    isTransitionDisabled
  };

  useOutsideAlerter({
    ref: datepickerRef,
    condition: true,
    callback: () => {
      setActiveInput(null);
    },
    includeEscKey: true
  });

  return (
    <DatePickerContext.Provider value={context}>
      <div
        className={`datepicker-itf ${
          bemModifier ? `datepicker-itf--${bemModifier}` : ""
        }`}
        id={elementId ? elementId : undefined}
      >
        <DatePickerInputArea
          activeInput={activeInput}
          setActiveInput={setActiveInput}
          startDate={startDate}
          endDate={endDate}
          disabled={disabled}
        />
        {activeInput ? (
          <div ref={datepickerRef} className="datepicker-itf__selector">
            <div className="datepicker-itf__input-label">
              Select {activeInput === "START" ? "a start date" : "an end date"}
            </div>
            <DatePickerSwitcher
              setSelectedMonth={setSelectedMonth}
              setSelectedYear={setSelectedYear}
              setTransitionType={setTransitionType}
              setIsTransitionDisabled={setIsTransitionDisabled}
              currentYear={currentYear}
              viewedMonth={viewedMonth}
              viewedYear={viewedYear}
            />
            <div className="datepicker-itf__days">
              <div className="datepicker-itf__day-labels">
                {dayLabels.map(day => {
                  return (
                    <span className="datepicker-itf__day-label" key={day}>
                      {day}
                    </span>
                  );
                })}
              </div>
            </div>
            <TransitionGroup
              className={`datepicker-itf__transition--dates ${
                transitionType
                  ? `datepicker-itf__transition--dates-${transitionType}`
                  : ""
              }`}
            >
              <CSSTransition
                timeout={300}
                key={`${viewedMonth}-${viewedYear}`}
                onExited={() => {
                  setIsTransitionDisabled(false);
                }}
              >
                <DatePickerDates
                  noOfDays={noOfDays}
                  firstDayOfMonth={firstDayOfMonth}
                  noOfDaysPrevMonth={noOfDaysPrevMonth}
                  setActiveInput={setActiveInput}
                  onDateChange={onDateChange}
                />
              </CSSTransition>
            </TransitionGroup>
            <div className="datepicker-itf__clear-dates">
              <button
                onClick={() => {
                  onDateChange(null, null);
                  setActiveInput("START");
                }}
                className="btn btn--text"
              >
                Clear dates
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </DatePickerContext.Provider>
  );
};

const DatePickerContext = createContext<DatePickerContext>({
  activeInput: null,
  startDate: null,
  endDate: null,
  viewedMonth: 0,
  viewedYear: 0,
  isTransitionDisabled: false
});

export default DatePickerITF;
