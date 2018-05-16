import Vue from 'vue';

declare global {
  interface Window {
    app: Vue;
  }

  interface ObjectConstructor {
    /**
     * 深度复制对象
     * @param obj 被复制对象
     * @returns {Object} 深度复制对象
     */
    clone<T>(obj: T): T;
    values(obj: any): Array<any>;
  }

  interface StringConstructor {
    IsNullOrWhiteSpece: (v: string) => boolean;
  }

  interface String {
    /**
     * 全部替换
     * @param originStr 原始字符串
     * @param replaceStr 新字符串
     * @returns {String} 替换后字符串
     */
    replaceAll(originStr: string, replaceStr: string): string;
  }

  interface Array<T> {
    /**
     * 移除第一个匹配元素
     * @param element
     */
    remove(element: T): void;
    Select<U>(cb: (element: T) => U): Array<U>;
  }

  interface DateConstructor {
    /**
     * 判断是否日期对象
     * @param obj
     * @returns {boolean}
     */
    isDate(obj: any): boolean;
  }
}
