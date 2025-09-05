import { useState } from 'react';

export function useOnboarding() {
  const [data, setData] = useState<any[]>([]);
  const fetchData = async () => {
    // TODO: implement fetch logic
  };
  return { data, fetchData };
}
