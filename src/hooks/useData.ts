import { useCallback, useEffect, useState } from 'react';
import apiClient from '../services/api-client';
import { CanceledError } from 'axios';

const useData = <T>(endpoint: string) => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    const controller = new AbortController();

    setLoading(true);
    apiClient
      .get<T[]>(endpoint, { signal: controller.signal })
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });
    return () => controller.abort();
  }, [endpoint]);
  useEffect(() => {
    console.log('Fetching data...');
    fetchData();
    return () => console.log('Cleanup...');
  }, [fetchData]);

  const refetch = useCallback(async () => {
    await fetchData(); // Manually trigger a new fetch
  }, [fetchData]);
  return { data, error, isLoading, refetch };
};

export default useData;
