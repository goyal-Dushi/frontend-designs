import { useCallback, useEffect, useMemo, useState } from 'react';

export type Any = any;

export const useApi = (api: string) => {
  const [apiData, setApiData] = useState<Any>();

  const apiUrl = useMemo(() => api, [api]);

  const fetchData = async () => {
    const data = await fetch(api)
      .then((res) => res.json())
      .catch((err) => {
        console.error(err);
      });

    return data;
  };

  const handleDataFetch = useCallback(() => {
    let data;
    try {
      data = fetchData().then((res) => res);
    } finally {
      setApiData(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleDataFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiUrl]);

  return apiData;
};
