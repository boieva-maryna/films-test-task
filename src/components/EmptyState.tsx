import { FC, PropsWithChildren } from "react";
import{FiSearch} from "react-icons/fi"
import { Icon, Box } from '@chakra-ui/react'
import { IconType } from "react-icons/lib";

interface Props extends PropsWithChildren{
    icon?:IconType
}


const EmptyState: FC<Props> = ({children, icon=FiSearch}) => {
  
    return (
      <Box
       display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="100%"
        flex={1}
      >
        <Icon as={icon} boxSize="15%" mr={0} />
       {children}
      </Box>
    );

};

export default EmptyState;
