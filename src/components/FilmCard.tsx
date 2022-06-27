import {
  Box,
  Container,
  Image,
  Skeleton,
  LinkBox,
  LinkOverlay,
  Text,
  HStack,
  Tag,
  VStack,
} from "@chakra-ui/react";
import { FC, useCallback } from "react";
import { Link } from "react-router-dom";
import { Film } from "../api/types";
import useFavourites from "../api/useAtomFavourites";
import FavoriteMark from "./FavoriteMark";
import ImageFallback from "./ImageFallback";

const FilmCard: FC<{ film: Film }> = ({ film }) => {
  const preview = Object.values(film.plprogram$thumbnails)
    .sort((a, b) => b.plprogram$height - a.plprogram$height)
    .find((thumb) => thumb.plprogram$url);

  const split = film.id.split("/");
  const id = split[split.length - 1];

  const {isMarked, onMark} =useFavourites(film)

  const onMarkClick=useCallback((e:React.MouseEvent)=>{
    e.stopPropagation();
    e.preventDefault()
    onMark()
  },[onMark])


  return (
    <LinkBox
      p={1}
      overflow="hidden"
      transition="background 0.3s ease"
      justifyContent="space-between"
      sx={{
        "&:hover": {
          background:"whiteAlpha.200"
        },
      }}
      as={VStack}
    >
      <Container
        minHeight={{ base: "50vh", sm: "45vh" }}
        centerContent
        h="100%"
        justifyContent="center"
        position="relative"
      >
        <Box position="absolute" top={5} right={5}     zIndex={100}>
          <FavoriteMark isMarked={isMarked} onClick={onMarkClick}/>
        </Box>
        <Image
          src={preview?.plprogram$url}
          alt={film.title}
          maxW="100%"
          maxHeight="100%"
          fallback={<ImageFallback />}
        />
      </Container>
      <VStack spacing={1}>
        <LinkOverlay as={Link} to={id} mt={2}>
          <Text
            fontSize="lg"
            textAlign="center"
            fontWeight={600}
          >
            {film.title}
          </Text>
        </LinkOverlay>
        <Text fontSize="xs" textAlign="center" color="gray.500">
          {film.plprogram$year}
        </Text>
        <HStack justifyContent="center">
          {film.plprogram$tags.map(
            (tag) =>
              tag.plprogram$scheme === "genre" && (
                <Tag
                  variant="subtle"
                  colorScheme="blue"
                  size="sm"
                  key={tag.plprogram$title}
                >
                  {tag.plprogram$title}
                </Tag>
              )
          )}
        </HStack>
      </VStack>
    </LinkBox>
  );
};

export default FilmCard;

export const FilmCardSkeleton = () => {
  return (
    <VStack overflow="hidden">
      <Box height={{ base: "50vh", sm: "45vh" }} w="100%">
        <Skeleton w="100%" h="100%" />
      </Box>

      <Skeleton w="60%" height="1.25rem" />
      <Skeleton w="20%" height="0.75rem" />
      <HStack justifyContent="center" w="100%">
        {new Array(3).fill(1).map((_, index) => (
          <Skeleton key={index} h="20px" w="25%" />
        ))}
      </HStack>
    </VStack>
  );
};
