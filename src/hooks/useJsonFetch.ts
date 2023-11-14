import { useEffect, useState } from 'react';

export function useJsonFetch<T>(url: string, opts?: object) : [T | undefined, boolean, Error | undefined] {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>();

  function loadFailed(errorMessage: string) {
    setError(new Error(errorMessage));
    setData(undefined);
    setLoading(false);
  }

  async function load() {
    setLoading(true);
    let response;
    try {
      response = await fetch(url, opts);
      if (response.status < 200 || response.status >= 300) {
        return loadFailed(`Failed to load data, HTTP code: ${response.status}`);
      }
    } catch(error) {
      return loadFailed(`Failed to load data (${error})`);
    }
    let data;
    try {
      data = await response.json();
    } catch(error) {
      return loadFailed(`Failed to parse data(${error})`);
    }
    setError(undefined);
    setData(data);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, [url, opts])

  return [data, loading, error]
}

export default useJsonFetch;