import {
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useAtom } from "jotai";
import { FC, useMemo } from "react";
import { FiSearch } from "react-icons/fi";
import { favouritesAtom } from "../api/useAtomFavourites";
import EmptyState from "../components/EmptyState";
import FilmsList from "../components/FilmsList";

const FavouriteFilms: FC = () => {
  const [list] = useAtom(favouritesAtom);
  const fav = useMemo(() => Object.values(list) ?? [], [list]);

  return (
    <Flex w="100%" direction="column" flex={1}>
      <Heading my={8} size="2xl">
        On your wish-list
      </Heading>
      {!fav.length ? (
        <EmptyState icon={FiSearch}>
          <Text fontSize="xl">Wish-list is empty</Text>
          <Text>When you add film to wish-list it will be displayed here</Text>
        </EmptyState>
      ) : (
        <FilmsList films={fav} />
      )}
    </Flex>
  );
};

export default FavouriteFilms;
