import { useState, useEffect, useMemo } from "react";

type FetchError = string | null;

interface QueryOptions {
  headers?: HeadersInit;
}

export const useQuery = <T>(
  url: string,
  params?: Record<string, string>,
  options?: QueryOptions
): { data: T | null; isLoading: boolean; error: FetchError } => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<FetchError>(null);

  const memoizedParams = useMemo(() => params, [JSON.stringify(params)]); // Use JSON.stringify for deep comparison of params
  const memoizedOptions = useMemo(() => options, [JSON.stringify(options)]); // Use JSON.stringify for deep comparison of options

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setData(null);

      // Construct the full URL with query parameters
      const queryString = memoizedParams
        ? "?" + new URLSearchParams(memoizedParams).toString()
        : "";
      const fullUrl = url + queryString;

      try {
        const response = await fetch(fullUrl, {
          method: "GET",
          ...memoizedOptions,
        });
        if (!response.ok) throw new Error(response.statusText);
        const json: T = await response.json();
        setIsLoading(false);
        setData(json);
        setError(null);
      } catch (error) {
        setError(`${error} Could not Fetch Data`);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, memoizedParams, memoizedOptions]);

  return { data, isLoading, error };
};
