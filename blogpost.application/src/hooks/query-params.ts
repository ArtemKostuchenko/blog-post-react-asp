import type { DefaultQueryParams, OrderType } from "@/utils/types/app";
import { useMemo } from "react";
import { useSearchParams } from "react-router";

const getDefaultQueryParams = (
  searchParams: URLSearchParams,
): DefaultQueryParams => {
  const orderParam = searchParams.get("order");

  const order: OrderType | undefined =
    orderParam === "asc" || orderParam === "desc" ? orderParam : undefined;

  return {
    search: searchParams.get("search") || undefined,
    page: Number(searchParams.get("page")) || undefined,
    limit: Number(searchParams.get("limit")) || undefined,
    order,
  };
};

const useQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const defaultQueryParams = useMemo(
    () => getDefaultQueryParams(searchParams),
    [searchParams],
  );

  const setQueryParam = (name: string, value: number | string) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set(name, value.toString());
      return newParams;
    });
  };

  const removeQueryParam = (name: string) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      searchParams.delete(name);
      return newParams;
    });
  };

  const getQueryParam = (name: string) => searchParams.get(name);

  const resetQueryParams = () => {
    setSearchParams(new URLSearchParams());
  };

  return {
    searchParams,
    defaultQueryParams,
    setQueryParam,
    removeQueryParam,
    getQueryParam,
    resetQueryParams,
  };
};

export default useQueryParams;
