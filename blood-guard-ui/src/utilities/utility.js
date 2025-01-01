import moment from "moment/moment";
import { quotes } from "./constants";

// Get the current day of the year
export const getDayOfYear = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
};

// Get the quote for the current day
export const getQuote = () => {
  const dayOfYear = getDayOfYear();
  const quoteIndex = dayOfYear % quotes.length; // Ensures it loops back after the array ends
  const dailyQuote = quotes[quoteIndex];
  return dailyQuote;
};

export const formatCardRangeDates = (start_date, end_date) => {
  const formattedDateRange = `${moment(start_date).format(
    "DD, MMM YY"
  )} to ${moment(end_date).format("DD, MMM YY")}`;
  return formattedDateRange;
};

export const formatAddress = (item) => {
  return `${item?.address_line_one},${item?.address_line_two},${item?.city},${item?.state},${item?.country},zipcode:${item?.zipcode}`;
};

export const prepareCampInit = (source) => {
  const [start_time, end_time] = source.open_timings.split(" - ");

  // Format the start_date and end_date into 'YYYY-MM-DD' format
  const start_date = moment(source.start_date).format("YYYY-MM-DD");
  const end_date = moment(source.end_date).format("YYYY-MM-DD");

  // Combine start_date with start_time and end_date with end_time to get full datetime
  const start_datetime = moment(
    `${start_date} ${start_time}`,
    "YYYY-MM-DD hh:mm A"
  ).format("HH:mm");
  const end_datetime = moment(
    `${end_date} ${end_time}`,
    "YYYY-MM-DD hh:mm A"
  ).format("HH:mm");

  const { open_timings, ...rest } = source;

  const target = {
    ...rest,
    start_date: start_date || "",
    end_date: end_date || "",
    start_time: start_datetime || "",
    end_time: end_datetime || "",
  };

  console.log(target);
  return target;
};

export const getFullName = (item) => {
  return `${item?.first_name || ""} ${item?.last_name || ""}`;
};

export const formatDate = (dateString) => {
  if (!dateString) return '';

    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
        throw new Error('Invalid ISO date string');
    }

    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();

    return `${month}-${day}-${year}`;

}
