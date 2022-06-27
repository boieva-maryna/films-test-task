import {
  QueryKey,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "react-query";
import { AxiosError } from "axios";
import BaseApiService from "./BaseApiService";
import { AxiosRequestConfig } from "axios";

export type Response<TData = any> = {
  startIndex: number;
  itemsPerPage: number;
  entryCount: number;
  entries: TData;
};

export const useApiQuery = <TReturnData = any, TRequestPayload = any>(
  key: QueryKey,
  requestOptions: AxiosRequestConfig<TRequestPayload>,
  queryOptions?: Omit<
    UseQueryOptions<
      TReturnData,
      AxiosError,
      TReturnData,
      QueryKey
    >,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery<
    TReturnData,
    AxiosError,
    TReturnData,
    QueryKey
  >(
    key,
    async () => {
      const response = await BaseApiService(requestOptions);
      return response.data;
    },
    queryOptions
  );
};

export const useApiMutation = <TReturnData, TRequestPayload>(
  requestOptions: AxiosRequestConfig<TRequestPayload>,
  mutationOptions?: Omit<
    UseMutationOptions<TReturnData, AxiosError, TRequestPayload>,
    "mutationFn"
  >
) => {
  return useMutation<TReturnData, AxiosError, TRequestPayload>(
    async (data: TRequestPayload) => {
      const response = await BaseApiService({ ...requestOptions, data });
      return response.data;
    },
    mutationOptions
  );
};

export const useInfiniteApiQuery = <TReturnData = any, TRequestPayload = any>(
  key: QueryKey,
  requestOptions: AxiosRequestConfig<TRequestPayload>,
  queryOptions: Omit<
    UseInfiniteQueryOptions<
      TReturnData,
      AxiosError,
      TReturnData,
      TReturnData,
      QueryKey
    >,
    "queryKey" | "queryFn"
  >
) => {
  return useInfiniteQuery<
    TReturnData,
    AxiosError,
    TReturnData,
    QueryKey
  >(
    key,
    async ({ pageParam = 1 }) => {
      const response = await BaseApiService({
        ...requestOptions,
        params: {
          ...requestOptions.params,
          range: `${pageParam}-${
            pageParam + (requestOptions.params.perPage ?? 10)
          }`,
        },
      });
      return response.data;
    },
    {
      ...queryOptions,
      getNextPageParam: (lastPage:any) =>
        lastPage.entryCount && lastPage.startIndex + lastPage.itemsPerPage,
    }
  );
};
