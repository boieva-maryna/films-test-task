import { Film } from "./types";
import { useApiQuery } from "./useApi";

const useQueryFilm = (id?:string) => {
  return useApiQuery<Film>(["films", {id}], {
    method: "get",
    url: `/${id}`,
  },
  {
    enabled:Boolean(id)
  });
};

export default useQueryFilm;
