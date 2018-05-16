import {PluginObject} from "vue";

/**
 * 扩展JS原生对象
 * Author: david.deng<david.deng@jcinfotech.com>
 * Date: 2018/5/13
 */
String.IsNullOrWhiteSpece = function (v: string) {
  return v === null || v === undefined || String(v).trim().length === 0;
};

String.prototype.replaceAll = function (s1: string, s2: string) {
  return this.replace(new RegExp(s1, 'gm'), s2);
};

Array.prototype.remove = function (element: any) {
  const index = this.indexOf(element);
  if (index !== -1)
    this.splice(index, 1);
};

Array.prototype.Select = function (cb: Function) {
  let result = [];
  for (let i of this) {
    result.push(cb(i));
  }
  return result;
}
Object.clone = function (obj) {
  let data = JSON.stringify({data: obj});
  return JSON.parse(data).data;
};

Date.isDate = function (obj: any) {
  return obj !== null && (typeof obj === 'object') && obj.constructor === Date;
};

