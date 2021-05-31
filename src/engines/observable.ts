export type Subscriber<T> = (value: T) => void;

export class Subscription<T> {
  public constructor(
    private readonly subject: Subject<T>,
    private readonly subscriber: Subscriber<T>
  ) {}

  public next(value: T): void {
    this.subscriber(value);
  }

  public unsubscribe(): void {
    this.subject.subscribers.delete(this);
  }
}

export class Subject<T> {
  public subscribers: Set<Subscription<T>> = new Set();

  public next(value: T): void {
    this.subscribers.forEach((subscriber) => subscriber.next(value));
  }

  public subscribe(subscriber: Subscriber<T>): Subscription<T> {
    const subscription = new Subscription(this, subscriber);
    this.subscribers.add(subscription);
    return subscription;
  }
}

export class BehaviorSubject<T> {
  public subscribers: Set<Subscription<T>> = new Set();

  public constructor(private readonly currentValue: T) {}

  public next(value: T): void {
    this.subscribers.forEach((subscriber) => subscriber.next(value));
  }

  public subscribe(subscriber: Subscriber<T>): Subscription<T> {
    const subscription = new Subscription(this, subscriber);
    subscription.next(this.currentValue);
    this.subscribers.add(subscription);
    return subscription;
  }
}
