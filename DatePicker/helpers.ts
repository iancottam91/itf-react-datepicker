import { dropdownItem } from "../../static/Dropdown/types";

// get days of the month
export const dayLabels = ["mon", "tue", "wed", "thur", "fri", "sat", "sun"];
export const monthLabels = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec"
];

export const monthLabelsFull = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

// make monday 0, cos that's the first day of the week realisitically
export const getFirstDayOfMonth = (
  selectedYear: number,
  selectedMonth: number
) => {
  let day = new Date(selectedYear, selectedMonth - 1, 1).getDay();
  if (day === 0) {
    return 6;
  } else {
    return day - 1;
  }
};

export const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month, 0).getDate();
};

export const yearSelectionOpts = (
  currentYear: number,
  currentMonth: number,
  selectedYear: number
) => {
  // get current year, go back to 1975
  let year = new Date().getFullYear() + 1;
  let yearSelectionOpts: dropdownItem[] = [];

  while (year > 1975) {
    yearSelectionOpts.push({
      value: currentYear - (currentYear - year),
      label: `${currentYear - (currentYear - year)} - ${
        monthLabelsFull[currentMonth - 1]
      }`,
      disabled: selectedYear === year
    });
    year--;
  }

  return yearSelectionOpts;
};

export const datesAreOnSameDay = (first: Date, second: Date) => {
  return (
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()
  );
};

export const isDateInRange = (date: Date, startDate: Date, endDate: Date) => {
  return startDate < date && date < endDate;
};
