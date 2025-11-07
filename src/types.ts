export type Task = {
  id: string;
  description: string;
  isCompleted: boolean;
};

export type Action = "CREATE" | "UPDATE" | "DELETE";

export type MyQueryMeta = {
  action: Action;
  invalidateKeys: string[];
};
