import { useEffect, useRef, useState } from "react";

/**
 * Update the given state whenever the input value is changed, for the given state and nested input identifier. 
 * Only works when updating one level down, any further down would require passing in all the data up 
 * to the first nested level with the actual new value inside.
 *
 * @param {string} inputIdentifier - The input type, to match up to a particular property.
 * @param {*} newValue - The new input value.
 * @param {bool} updateOnlyWhenExists - When true, only update the value if it's not null, mainly used for file selection.
 */
export function handleNestedChange(setStateFunction, inputIdentifier, newValue, updateOnlyWhenExists = false) {
  if (!updateOnlyWhenExists || (updateOnlyWhenExists && newValue)) {
    setStateFunction((oldInputs) => {
      return {
        ...oldInputs,
        [inputIdentifier]: newValue
      }
    })
  }
}


/**
 * Custom hook that performs a deep comparison of a value and memoizes the result.
 *
 * This hook can be used to optimize re-renders in functional components based on deep object or array equality.
 * It utilizes a `useState` hook to store the comparison result and a `useRef` hook to maintain a reference to the previous value.
 *
 * @param {any} value - The value to be compared for deep equality.
 * @returns {boolean} isEqual - A boolean indicating whether the current value is deeply equal to the previous value.
 */
export function useDeepCompareMemo(value) {
  const [isEqual, setIsEqual] = useState(false);
  const ref = useRef(value);

  useEffect(() => {
    // Deep comparison logic (replace with your preferred deep comparison library)
    const areEqual =
      value === null && ref.current === null || JSON.stringify(value) === JSON.stringify(ref.current);
    setIsEqual(areEqual);
    ref.current = value;
  }, [value]);

  return isEqual;
}