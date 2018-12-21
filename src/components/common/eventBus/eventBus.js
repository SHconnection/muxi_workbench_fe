class EventBus {
  constructor() {
    this.events = this.events || Object.create(null);
  }
}
// 首先构造函数需要存储event事件，使用键值对存储
// 然后我们需要发布事件，参数是事件的type和需要传递的参数
EventBus.prototype = {
  emit(type, ...args) {
    const e = this.events[type];
    if (!e) {
      throw new Error("该类型未被订阅");
    }

    // 查看这个type的event有多少个回调函数，如果有多个需要依次调用。
    if (Array.isArray(e)) {
      for (let i = 0; i < e.length; i++) {
        e[i].apply(this, args);
      }
    } else {
      e.apply(this, args);
    }
  },
  // 然后我们需要写监听函数，参数是事件type和触发时需要执行的回调函数
  addListener(type, fun) {
    if (!this.events[type]) {
      this.events[type] = [];
    }

    this.events[type].push(fun);
  }
};

const eventBus = new EventBus();
export default eventBus;
