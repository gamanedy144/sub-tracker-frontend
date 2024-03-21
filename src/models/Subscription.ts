import { z } from 'zod';
import {
  SubscriptionProvider,
  subscriptionProviderSchema,
} from './SubscriptionProvider';
import {
  SubscriptionCategory,
  SubscriptionTypeEnum,
} from '../utils/subscriptionEnums';

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
  price: number;
  category: SubscriptionCategory;
  active: boolean;
}

export type SubscriptionType = z.infer<typeof subscriptionSchema>;

export const subscriptionSchema = z.object({
  subscriptionName: z.string().min(3),
  provider: subscriptionProviderSchema,
  type: z.string().min(1),
  startDate: z.string().min(1),
  endDate: z.string(),
  price: z.number().multipleOf(0.01),
  category: z.string().min(1),
});
