import { delay } from "@/lib/helper";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import axios, { type AxiosError, type AxiosRequestConfig } from "axios";
import { toast } from "sonner";

type QueryObj = {
  url: string;
  method: AxiosRequestConfig["method"];
  data?: AxiosRequestConfig["data"];
  params?: AxiosRequestConfig["params"];
  headers?: AxiosRequestConfig["headers"];
};

export function axiosBaseQuery(
  { baseUrl }: { baseUrl: string } = { baseUrl: "" },
): BaseQueryFn<QueryObj, unknown, unknown> {
  return async ({ url, method, data, params, headers }) => {
    if (method !== "GET") await delay(3);

    try {
      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
        headers,
      });

      if (result.status === 201 && method === "POST") {
        toast.success("Task created successfully.");
      }

      if (result.status === 200 && method === "PATCH") {
        toast.success("Task updated successfully.");
      }

      if (result.status === 200 && method === "DELETE") {
        toast.success("Task deleted successfully.");
      }

      return { data: result.data };
    } catch (err) {
      const error = err as AxiosError;

      return {
        error: {
          status: error.response?.status,
          data: error.response?.data || error.message,
        },
      };
    }
  };
}
