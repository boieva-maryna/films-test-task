import { Container } from "@chakra-ui/react";
import { FC } from "react";
import { Outlet } from "react-router";

const AppLayout: FC = () => {
  return (
    <Container
      p={2}
      as="main"
      centerContent
      maxWidth="100%"
      minHeight="100vh"
      alignItems="stretch"
    >
      <Outlet />
    </Container>
  );
};

export default AppLayout;
