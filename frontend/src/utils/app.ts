import moment from "moment";

export const enableBodyScroll = () => {
  document.body.style.overflowY = "auto";
};

export const disableBodyScroll = () => {
  document.body.style.overflowY = "hidden";
};

const range = (start: number = 0, end: number) => {
  return new Array(end - start + 1).fill(undefined).map((_, i) => i + start);
};

export const date = {
  getMonthLabels() {
    const items: string[] = [
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
      "December",
    ];
    return items;
  },
  getYearsRange(num: number = 120) {
    const year = moment().year();
    const myRange = range(year - num, year).reverse();
    return myRange;
  },
  getDays(year: number = 2022, month: string | number) {
    const daysInMonth: number = moment().year(year).month(month).daysInMonth();
    const myRange = range(1, daysInMonth);
    return myRange;
  },
};