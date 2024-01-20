import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { apiService } from './api-client';
import useData from '../hooks/useData';

export interface MonthlyData {
  [month: string]: number;
}
export interface YearlyData {
  [year: string]: number;
}
export interface MonthlyDataForCategory {
  [month: string]: {
    [cateogry: string]: number;
  };
}
export const useChartsService = () => {
  const useFetchCurrSpendings = () => {
    const { data, error, isLoading, refetch } = useData<Map<string, number>>(
      '/insight/monthly-spendings'
    );
    const transformedData = data
      ? Object.entries(data).map(([label, value]) => ({
          label,
          value,
        }))
      : [];
    transformedData.sort((a, b) => (a.label > b.label ? 1 : -1));
    return { transformedData, error, isLoading, refetch };
  };
  const useFetchCategorySpendingsMonthly = () => {
    const { data, error, isLoading, refetch } = useData<
      Map<string, Map<string, number>>
    >('/insight/monthly-spendings-category');

    // const transformedData = Object.entries(data).map(([label, innerMap]) => ({
    //   label,
    //   categories: Object.entries(innerMap).map(
    //     ([category, value]: [string, number]) => ({
    //       category,
    //       value,
    //     })
    //   ),
    // }));
    const transformedData = data
      ? Object.entries(data).map(([label, value]) => ({
          label,
          value,
        }))
      : [];
    transformedData.sort((a, b) => (a.label > b.label ? 1 : -1));
    return { transformedData, error, isLoading, refetch };
  };
  const useFetchCurrentYearSpendings = () => {
    const { data, error, isLoading, refetch } = useData<Map<string, number>>(
      '/insight/monthly-spendings-month-year/yyyy'
    );
    const transformedData = data
      ? Object.entries(data).map(([label, value]) => ({
          label,
          value,
        }))
      : [];
    transformedData.sort((a, b) => (a.label > b.label ? 1 : -1));
    return { transformedData, error, isLoading, refetch };
  };
  const useFetchEstimationsMonthlySpendings = (months: number) => {
    const { data, error, isLoading, refetch } = useData<Map<string, number>>(
      '/insight/monthly-spendings-future/' + months
    );
    const transformedData = data
      ? Object.entries(data).map(([label, value]) => ({
          label,
          value,
        }))
      : [];
    transformedData.sort((a, b) => (a.label > b.label ? 1 : -1));
    return { transformedData, error, isLoading, refetch };
  };

  return {
    useFetchCategorySpendingsMonthly,
    useFetchCurrSpendings,
    useFetchCurrentYearSpendings,
    useFetchEstimationsMonthlySpendings,
  };
};
