/**
 * getYear 获取指定年份之间的所有年
 * @param {Number} startYear 起始年
 * @param {Number} endYear 结束年
*/
export function getYear (startYear, endYear) {
  let yearArray = [];
  for (let i = startYear; i <= endYear; i++) {
    yearArray.push(String(i));
  }
  return yearArray;
}
/**
 * 获取1年中的月份
 * @param {Number} start 指定从几月开始 默认从1开始
*/
export function getMonth (start = 1) {
  let month = [];
  for (let i = Number(start); i <= 12; i++) {
    month.push(i < 10 ? ('0' + i) : String(i));
  }
  return month;
}
/**
 * getDay 获取指定年月中的天数
 * @param {Number} year 指定年份
 * @param {Number} month 指定月份
 * @param {Number} day 指定从多少天开始默认为1
*/
export function getDay (year, month, day = 1) {
  let dayNum = null;
  let dayArr = [];
  switch (Number(month)) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      dayNum = 31;
      break;
    case 4:
    case 6:
    case 9:
    case 11:
      dayNum = 30;
      break;
    case 2:
      dayNum = ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) ? 29 : 28;
      break;
    default:
      return 0;
  }
  for (let i = day; i <= dayNum; i++) {
    dayArr.push(i < 10 ? ('0' + i) : String(i));
  }
  return dayArr;
}
/**
 * getToday 获取当前日期格式为yyyy-MM-dd
*/
export function getToday () {
  var date = new Date();
  var seperator1 = '-';
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = '0' + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate;
  }
  var currentdate = year + seperator1 + month + seperator1 + strDate;
  return currentdate;
}
