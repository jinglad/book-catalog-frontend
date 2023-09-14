export interface IMeta {
  page: number;
  limit: number;
  total: number;
}

export interface IGetRoot {
  statusCode: number;
  success: boolean;
  message: string;
  meta: IMeta;
}
