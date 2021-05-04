import {Subscription} from 'rxjs';

export class SubSet {
  subs: Array<Subscription>;
  set add(sub: Subscription) {
    this.subs.push(sub);
  }

  constructor() {
    this.subs = [];
  }

  unsubscribe() {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
