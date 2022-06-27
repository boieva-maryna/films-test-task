import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Tag,
  Wrap,
  WrapItem,
  Text,
} from "@chakra-ui/react";
import { useAtom } from "jotai";
import { FC, useMemo } from "react";
import { FiSearch } from "react-icons/fi";
import { Link, useSearchParams } from "react-router-dom";
import { Film } from "../api/types";
import { favouritesAtom } from "../api/useAtomFavourites";
import useQueryFilms from "../api/useQueryFilms";
import EmptyState from "../components/EmptyState";
import FavouritesPreview from "../components/FavouritesPreview";
import FilmsList from "../components/FilmsList";

const genres = [
  { label: "All", value: "" },
  { label: "Action", value: "action" },
  { label: "Comedy", value: "comedy" },
  { label: "Thriller", value: "thriller" },
  { label: "War", value: "war" },
  { label: "Romance", value: "romance" },
  { label: "Drama", value: "drama" },
  { label: "Crime", value: "crime" },
  { label: "Documentary", value: "documentary" },
  { label: "Horror", value: "horror" },
];

const Home: FC = () => {
  let [searchParams, setSearchParams] = useSearchParams();

  const selectedGenre = useMemo(
    () => searchParams.get("genre") ?? "",
    [searchParams]
  );

  const { data, isLoading, isSuccess, isFetching, fetchNextPage } =
    useQueryFilms({
      genre: selectedGenre,
    });

  const films = useMemo(
    () =>
      data?.pages.reduce((res: Film[], page) => res.concat(page.entries), []) ??
      [],
    [data]
  );

  const [list] = useAtom(favouritesAtom);
  const favPreview = useMemo(
    () => (Object.values(list) ?? []).slice(0, 10),
    [list]
  );

  const onClickTag = (genre: string) => () => {
    setSearchParams({ genre });
  };

  const onLoadMore = () => {
    fetchNextPage();
  };

  return (
    <Flex w="100%" direction="column" flex={1}>
      {favPreview.length > 0 && (
        <Box as="section">
          <Heading my={8} size="2xl">
            On your wish-list
          </Heading>
          <FavouritesPreview films={favPreview} />
          <Container centerContent my={4}>
            <Button as={Link} to="wish-list" variant="ghost" colorScheme="blue">
              See all
            </Button>
          </Container>
        </Box>
      )}
      <Box as="section">
        <Heading my={8} size="2xl">
          Explore popular genres
        </Heading>
        <Wrap my={4}>
          {genres.map(({ label, value }) => (
            <WrapItem key={value}>
              <Tag
                cursor="pointer"
                size="lg"
                borderRadius="md"
                colorScheme="blue"
                variant={value === selectedGenre ? "solid" : "outline"}
                onClick={onClickTag(value)}
              >
                {label}
              </Tag>
            </WrapItem>
          ))}
        </Wrap>

        {!isLoading && !films.length ? (
          <EmptyState icon={FiSearch}>
            <Text fontSize="xl">No resoult found</Text>
            <Text>Try changing filter or search term</Text>
          </EmptyState>
        ) : (
          <FilmsList films={films} isLoading={isLoading} />
        )}

        <Container centerContent my={4}>
          {isSuccess && films.length > 0 && (
            <Button
              loadingText="Loading more..."
              isLoading={isFetching}
              onClick={onLoadMore}
              variant="ghost"
              colorScheme="blue"
            >
              See more
            </Button>
          )}
        </Container>
      </Box>
    </Flex>
  );
};

export default Home;
