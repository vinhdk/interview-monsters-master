import {useEffect, useState} from "react";

export const useDebounce = (value, delay) => {
    const [debounceValue, setDebouceValue] = useState(value);
    useEffect(() => {
        const debounce = setTimeout(() => {
            setDebouceValue(value);
        }, delay);
        return () => {
            clearTimeout(debounce);
        };
    }, [value]);

    return debounceValue;

}
