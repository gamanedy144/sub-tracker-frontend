export enum SubscriptionTypeEnum {
  DAILY = 'daily',
  MONTHLY = 'monthly',
  BIMONTHLY = 'bi-monthly',
  YEARLY = 'yearly',
  WEEKLY = 'weekly',
}
export const subscriptionTypes: SubscriptionTypeEnum[] = [
  SubscriptionTypeEnum.DAILY,
  SubscriptionTypeEnum.MONTHLY,
  SubscriptionTypeEnum.BIMONTHLY,
  SubscriptionTypeEnum.YEARLY,
  SubscriptionTypeEnum.WEEKLY,
];
const mapToDisplayText = (value: string): string => {
  switch (value) {
    case SubscriptionTypeEnum.DAILY:
      return 'daily';
    case SubscriptionTypeEnum.MONTHLY:
      return 'monthly';
    case SubscriptionTypeEnum.BIMONTHLY:
      return 'bi-monthly';
    case SubscriptionTypeEnum.YEARLY:
      return 'yearly';
    case SubscriptionTypeEnum.WEEKLY:
      return 'weekly';
    default:
      return '';
  }
};

// Mapping function for backend submission
const mapToBackendValue = (displayText: string): string => {
  return displayText.toUpperCase();
};
export { mapToDisplayText, mapToBackendValue };
export function getEnumKeys<
  T extends string,
  TEnumValue extends string | number
>(enumVariable: { [key in T]: TEnumValue }) {
  return Object.keys(enumVariable) as Array<T>;
}

export const subscriptionTypesObjs = Object.keys(SubscriptionTypeEnum).map(
  (key) => ({
    label: key.toLowerCase(),
    value: mapToBackendValue(key),
  })
);
