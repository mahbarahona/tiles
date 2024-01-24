export class Subject {
  value: any;
  subscribers = new Set();

  current() {
    return this.value;
  }
  next(new_value: any) {
    this.value = new_value;
    this.subscribers.forEach((cb: any) => cb(this.value));
  }
  subscribe(callback: any) {
    this.subscribers.add(callback);

    const unsubscribe = () => {
      this.subscribers.delete(callback);
    };

    return { unsubscribe };
  }
}
export class BehaviourSubject {
  value: any;
  subscribers = new Set();

  constructor(initial_value: any) {
    this.value = initial_value;
  }

  current() {
    return this.value;
  }
  next(new_value: any) {
    const prev = this.value;
    this.value = new_value;
    this.subscribers.forEach((cb: any) => cb(this.value, prev));
  }
  subscribe(callback: any) {
    this.subscribers.add(callback);
    callback(this.value);
    const unsubscribe = () => {
      this.subscribers.delete(callback);
    };

    return { unsubscribe };
  }
}
