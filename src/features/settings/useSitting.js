import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export function useSitting() {
  const {
    isLoading,
    data: sitting,
    error,
  } = useQuery({
    queryKey: ["sitting"],
    queryFn: getSettings,
  });

  return { isLoading, sitting, error };
}

