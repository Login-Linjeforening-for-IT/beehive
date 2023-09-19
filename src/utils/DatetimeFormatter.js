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

export function getYear(datetime) {
  const date = new Date(datetime);
  return date.getFullYear();
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


// no need for this with new db 
export function showEndTime(datetime) {
  const hh = parseInt(datetime.slice(11,13));
  const mm = parseInt(datetime.slice(14,16));
  const ss = parseInt(datetime.slice(17,19));

  return !(hh === 23 && mm === 59 && ss === 59);
}

// return example: "Man 15. sep, 15:00"
export function formatDateDT(date, language) {
  const daysOfWeek = {
    en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    no: ['Søn', 'Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lør'],
  };

  const months = {
    en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    no: ['jan', 'feb', 'mar', 'apr', 'mai', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'des'],  };

  const dayOfWeek = daysOfWeek[language][date.getDay()];
  const dayOfMonth = String(date.getDate());
  const month = months[language][date.getMonth()];
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${dayOfWeek} ${dayOfMonth}. ${month}, ${hours}:${minutes}`;
}

// return example: "15:00, Man 15. sep 2023"
export function formatDateTDY(date, language) {
  const daysOfWeek = {
    en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    no: ['Søn', 'Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lør']
  };

  const months = {
    en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    no: ['jan', 'feb', 'mar', 'apr', 'mai', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'des']
  };

  const dayOfWeek = daysOfWeek[language][date.getDay()];
  const dayOfMonth = String(date.getDate());
  const month = months[language][date.getMonth()];
  const year = String(date.getFullYear());
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${hours}:${minutes}, ${dayOfWeek} ${dayOfMonth}. ${month} ${year}`;
}

export function formatDateToDDMMYYYY(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
}

export const getDayName = (datetime,language)  => {

  const daysOfWeek = {
    en: ['Søndag','Mandag','Tirsdag','Onsdag','Torsdag','Fredag','Lørdag'],
    no: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
  };

  const dayExpration = {
    en: ['I dag', 'I morgen', 'I går', ' dager siden'],
    no: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
  };

  const diffDays = getOffsetDays(datetime);
  
	if (diffDays === 0) {
		return dayExpration[language][0];
	} else if (diffDays === 1) {
		return dayExpration[language][1];
	} else if (diffDays === -1) {
		return dayExpration[language][2];
	} else if (diffDays <= -1) {
		return Math.abs(diffDays) + dayExpration[3];
	}

	return daysOfWeek[language][getDayIdxInt(datetime)];
}

