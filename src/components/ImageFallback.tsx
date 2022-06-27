import { Icon, Text, VStack } from "@chakra-ui/react";
import { FC } from "react";
import { FiFilm } from "react-icons/fi";

const ImageFallback: FC = () => {
  return (
    <VStack h="100%" justifyContent="center">
      <Icon as={FiFilm} boxSize="50%" color="gray.600"/>
      <Text size="sm" color="gray.600">No image</Text>
    </VStack>
  );
};

export default ImageFallback;
