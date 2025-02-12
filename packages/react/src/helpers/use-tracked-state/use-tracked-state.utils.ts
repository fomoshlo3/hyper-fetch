import {
  CacheValueType,
  NullableType,
  RequestInstance,
  ResponseType,
  ExtractResponseType,
  ExtractErrorType,
  ExtractAdapterReturnType,
  Dispatcher,
} from "@hyper-fetch/core";

import { initialState, UseTrackedStateType } from "helpers";

export const getDetailsState = (
  state?: UseTrackedStateType<RequestInstance>,
  details?: Partial<CacheValueType<unknown, unknown>["details"]>,
): CacheValueType<unknown, unknown>["details"] => {
  return {
    retries: state?.retries || 0,
    timestamp: +new Date(),
    isFailed: false,
    isCanceled: false,
    isOffline: false,
    ...details,
  };
};

export const isStaleCacheData = (cacheTime: number, cacheTimestamp: NullableType<Date | number>) => {
  if (!cacheTimestamp) return true;
  return +new Date() > +cacheTimestamp + cacheTime;
};

export const getValidCacheData = <T extends RequestInstance>(
  request: T,
  initialData: NullableType<ExtractAdapterReturnType<T>>,
  cacheData: NullableType<CacheValueType<ExtractResponseType<T>, ExtractErrorType<T>>>,
): CacheValueType<ExtractResponseType<T>, ExtractErrorType<T>> | null => {
  const isStale = isStaleCacheData(request.cacheTime, cacheData?.details.timestamp);

  if (!isStale && cacheData) {
    return cacheData;
  }

  if (initialData) {
    return {
      data: initialData,
      details: getDetailsState(),
      cacheTime: 1000,
      clearKey: request.client.cache.clearKey,
      garbageCollection: request.garbageCollection,
    };
  }

  return null;
};

export const getTimestamp = (timestamp?: NullableType<number | Date>) => {
  return timestamp ? new Date(timestamp) : null;
};

export const getInitialState = <T extends RequestInstance>(
  initialData: ResponseType<ExtractResponseType<T>, ExtractErrorType<T>> | null,
  dispatcher: Dispatcher,
  request: T,
): UseTrackedStateType<T> => {
  const { client, cacheKey } = request;
  const { cache } = client;

  const cacheData = cache.get<ExtractResponseType<T>, ExtractErrorType<T>>(cacheKey);
  const cacheState = getValidCacheData<T>(request, initialData, cacheData);

  const initialLoading = dispatcher.hasRunningRequests(request.queueKey);

  return {
    ...initialState,
    data: cacheState?.data?.[0] || initialState.data,
    error: cacheState?.data?.[1] || initialState.error,
    status: cacheState?.data?.[2] || initialState.status,
    retries: cacheState?.details.retries || initialState.retries,
    timestamp: getTimestamp(cacheState?.details.timestamp || initialState.timestamp),
    loading: initialLoading,
  };
};
