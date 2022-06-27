import { FC } from 'react'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { Provider } from 'jotai'
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Pages from './Pages';


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const theme = extendTheme({
  config: {
    useSystemColorMode: false,
    initialColorMode: "dark"
  }
});

const App: FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider>
        <ChakraProvider theme={theme}>
          <Pages />
        </ChakraProvider>
      </Provider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default App