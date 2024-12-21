import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import { ThemeProvider } from './components/context/ThemeProvider'
import WeatherDashboard from './pages/WeatherDashboard'
import CityPage from './pages/CityPage'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'sonner'

function App() {

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5* 60* 1000, 
        gcTime: 10* 60* 1000,   // garbage collection time
        retry: false,
        refetchOnWindowFocus: false
      },
    }
  })
  return (
    <QueryClientProvider client={queryClient}>  
      <BrowserRouter>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <Layout>
              <Routes>
                <Route path="/" element={<WeatherDashboard />}> </Route>
                <Route path="/city/:cityName" element={<CityPage />}> </Route>
              </Routes>
            </Layout>
            <Toaster richColors />
        </ThemeProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
