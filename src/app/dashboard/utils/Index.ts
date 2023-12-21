import { getDateAsLastDayOfTheMonth } from "../../../lib/utils/date/find-last-day-of-the-month";
import { startdAPPDate } from "../../common/config/date";

// Function to format the 'until' date
export const formatUntilDate = (numberOfMonths: number) => {
  const lastDayOfMonth = getDateAsLastDayOfTheMonth({
    numberOfMonths,
    dateFrom: startdAPPDate,
  });
  return lastDayOfMonth?.toLocaleDateString();
};
