import { SubscriptionProvider } from './SubscriptionProvider';

export interface Subscription {
  id: number;
  subscriptionProvider: SubscriptionProvider;
  subscriptionName: string;
  duration: number;
  startDate: Date | string;
  endDate: Date | string;
  nextOccurrenceDate: Date | string;
  lastOccurrenceDate: Date | string;
}
