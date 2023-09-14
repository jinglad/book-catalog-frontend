import { IGetRoot } from "./generic.interface";

export interface IBook {
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  reviews: string[];
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface ISingleBookData extends IGetRoot {
  data: IBook;
}

export interface IBookData extends IGetRoot {
  data: IBook[];
}
