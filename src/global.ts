import Vue from 'vue';

declare global {
  interface Window {
    app: Vue;
  }

  interface ObjectConstructor {
    values: (v: object) => Array<any>;
  }


  interface String {
  }

  interface Array<T> {
  }

  interface DateConstructor {
  }
}
