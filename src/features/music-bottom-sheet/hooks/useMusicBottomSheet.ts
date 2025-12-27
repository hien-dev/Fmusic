import { useState } from 'react';

export function useMusicBottomSheet() {
  const [data, setData] = useState<any[]>([]);
  const fetchData = async () => {
    // TODO: implement fetch logic
  };
  return { data, fetchData };
}
