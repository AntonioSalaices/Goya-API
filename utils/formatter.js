const moment = require('moment-timezone');
const { BASE_TIME_ZONE, DELIVERY_PERIOD_ORDER, GRADE_ORDER } = require('./constants');


module.exports = {
  date(date, formatString = 'D MMMM YYYY') {
    if (!date) return '';
    return moment(date).format(formatString);
  },
  time(rawValue = '00:00:00') {
    const values = rawValue.split(':');
    const [hours, minutes, seconds] = values;

    return {
      hours: parseInt(hours, 10),
      minutes: parseInt(minutes, 10),
      seconds: parseInt(seconds, 10),
    };
  },
  addAccents(searchText = '') {
    let pattern = searchText;

    pattern = pattern.replace(/a/gi, '[aá]');
    pattern = pattern.replace(/e/gi, '[eé]');
    pattern = pattern.replace(/i/gi, '[ií]');
    pattern = pattern.replace(/o/gi, '[oó]');
    pattern = pattern.replace(/u/gi, '[uú]');

    return pattern;
  },
  capitalize(text = '') {
    if (text && !text.length) {
      return text;
    }

    if (text.length === 1) {
      return text.toUpperCase();
    }

    const firstLetter = text.substring(0, 1);
    const remainingText = text.substring(1);
    return `${firstLetter.toUpperCase()}${remainingText.toLowerCase()}`;
  },
  isLeapYear(year) {
    const checkYear = (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)) ? 1 : 0;
    if (!checkYear) { return false; }
    return true;
  },
  monthOfYear: (index = 0) => {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];

    return months[index];
  },
  dateFromDay(year, day) {
    const date = new Date(year, 0); // initialize a date in `year-01-01`
    const dayDate = new Date(date.setDate(day)); // add the number of days
    return moment(dayDate).tz(BASE_TIME_ZONE);
  },
  dateFromWeek(year, week) {
    // eslint-disable-next-line no-mixed-operators
    const currentWeek = (1 + (week - 1) * 7); // 1st of January + 7 days for each week
    const maxDate = new Date(year, 0, currentWeek);
    return moment(maxDate).tz(BASE_TIME_ZONE);
  },
  timeZoneDate(date) {
    const currentDate = new Date(date);
    return moment(currentDate).tz(BASE_TIME_ZONE);
  },
  momentCompare(left, right) {
    const leftDate = moment.utc(left.timeStamp);
    const rightDate = moment.utc(right.timeStamp);
    const diff = leftDate.diff(rightDate);
    return diff > 0;
  },
  setTimeToActive(start) {
    const currentDate = moment().tz('America/Mazatlan');
    const hour = currentDate.hour();
    let time = 0;

    if (hour > start) {
      const nextTime = 24 - hour;
      time = nextTime + start;
    } else {
      time = start - hour;
    }

    const activeTimeOut = 1000 * 60 * 60 * time;

    return {
      getTime: () => activeTimeOut,
      getHours: () => time
    };
  },
  orderDeliveryPeriod(data = []) {
    const items = data || [];
    const orderData = [];

    DELIVERY_PERIOD_ORDER.forEach((it) => {
      const findedItem = items.find((itm) => itm.type === it.type && itm.end === it.order);
      if (findedItem && findedItem.end === it.order) {
        orderData.push(findedItem);
      }
    });
    return orderData;
  },
  orderGrade(data = []) {
    const items = data || [];
    const orderData = [];

    GRADE_ORDER.forEach((it) => {
      const findedItem = items.find((itm) => itm === it);
      if (findedItem) {
        orderData.push(findedItem);
      }
    });
    return orderData;
  }
};
