import { useEffect, useState } from "react";

/*
  Reactive media query hook. Returns true while the viewport matches the
  query (default: the app's mobile breakpoint, <= 48em).
*/
function useIsMobile(query = "(max-width: 48em)") {
  const [matches, setMatches] = useState(window.matchMedia(query).matches);

  useEffect(() => {
    const mql = window.matchMedia(query);

    function handleChange(event) {
      setMatches(event.matches);
    }

    // Keep state in sync if the viewport changed before subscribing
    setMatches(mql.matches);
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, [query]);

  return matches;
}

export default useIsMobile;
