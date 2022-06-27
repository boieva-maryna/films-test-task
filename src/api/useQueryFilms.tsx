import { Film } from "./types";
import { useInfiniteApiQuery, Response } from "./useApi";

export interface FilterParams {
  byTags?:string
  sort?:string
  genre?:string
  perPage?:number
}
 

const useQueryFilms = ({ genre,perPage, ...rest}: FilterParams) => {
  return useInfiniteApiQuery<Response<Film[]>>(["films", {...rest,perPage, genre}], {
    method: "get",
    url: ``,
    params:{
      ...rest,
      perPage,
    byTags:genre?`genre:${genre}`:""
    },
  },
  {});
};

export default useQueryFilms;
