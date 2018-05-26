/**
 *
 * Author: david.deng<david.deng@jcinfotech.com>
 * Date: 2018/5/2
 */
import dayjs from 'dayjs';
import timeago from "timeago.js";

export const dateFormat = timeago(null, "zh_CN");
// 格林威治时间和本地时间之间的时差 (单位:毫秒)
const timeOffset = new Date().getTimezoneOffset() * 60 * 1000;

export default class Filters {
  static sex(sex) {
    return Number(sex) === 1 ? '男' : (Number(sex) === 2 ? '女' : '未知');
  }

  static date_format(date, format = 'YYYY-MM-DD') {
    return dayjs(date).isValid() ? dayjs(date).format(format) : '-';
  }

  /**
   * 时间转提示
   * @author jsonleex <jsonlseex@163.com>
   * @param  {String} str
   * @return {String}
   */
  static time2txt = str => {
    if (!str) return "";
    // 兼容 IOS 保证传入数据格式 YYYY/MM/dd HH:mm:ss
    let date = new Date(str.replace(/-/g, "/"));

    // 时间差 = 当前时间 - date (单位: 毫秒)
    let time = (new Date()).getTime() - date.getTime();

    if (time < 0) {
      return "";
    } else if (time / 3600000 < 24) {
      return "今天";
    } else {
      // const M = (date.getMonth() + 1 + "").padStart(2, "0");
      // const D = (date.getDate() + "").padStart(2, "0");
      //return M + "月" + D;
      return '-';
    }
  }


  static time2tips = date => {
    return dateFormat.format((new Date(date.replace(/-/g, "/")) as any) - timeOffset);
  }
}
