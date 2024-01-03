import { z } from 'zod';

export enum SubscriptionTypeEnum {
  DAILY = 'daily',
  MONTHLY = 'monthly',
  BIMONTHLY = 'bi-monthly',
  YEARLY = 'yearly',
  WEEKLY = 'weekly',
}
export const subscriptionTypes: [string, string, string, string, string] = [
  SubscriptionTypeEnum.DAILY,
  SubscriptionTypeEnum.MONTHLY,
  SubscriptionTypeEnum.BIMONTHLY,
  SubscriptionTypeEnum.YEARLY,
  SubscriptionTypeEnum.WEEKLY,
];
