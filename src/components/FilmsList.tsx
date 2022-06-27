import { FC } from "react";
import { Film } from "../api/types";
import FilmCard, { FilmCardSkeleton } from "./FilmCard";
import { Grid } from "@chakra-ui/react";

interface Props {
  films: Film[];
  isLoading?: boolean;
}

const FilmsList: FC<Props> = ({ films, isLoading }) => {
  return (
    <Grid
      templateColumns={{
        sm: "repeat(2, 1fr)",
        md: "repeat(3, 1fr)",
        lg: "repeat(4, 1fr)",
      }}
      gridAutoRows="1fr"
      gap={8}
      w="100%"
    >
      {isLoading
        ? new Array(8)
            .fill(1)
            .map((_, index) => <FilmCardSkeleton key={index} />)
        : films.map((film) => <FilmCard key={film.guid} film={film} />)}
    </Grid>
  );
};

export default FilmsList;
