import {
  Avatar,
  LinkBox,
  Skeleton,
  SkeletonCircle,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FC } from "react";
import { Credit } from "../api/types";

const CreditItem: FC<{ credit: Credit }> = ({ credit }) => {
  return (
     <LinkBox
      p={1}
      overflow="hidden"
      transition="transform 0.3s ease"
      justifyContent="space-between"
      sx={{
        "&:hover": {
          transform: "scale(1.05)",
        },
      }}
      as={VStack}
    >
      <Avatar size="md" />
      <Text size="sm" color="gray.500" textTransform="capitalize">
        {credit.plprogram$creditType}
      </Text>
      <Text size="md" fontWeight={600}>
        {credit.plprogram$personName}
      </Text>
    </LinkBox>
  );
};

export default CreditItem;

export const CreditItemSkeleton = () => {
  return (
    <VStack spacing={1}>
      <SkeletonCircle size="12" />
      <Skeleton w="100px" height="1.25rem" />
      <Skeleton w="50%" height="0.75rem" />
    </VStack>
  );
};
