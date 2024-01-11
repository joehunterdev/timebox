import moment from 'moment-timezone';
// import 'moment/locale/es';
// import moment from 'moment-timezone';

const combineDateAndTime = (date, time) => {
  const [hours, minutes] = time.split(':');
  date.setHours(hours);
  date.setMinutes(minutes);
  return format(date, 'yyyy-MM-dd HH:mm');
}

const getDateTime = () => {
  //moment.locale(process.env.APP_LOCALE); // Set the locale
  return moment().tz("Europe/Madrid").format('YYYY-MM-DDTHH:mm');
}
const formatSelectedDate = (dateTime) => {
  return moment(dateTime).format("YYYY-MM-DD")
}

const getHourFromTime = (time) => {
  return moment(time, 'HH:mm').format('HH');
}
// const getHourMinsFromTime = (time) => {
//   return moment(time, 'HH:mm').format('HH:mm');
// }

const getHourMinsFromTime = (time) => {
  //.tz("Europe/Madrid")
  return moment(time, 'YYYY-MM-DDTHH:mm').format('HH:mm');
}

const getDateFromTime = (time) => {
  return moment(time).format('YYYY-MM-DD');
}



function getEndTime(startTime, duration) {
  // Parse the start time using moment
  const start = moment.tz(startTime, "YYYY-MM-DDTHH:mm", "Europe/Madrid");

  // Add the duration to the start time
  const end = start.add(duration, 'minutes');

  // Return the end time as a string in the format "YYYY-MM-DDTHH:mm"
  return end.format("YYYY-MM-DDTHH:mm");
}

//Compare roughly two times
const isSameTime = (date1, date2) => {
  return date1.getHours() === date2.getHours() && date1.getMinutes() === date2.getMinutes();
};

const getNewStartHour = (start, index) => {
  return moment(start).tz("Europe/Madrid").startOf('day').add(index + 8, 'hours').format('YYYY-MM-DDTHH:mm');
}

const calculateNewStartTime = (date, index) => {

  // Create a moment object from the date
  const newStartTime = moment.tz(date, "Europe/Madrid");

  // Set the hour to 8 plus the integer division of the index by 2
  newStartTime.hour(date + Math.floor(index / 2));

  // Set the minute to the remainder of the index divided by 2 times 30
  newStartTime.minute((index % 2) * 30);

  return newStartTime.format('YYYY-MM-DDTHH:mm');

};

export { combineDateAndTime, getDateTime, isSameTime, getNewStartHour, getEndTime, getHourFromTime, calculateNewStartTime, getDateFromTime, getHourMinsFromTime };
