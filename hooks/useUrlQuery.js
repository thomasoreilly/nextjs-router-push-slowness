import { useCallback, useState } from 'react';

export const useUrlQuery = (query, router) => {
  const [queryState, setQueryState] = useState(query);

  const updateUrlQuery = useCallback(
    (incomingQuery) => {
      setQueryState((qState) => {
        const queryChanged = Object.keys(incomingQuery).some(
          (key) => qState[key] !== incomingQuery[key]
        );

        if (!queryChanged) return qState;

        const newQuery = Object.entries({ ...qState, ...incomingQuery }).reduce(
          (acc, [key, value]) => {
            if (value === undefined || value === null) {
              return acc;
            }

            return {
              ...acc,
              [key]: value,
            };
          },
          {}
        );

        const setRoute = async (q) => {
          await router.push(
            {
              query: q,
            },
            undefined,
            { shallow: true }
          );
        };

        setRoute(newQuery);

        return newQuery;
      });
    },
    [setQueryState, router]
  );

  return {
    updateUrlQuery,
    queryState,
  };
};
