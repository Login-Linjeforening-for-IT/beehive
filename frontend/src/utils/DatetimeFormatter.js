export function getTimeHHmm(datetime) {
  return  datetime.slice(11,16);
}

export function getDayInt(datetime) {
  const day = parseInt(datetime.slice(8,10));

  if (day >= 1 && day <= 31) return day;
  return -1;
}

export function getDayIdxInt(datetime) {
  const date = new Date(datetime);
  return date.getDay();
}

export function getMonthInt(datetime) {
  const month = parseInt(datetime.slice(5,7));

  if (month >= 1 && month <= 12) return month;
  return -1;
}

export function getOffsetDays(datetime) {
  const oneDay = 24 * 60 * 60 * 1000;
  const nowDate = new Date();
  const d = new Date(datetime);

  // set h:m:s:m to 0 in order to compare only date without time
  d.setHours(0, 0, 0, 0);
  nowDate.setHours(0, 0, 0, 0);

  return Math.round(((d.getTime() - nowDate.getTime()) / oneDay));
}

export function showEndTime(datetime) {
  const hh = parseInt(datetime.slice(11,13));
  const mm = parseInt(datetime.slice(14,16));
  const ss = parseInt(datetime.slice(17,19));

  return !(hh === 23 && mm === 59 && ss === 59);
}


