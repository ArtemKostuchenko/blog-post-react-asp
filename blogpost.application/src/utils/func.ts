import { authRepository } from "./repositories/auth/AuthRepository";
import { store } from "./store";
import { authActions } from "./store/auth/auth.slice";

export interface ApiError {
  success: false;
  status: number;
  data: null;
  errors: string[];
}

export const objectToFormData = (obj: Record<string, unknown>): FormData => {
  const formData = new FormData();

  Object.entries(obj).forEach(([key, value]) => {
    if (value instanceof File) {
      formData.append(key, value);
    } else {
      formData.append(key, String(value));
    }
  });

  return formData;
};

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface FetchApiOptions<
  Q extends Record<string, unknown> = Record<string, unknown>,
> {
  method?: HttpMethod;
  data?: unknown;
  query?: Q;
  accessToken?: string;
  retryOnFail?: boolean;
}

let refreshPromise: Promise<string | null> | null = null;

export const fetchApi = async <
  T,
  Q extends Record<string, unknown> = Record<string, unknown>,
>(
  path: string,
  options: FetchApiOptions<Q> = {},
): Promise<T> => {
  const baseApi = import.meta.env.VITE_API_URL || window.location.origin;

  const url = new URL(`/api/${path}`, baseApi);

  const { query, data, accessToken, method } = options;
  const retryOnFail = options.retryOnFail ? options.retryOnFail : true;

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  const headers: HeadersInit = {};

  if (!(data instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  const response = await fetch(url.toString(), {
    method: method || "GET",
    body:
      data instanceof FormData ? data : data ? JSON.stringify(data) : undefined,
    headers: headers,
  });

  if (response.status === 401 && retryOnFail) {
    const defaultApiError: ApiError = {
      success: false,
      data: null,
      status: 401,
      errors: ["Please login again"],
    };
    const refreshToken = localStorage.getItem("_rt");

    if (!refreshToken) {
      throw defaultApiError as ApiError;
    }

    if (!refreshPromise) {
      refreshPromise = authRepository
        .refresh({
          refreshToken,
        })
        .then((data) => {
          localStorage.setItem("_rt", data.refreshToken);
          store.dispatch(authActions.refreshFulfilled(data));
          return data.accessToken;
        })
        .catch(() => {
          store.dispatch(authActions.logout());
          return null;
        })
        .finally(() => {
          refreshPromise = null;
        });
    }

    const newAccessToken = await refreshPromise;

    if (!newAccessToken) throw defaultApiError as ApiError;

    return fetchApi<T>(path, {
      ...options,
      accessToken: newAccessToken,
      retryOnFail: false,
    });
  }
  const responseData = await response.json();

  if (!response.ok) {
    responseData.code = response.status;
    throw responseData as ApiError;
  }

  return responseData as T;
};

export const getShortName = (name: string) => {
  return `${name.charAt(0).toUpperCase()}${name
    .replace(" ", "")
    .charAt(Math.ceil(name.length / 2))
    .toUpperCase()}`;
};

export const getResourceUrl = (uri: string) => {
  const apiUrl = import.meta.env.VITE_API_URL || window.location.origin;

  return `${apiUrl}/api/${uri}`;
};

export const getFormateImageFormats = (format: string) => {
  const formats = format.split(", ");
  return formats.map((f) => `image/${f}`);
};
