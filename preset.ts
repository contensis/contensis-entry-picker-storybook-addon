import { useGetEntryByEntryId } from './src/hooks/useGetEntryByEntryId';

const managerEntries = (entry = []) => {
  return [...entry, require.resolve("./src/register.js")]; 
}

export {
  managerEntries, 
  useGetEntryByEntryId
}

