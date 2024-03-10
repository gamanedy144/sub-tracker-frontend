import { useCallback, useEffect, useState } from 'react';
import { apiService } from '../services/api-client';
import { CanceledError } from 'axios';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
const useData = <T>(endpoint: string) => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);
  const authHeader = useAuthHeader();
  const fetchData = useCallback(async () => {
    const controller = new AbortController();

    setLoading(true);
    apiService
      .get<T[]>(endpoint, {
        signal: controller.signal,
        headers: { Authorization: authHeader },
      })
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
    fetchData();

    return () => {
      // Cleanup function to cancel ongoing requests
      const controller = new AbortController();
      controller.abort();
    };
  }, [fetchData]);

  const refetch = useCallback(async () => {
    await fetchData(); // Manually trigger a new fetch
  }, [fetchData]);
  return { data, error, isLoading, refetch };
};

export default useData;
