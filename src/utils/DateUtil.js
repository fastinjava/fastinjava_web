var now = new Date(); // 当前日期
var nowDayOfWeek = now.getDay(); // 今天本周的第几天
var nowDay = now.getDate(); // 当前日
var nowMonth = now.getMonth(); // 当前月
var nowYear = now.getYear(); // 当前年
nowYear += nowYear < 2000 ? 1900 : 0;
const format = time => {
  let ymd = "";
  let mouth =
    time.getMonth() + 1 >= 10
      ? time.getMonth() + 1
      : "0" + (time.getMonth() + 1);
  let day = time.getDate() >= 10 ? time.getDate() : "0" + time.getDate();
  ymd += time.getFullYear() + "-"; // 获取年份。
  ymd += mouth + "-"; // 获取月份。
  ymd += day; // 获取日。
  return ymd; // 返回日期。
};
var DateUtil = {
  /***
   * 已知开始时间和结束时间 计算出中间的所有日期
   */
  getAllDate(start, end) {
    let dateArr = [];
    let startArr = start.split("-");
    let endArr = end.split("-");
    let db = new Date();
    db.setUTCFullYear(startArr[0], startArr[1] - 1, startArr[2]);
    let de = new Date();
    de.setUTCFullYear(endArr[0], endArr[1] - 1, endArr[2]);
    let unixDb = db.getTime();
    let unixDe = de.getTime();
    let stamp;
    const oneDay = 24 * 60 * 60 * 1000;
    for (stamp = unixDb; stamp <= unixDe; ) {
      dateArr.push(format(new Date(parseInt(stamp))));
      stamp = stamp + oneDay;
    }
    return dateArr;
  },
  /**
   * 获得当前日期
   *
   * @returns
   */
  getNowDay() {
    return this.formatDate(new Date());
  },
  /**
   * 获得本周的开始时间
   *
   * @returns
   */
  getStartDayOfWeek() {
    var day = nowDayOfWeek || 7;
    return this.formatDate(
      new Date(now.getFullYear(), nowMonth, nowDay + 1 - day)
    );
  },
  /**
   * 获得本周的结束时间
   *
   * @returns
   */
  getEndDayOfWeek() {
    var day = nowDayOfWeek || 7;
    return this.formatDate(
      new Date(now.getFullYear(), nowMonth, nowDay + 7 - day)
    );
  },
  /**
   * 获得本月的开始时间
   *
   * @returns
   */
  getStartDayOfMonth() {
    var monthStartDate = new Date(nowYear, nowMonth, 1);
    return this.formatDate(monthStartDate);
  },
  /**
   * 获得本月的结束时间
   *
   * @returns
   */
  getEndDayOfMonth() {
    var monthEndDate = new Date(nowYear, nowMonth, this.getMonthDays());
    return this.formatDate(monthEndDate);
  },
  /**
   * 获得近几个月开始日期
   *
   * @returns
   */
  getStartDayOfLastMonth(monthNum, isTheDay) {
    let year = nowYear; //获取当前日期的年份
    let month = nowMonth; //获取当前日期的月份
    let day = isTheDay && isTheDay === true ? nowDay : nowDay - 1; //获取当前日期的日
    let days = this.getMonthDays(); //获取当前日期中月的天数
    let year2 = year;
    let month2 = parseInt(month) - monthNum;
    if (month2 <= 0) {
      year2 =
        parseInt(year2) -
        parseInt(month2 / 12 == 0 ? 1 : Math.abs(parseInt(month2 / 12)) + 1);
      month2 = 12 - (Math.abs(month2) % 12);
    }
    let day2 = day;
    let days2 = new Date(year2, month2, 0);
    days2 = days2.getDate();
    if (day2 > days2) {
      day2 = days2;
    }
    if (month2 < 10) {
      month2 = "0" + month2;
    }
    let monthStartDate = new Date(year2, month2, day2);
    return this.formatDate(monthStartDate);
  },
  /**
   * 获得近几个天开始日期
   *
   * @returns
   */
  getStartDayOfLastDay(day) {
    var today = new Date();
    var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
    today.setTime(targetday_milliseconds); //注意，这行是关键代码
    var tYear = today.getFullYear();
    var tMonth = today.getMonth();
    var tDate = today.getDate();
    var monthStartDate = new Date(tYear, tMonth, tDate);
    return this.formatDate(monthStartDate);
  },
  /**
   * 获得本月天数
   *
   * @returns
   */
  getMonthDays() {
    var monthStartDate = new Date(nowYear, nowMonth, 1);
    var monthEndDate = new Date(nowYear, nowMonth + 1, 1);
    var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
    return days;
  },
  /**
   * @param 日期格式化
   * @returns {String}
   */
  formatDate(date) {
    var myyear = date.getFullYear();
    var mymonth = date.getMonth() + 1;
    var myweekday = date.getDate();

    if (mymonth < 10) {
      mymonth = "0" + mymonth;
    }
    if (myweekday < 10) {
      myweekday = "0" + myweekday;
    }
    return myyear + "-" + mymonth + "-" + myweekday;
  }
};

export default {
  DateUtil
};

