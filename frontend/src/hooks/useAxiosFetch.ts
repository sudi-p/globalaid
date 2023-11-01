import { useState, useEffect } from 'react';
import getClient, { axiosPrivate} from '@lib/api';
import axios from 'axios';

const useAxiosFetch = (dataUrl: string) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false)
  useEffect(() => {
    let isMounted = true;
    const source = axios.CancelToken.source();
    const fetchData = async (url: string) => {
      setIsLoading(true);
      try {
        const res = await axiosPrivate.get(url,{
          cancelToken: source.token
        })
        if (isMounted){
          setData(res.data)
          setError(false)
        }
      } catch (e: unknown) {
        if(isMounted){
          setData([])
          setError(true)
        }
      } finally {
        if (isMounted){
          setIsLoading(false)
        }
      }
    }
    fetchData(dataUrl);
    return () => {
      isMounted = false;
      source.cancel();
    }
  }, [dataUrl]);

  return { data, isLoading, error}
}

export default useAxiosFetch;