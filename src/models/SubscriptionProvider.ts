import { z } from 'zod';

export interface SubscriptionProvider {
  id: number;
  name: string;
  details: string;
}

export type SubscriptionProviderType = z.infer<
  typeof subscriptionProviderSchema
>;

export const subscriptionProviderSchema = z.object({
  id: z.number(),
  name: z.string(),
  details: z.string(),
});
