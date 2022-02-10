import { useState, useEffect } from 'react';

// Models
import { Entry } from 'contensis-delivery-api/lib/models';

// Utils
import { getEntryById } from '../client/index';

export const useGetEntryByEntryId = (entryId:string, linkDepth?:number) => {
  const [entry, setEntry] = useState<Entry>();
  
  useEffect(() => {
    const getEntry = async() => {
      const entry = await getEntryById(entryId, linkDepth);
      if (entry) setEntry(entry);
    }
    getEntry();
  }, [entryId]);

  return entry;
}