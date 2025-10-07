import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SystemPromptContextType {
  systemPrompt: string;
  setSystemPrompt: (prompt: string) => void;
  isSystemPromptEnabled: boolean;
  setIsSystemPromptEnabled: (enabled: boolean) => void;
}

const SystemPromptContext = createContext<SystemPromptContextType | undefined>(undefined);

interface SystemPromptProviderProps {
  children: ReactNode;
}

export const SystemPromptProvider: React.FC<SystemPromptProviderProps> = ({ children }) => {
  const [systemPrompt, setSystemPrompt] = useState<string>(
    localStorage.getItem('systemPrompt') ||
      'You are a helpful AI assistant. Please provide accurate and helpful responses based on the context provided.'
  );
  const [isSystemPromptEnabled, setIsSystemPromptEnabled] = useState<boolean>(
    localStorage.getItem('systemPromptEnabled') === 'true'
  );

  const handleSetSystemPrompt = (prompt: string) => {
    setSystemPrompt(prompt);
    localStorage.setItem('systemPrompt', prompt);
  };

  const handleSetSystemPromptEnabled = (enabled: boolean) => {
    setIsSystemPromptEnabled(enabled);
    localStorage.setItem('systemPromptEnabled', enabled.toString());
  };

  return (
    <SystemPromptContext.Provider
      value={{
        systemPrompt,
        setSystemPrompt: handleSetSystemPrompt,
        isSystemPromptEnabled,
        setIsSystemPromptEnabled: handleSetSystemPromptEnabled,
      }}
    >
      {children}
    </SystemPromptContext.Provider>
  );
};

export const useSystemPrompt = () => {
  const context = useContext(SystemPromptContext);
  if (context === undefined) {
    throw new Error('useSystemPrompt must be used within a SystemPromptProvider');
  }
  return context;
};
