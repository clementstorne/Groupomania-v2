import { DateTime } from "luxon";

export const formatDateTime = (dateTime: Date) => {
  const day = dateTime.getDate();
  const month = dateTime.getMonth();
  const year = dateTime.getFullYear();
  const hour = dateTime.getHours();
  const minute = dateTime.getMinutes();

  return DateTime.fromObject({ day, month, year, hour, minute })
    .setLocale("fr")
    .toFormat("le d LLLL yyyy à T");
};

export const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}${month}${day}`;
};
