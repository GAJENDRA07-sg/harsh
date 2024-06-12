import './App.css';
import './index.css';
import { ApiProvider } from './components/contexts/ApiContext';
import AppWrapper from './components/AppWrapper';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ApiProvider>
      <AppWrapper />
    </ApiProvider>
  </QueryClientProvider>
);

export default App;
