import { useCallback, useEffect, useMemo, useState } from 'react';

export type Any = any;

type ApiReturnData = {
  data: Any | null;
  error: string | null;
};

interface UseApiReturn {
  data: Record<string, Any>;
  fetchApiData: (url: string) => Promise<ApiReturnData>;
}

export const useApi = (api?: string): UseApiReturn => {
  const [data, setApiData] = useState<Any | null>(null);

  const apiUrl = useMemo(() => api, [api]);

  const fetchApiData = useCallback(
    async (url: string): Promise<ApiReturnData> => {
      const response = await fetch(url);
      const returnObj: ApiReturnData = { data: null, error: null };
      if (response.ok) {
        returnObj.data = await response.json();
      } else {
        returnObj.error = 'Error in fetching data';
      }

      return returnObj;
    },
    []
  );

  useEffect(() => {
    if (apiUrl) {
      (async () => {
        try {
          const response = await fetch(apiUrl);
          if (!response.ok) {
            throw new Error();
          }

          setApiData(response.json());
        } catch (err) {
          console.error(err);
        }
      })();
    }
  }, [apiUrl]);

  return { data, fetchApiData };
};
