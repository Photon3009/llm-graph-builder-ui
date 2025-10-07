import './App.css';
import '@neo4j-ndl/base/lib/neo4j-ds-styles.css';
import ThemeWrapper from './context/ThemeWrapper';
import { SystemPromptProvider } from './context/SystemPromptContext';
import QuickStarter from './components/QuickStarter';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { APP_SOURCES } from './utils/Constants';
import ErrorBoundary from './components/UI/ErrroBoundary';
import { Toaster, SpotlightProvider } from '@neo4j-ndl/react';
const Home: React.FC = () => {
  return (
    <>
      {APP_SOURCES != undefined && APP_SOURCES.includes('gcs') ? (
        <ErrorBoundary>
          <GoogleOAuthProvider clientId={process.env.VITE_GOOGLE_CLIENT_ID as string}>
            <ThemeWrapper>
              <SystemPromptProvider>
                <SpotlightProvider>
                  <QuickStarter />
                </SpotlightProvider>
                <Toaster />
              </SystemPromptProvider>
            </ThemeWrapper>
          </GoogleOAuthProvider>
        </ErrorBoundary>
      ) : (
        <ErrorBoundary>
          <ThemeWrapper>
            <SystemPromptProvider>
              <SpotlightProvider>
                <QuickStarter />
              </SpotlightProvider>
              <Toaster />
            </SystemPromptProvider>
          </ThemeWrapper>
        </ErrorBoundary>
      )}
    </>
  );
};

export default Home;
