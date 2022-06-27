import { FC } from "react";
import { Credit } from "../api/types";
import CreditItem, { CreditItemSkeleton } from "./CreditItem";
import { Wrap, WrapItem } from "@chakra-ui/react";

interface Props {
  credits: Credit[];
  isLoading: boolean;
}

const CreditsList: FC<Props> = ({ credits, isLoading }) => {
  return (
    <Wrap spacing={3} >
      {isLoading
        ? new Array(6).fill(1).map((_, index) => (
            <WrapItem key={index}>
              <CreditItemSkeleton />
            </WrapItem>
          ))
        : credits.map((credit, index) => (
            <WrapItem key={index} >
              <CreditItem credit={credit} />
            </WrapItem>
          ))}
    </Wrap>
  );
};

export default CreditsList;
