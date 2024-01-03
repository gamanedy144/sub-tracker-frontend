import { z } from 'zod';
import {
  SubscriptionProvider,
  subscriptionProviderSchema,
} from './SubscriptionProvider';
import {
  SubscriptionTypeEnum,
  subscriptionTypes,
} from '../utils/subscriptionTypeEnum';

export interface Subscription {
  id: number;
  provider: SubscriptionProvider;
  subscriptionName: string;
  duration: number;
  startDate: Date | string;
  endDate: Date | string;
  nextOccurrenceDate: Date | string;
  lastOccurrenceDate: Date | string;
  type: SubscriptionTypeEnum;
}

export type SubscriptionType = z.infer<typeof subscriptionSchema>;

export const subscriptionSchema = z.object({
  title: z.string().min(3),
  provider: subscriptionProviderSchema,
  type: z.enum(subscriptionTypes),
  startDate: z.string(),
  endDate: z.string(),
});
