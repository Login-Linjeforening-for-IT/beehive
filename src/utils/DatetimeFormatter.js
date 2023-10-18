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
export function formatDateDowDT(datetime, lang="no") {
  const now = new Date();
  const d = new Date(datetime);
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const dayOfMonth = String(d.getDate());

  const dayExpration = {
    en: 'Today',
    no: 'I dag'
  };

  if(now.getDate() === d.getDate()) {
    return `${dayExpration[lang]}, ${hours}:${minutes}`;
  }

  const oneWeek = 7 * 24 * 60 * 60 * 1000;
  const daysOfWeek = {
    en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    no: ['Søn', 'Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lør']
  };

  const dayOfWeek = daysOfWeek[lang][d.getDay()];

  // if less than a week dif only display day of week and time
  if((Math.abs(now - d)) < oneWeek) {
    return `${dayOfWeek}, ${hours}:${minutes}`;
  }

  const months = {
    en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    no: ['jan', 'feb', 'mar', 'apr', 'mai', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'des']
  };
  const month = months[lang][d.getMonth()];
  const oneYear = 365 * 24 * 60 * 60 * 1000;

  // if less than a year dif display DoW, DoM and time
  if((Math.abs(now - d)) < oneYear) {

    return `${dayOfWeek} ${dayOfMonth}. ${month}, ${hours}:${minutes}`;
  }

  // more than a year away display year, DoW, DoM and time
  const year = String(d.getFullYear());
  return `${year}, ${dayOfMonth}. ${month}, ${hours}:${minutes}`;
}

// return example: "Man, 15:00"
export function formatDateDowT(datetime, lang="no") {

  const d = new Date(datetime)

  const daysOfWeek = {
    en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    no: ['Søn', 'Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lør'],
  };

  const dayOfWeek = daysOfWeek[lang][d.getDay()];
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');

  const oneYear = 365 * 24 * 60 * 60 * 1000;

  if((Math.abs(new Date() - d)) < oneYear) {
    return `${dayOfWeek}, ${hours}:${minutes}`;
  } else {
    const year = String(d.getFullYear());
    return `${year}, ${dayOfWeek}, ${hours}:${minutes}`;
  }
}

// return example: "15:00, Man 15. sep 2023"
export function formatDateTDowDY(date, lang) {
  const daysOfWeek = {
    en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    no: ['Søn', 'Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lør']
  };

  const months = {
    en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    no: ['jan', 'feb', 'mar', 'apr', 'mai', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'des']
  };

  const dayOfWeek = daysOfWeek[lang][date.getDay()];
  const dayOfMonth = String(date.getDate());
  const month = months[lang][date.getMonth()];
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

export const getDayName = (datetime,lang)  => {

  const daysOfWeek = {
    en: ['Søndag','Mandag','Tirsdag','Onsdag','Torsdag','Fredag','Lørdag'],
    no: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
  };

  const dayExpration = {
    en: ['Today', 'Tomorrow', 'Yesterday', ' days ago'],
    no: ['I dag', 'I morgen', 'I går', ' dager siden']
  };

  const diffDays = getOffsetDays(datetime);
  
	if (diffDays === 0) {
		return dayExpration[lang][0];
	} else if (diffDays === 1) {
		return dayExpration[lang][1];
	} else if (diffDays === -1) {
		return dayExpration[lang][2];
	} else if (diffDays <= -1) {
		return Math.abs(diffDays) + dayExpration[lang][3];
	}

	return daysOfWeek[lang][getDayIdxInt(datetime)];
}


// return example: ""
export function formatPublishedTime(datetime, lang) {
  const now = new Date();
  const publishedTime = new Date(datetime);

  const minutesAgo = Math.floor((now - publishedTime) / (1000 * 60));
  const hoursAgo = Math.floor(minutesAgo / 60);
  const daysAgo = Math.floor(hoursAgo / 24);

  const timeExpration = {
    en: ['minutes ago'],
    no: ['minutter siden']
  };

  const dayExpration = {
    en: ['Today', 'Yesterday'],
    no: ['I dag', 'I går']
  };

  const daysOfWeek = {
    en: ['Sunday', 'Monday', 'Tueday', 'Wednesday', 'Thuday', 'Friday', 'Saturday'],
    no: ['Søndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag']
  };

  const months = {
    en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    no: ['jan', 'feb', 'mar', 'apr', 'mai', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'des']
  };

  if (minutesAgo < 60) {
    return `${minutesAgo} ${timeExpration[lang][0]}`;
  } else if (publishedTime.toDateString() === now.toDateString()) {
    const hours = publishedTime.getHours();
    const minutes = publishedTime.getMinutes();
    return `${dayExpration[lang][0]}, ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  } else if (daysAgo === 1) {
    const hours = publishedTime.getHours();
    const minutes = publishedTime.getMinutes();
    return `${dayExpration[lang][1]}, ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  } else if (daysAgo < 7) {
    const hours = publishedTime.getHours();
    const minutes = publishedTime.getMinutes();
    return `${daysOfWeek[lang][publishedTime.getDay()]}, ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  } else {
    const day = publishedTime.getDate();
    const month = publishedTime.getMonth();
    const year = publishedTime.getFullYear();
    const hours = publishedTime.getHours();
    const minutes = publishedTime.getMinutes();
    return `${day}. ${months[lang][month]}${year !== now.getFullYear() ? `, ${year}` : ''}, ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  }
}