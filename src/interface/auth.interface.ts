export interface IAuth {
  data: IData;
}

export interface IData {
  statusCode: number;
  success: boolean;
  message: string;
  data: { accessToken: string };
}
