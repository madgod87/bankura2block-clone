import { useState, useEffect, useCallback } from 'react';
import { apiEndpoints, handleApiError, handleApiSuccess } from '../utils/api';

// Generic API hook
export const useApi = <T>(
  apiCall: () => Promise<any>,
  dependencies: any[] = []
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiCall();
      setData(response.data.data || response.data);
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  }, dependencies);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};

// Services hook
export const useServices = () => {
  return useApi(() => apiEndpoints.getServices());
};

// News hook
export const useNews = () => {
  return useApi(() => apiEndpoints.getNews());
};

// Health check hook
export const useHealthCheck = () => {
  return useApi(() => apiEndpoints.health());
};

// Contact form hook
export const useContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const submitContact = useCallback(async (formData: any) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);
      
      const response = await apiEndpoints.submitContact(formData);
      setSuccess(handleApiSuccess(response));
      return response;
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setError(null);
    setSuccess(null);
  }, []);

  return { submitContact, loading, error, success, reset };
};

// Generic mutation hook (for POST, PUT, DELETE operations)
export const useMutation = <TData = any, TVariables = any>(
  mutationFn: (variables: TVariables) => Promise<any>
) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<TData | null>(null);

  const mutate = useCallback(async (variables: TVariables) => {
    try {
      setLoading(true);
      setError(null);
      const response = await mutationFn(variables);
      setData(response.data);
      return response;
    } catch (err) {
      setError(handleApiError(err));
      throw err;
    } finally {
      setLoading(false);
    }
  }, [mutationFn]);

  const reset = useCallback(() => {
    setError(null);
    setData(null);
  }, []);

  return { mutate, loading, error, data, reset };
};
