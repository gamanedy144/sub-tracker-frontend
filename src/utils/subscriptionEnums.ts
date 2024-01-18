import { capitalizeFirstLetter } from './capitalize';

enum SubscriptionTypeEnum {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  BIMONTHLY = 'bimonthly',
  MONTHLY = 'monthly',
  YEARLY = 'yearly',
}
const subscriptionTypes: SubscriptionTypeEnum[] = [
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
      return 'bimonthly';
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

enum SubscriptionCategory {
  GAMING = 'GAMING',
  UTILITY = 'UTILITY',
  HEALTH = 'HEALTH',
  SPORT = 'SPORT',
  NEWS = 'NEWS',
  FOOD = 'FOOD',
  SOFTWARE = 'SOFTWARE',
  MUSIC = 'MUSIC',
  STREAMING = 'STREAMING',
  BEAUTY = 'BEAUTY',
  FASHION = 'FASHION',
  EDUCATION = 'EDUCATION',
  BOOKS = 'BOOKS',
  TECHNOLOGY = 'TECHNOLOGY',
}
const subscriptionCategories: SubscriptionCategory[] =
  Object.values(SubscriptionCategory);

export {
  mapToDisplayText,
  mapToBackendValue,
  subscriptionCategories,
  SubscriptionCategory,
  SubscriptionTypeEnum,
  subscriptionTypes,
};
export const subscriptionCategoriesObjs = Object.keys(SubscriptionCategory).map(
  (key) => ({
    label: capitalizeFirstLetter(key),
    value: key,
  })
);
