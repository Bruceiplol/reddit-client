import moment from "moment";

export const calculateTimeDifference = (epochTimestamp) => {
  const now = moment();
  const date = moment.unix(epochTimestamp);
  const duration = moment.duration(now.diff(date));

  if (duration.asHours() < 1) {
    const minutes = Math.floor(duration.asMinutes());
    return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  } else {
    const hours = Math.floor(duration.asHours());
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  }
}

