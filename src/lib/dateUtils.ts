import { DateTime } from "luxon";

export function formatDateTime(dateTime: Date) {
  const day = dateTime.getDate();
  const month = dateTime.getMonth();
  const year = dateTime.getFullYear();
  const hour = dateTime.getHours();
  const minute = dateTime.getMinutes();

  return DateTime.fromObject({ day, month, year, hour, minute })
    .setLocale("fr")
    .toFormat("le d LLLL yyyy à T");
}
