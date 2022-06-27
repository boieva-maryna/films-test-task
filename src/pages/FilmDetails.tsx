import {
  AspectRatio,
  Button,
  Container,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Skeleton,
  SkeletonText,
  Tag,
  Text,
} from "@chakra-ui/react";
import { FC } from "react";
import { FiAlertTriangle } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import useFavourites from "../api/useAtomFavourites";
import useQueryFilm from "../api/useQueryFilm";
import CreditsList from "../components/CreditsList";
import EmptyState from "../components/EmptyState";
import FavoriteMark from "../components/FavoriteMark";
import ImageFallback from "../components/ImageFallback";

const FilmDetails: FC = () => {
  const { id } = useParams();
  const { data, isLoading, isSuccess, isError } = useQueryFilm(id);

  const preview = Object.values(data?.plprogram$thumbnails ?? {})
    .sort((a, b) => b.plprogram$height - a.plprogram$height)
    .find((thumb) => thumb.plprogram$url);

      const {isMarked, onMark} =useFavourites(data)

  if (isError) {
    return (
      <EmptyState icon={FiAlertTriangle}>
        <Text size="3xl">Failed to load film detailes</Text>
        <Button as={Link} to="/">
          Return to home page
        </Button>
      </EmptyState>
    );
  }

  return (
    <Grid
      flex={1}
      h="100%"
      templateRows={{ base: "unset", md: "repeat(5, max-content)" }}
      templateColumns={{ base: "1fr", md: "0.5fr 1fr" }}
      gridAutoRows={{ base: "max-content" }}
      gap={4}
      alignItems="center"
    >
      <GridItem colSpan={{ md: 1 }} rowSpan={{ md: 4 }} height="55vh">
        <Container centerContent h="100%" justifyContent="center">
          {isLoading ? (
            <Skeleton w="100%" minH="90%" />
          ) : (
            <Image
              src={preview?.plprogram$url}
              alt={data?.title}
              maxW="100%"
              maxHeight="100%"
              fallback={<ImageFallback />}
            />
          )}
        </Container>
      </GridItem>
      <GridItem>
        {isLoading ? (
          <Skeleton w="70%" minH="2rem" />
        ) : (
          <HStack >
            <Heading fontSize="3xl" fontWeight={600}>
            {data?.title}
          </Heading>
          <FavoriteMark isMarked={isMarked} onClick={onMark}/>
          </HStack>
        )}
      </GridItem>
      <GridItem>
        {isLoading ? (
          <Skeleton w="20%" minH="0.8em" />
        ) : (
          <Text fontSize="sm" color="gray.500">
            {data?.plprogram$year}
          </Text>
        )}
      </GridItem>
      <GridItem>
        {isLoading && (
          <HStack w="100%">
            {new Array(3).fill(1).map((_, index) => (
              <Skeleton key={index} h="25px" w="60px" />
            ))}
          </HStack>
        )}
        <HStack>
          {data?.plprogram$tags.map(
            (tag) =>
              tag.plprogram$scheme === "genre" && (
                <Tag
                  variant="subtle"
                  colorScheme="blue"
                  size="md"
                  key={tag.plprogram$title}
                >
                  {tag.plprogram$title}
                </Tag>
              )
          )}
        </HStack>
      </GridItem>

      <GridItem>
        <SkeletonText isLoaded={isSuccess} noOfLines={3} w="100%">
          <Text>{data?.description}</Text>
        </SkeletonText>
      </GridItem>
      <GridItem colSpan={{ md: 2 }}>
        {isLoading ? (
          <Skeleton my={4} isLoaded={isSuccess} w="35%" minH="1.8rem" />
        ) : (
          <Heading my={4} size="xl">Cast</Heading>
        )}
        <CreditsList
          credits={data?.plprogram$credits ?? []}
          isLoading={isLoading}
        />
      </GridItem>
      {data?.tdc$youtubeTrailer && (
        <GridItem colSpan={{ md: 2 }} className="video-background">
          {isLoading ? (
            <Skeleton my={4} minW="25%" minH="1.5rem" />
          ) : (
            <Heading my={4} size="xl">Trailer</Heading>
          )}
          <AspectRatio maxW="100%" ratio={16 / 9}>
            <iframe
              src={`https://www.youtube.com/embed/${data?.tdc$youtubeTrailer}`}
              allowFullScreen
              title={data?.title}
            />
          </AspectRatio>
        </GridItem>
      )}
    </Grid>
  );
};

export default FilmDetails;
