export type TSimpleResponse = {
  response: string;
};

export type TExpandedResponse = {
  status: Response['status'];
  body?: Response['body'];
};

export type TApiResponse<T> = keyof T;
