import React, { useState } from 'react';
import { Button, TextInput, Typography, Switch } from '@neo4j-ndl/react';
import { CogIconOutline, XMarkIconOutline } from '@neo4j-ndl/react/icons';
import { useSystemPrompt } from '../../context/SystemPromptContext';

interface SystemPromptSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

const SystemPromptSettings: React.FC<SystemPromptSettingsProps> = ({ isOpen, onClose }) => {
  const { systemPrompt, setSystemPrompt, isSystemPromptEnabled, setIsSystemPromptEnabled } = useSystemPrompt();
  const [tempPrompt, setTempPrompt] = useState(systemPrompt);
  const [tempEnabled, setTempEnabled] = useState(isSystemPromptEnabled);

  const handleSave = () => {
    setSystemPrompt(tempPrompt);
    setIsSystemPromptEnabled(tempEnabled);
    onClose();
  };

  const handleCancel = () => {
    setTempPrompt(systemPrompt);
    setTempEnabled(isSystemPromptEnabled);
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50'>
      <div
        className='rounded-lg shadow-2xl p-6 w-full max-w-2xl mx-4 border-2'
        style={{
          backgroundColor: 'hsl(var(--card))',
          color: 'hsl(var(--card-foreground))',
          borderColor: '#caf800',
        }}
      >
        <div className='flex items-center justify-between mb-4'>
          <div className='flex items-center gap-2' style={{ color: '#caf800' }}>
            <CogIconOutline className='w-6 h-6' />
            <Typography variant='h3' style={{ color: '#caf800' }}>
              System Prompt Settings
            </Typography>
          </div>
          <Button
            onClick={onClose}
            className='p-1'
            style={{
              backgroundColor: 'transparent',
              color: '#caf800',
              border: 'none',
            }}
          >
            <XMarkIconOutline className='w-6 h-6' />
          </Button>
        </div>

        <div className='space-y-4'>
          <div
            className='flex items-center justify-between p-3 rounded-md border'
            style={{ borderColor: 'rgba(202, 248, 0, 0.3)' }}
          >
            <Typography variant='body-medium'>Enable System Prompt</Typography>
            <Switch isChecked={tempEnabled} onChange={(e) => setTempEnabled(e.target.checked)} />
          </div>

          <div>
            <Typography variant='body-medium' className='mb-2' style={{ color: '#caf800' }}>
              System Prompt
            </Typography>

            <textarea
              value={tempPrompt}
              onChange={(e) => setTempPrompt(e.target.value)}
              placeholder='Enter your system prompt here...'
              rows={6}
              className='w-full rounded-md border focus:outline-none focus:ring-2 transition-all'
              style={{
                backgroundColor: '#000000',
                color: '#ffffff',
                borderColor: 'rgba(202, 248, 0, 0.3)',
                padding: '16px',
              }}
            />

            <Typography variant='body-small' className='mt-2' style={{ color: 'hsl(var(--muted-foreground))' }}>
              This prompt will be added to every user input as context for the AI.
            </Typography>
          </div>

          {tempEnabled && tempPrompt && (
            <div
              className='p-3 rounded-md border'
              style={{
                backgroundColor: 'rgba(202, 248, 0, 0.1)',
                borderColor: 'rgba(202, 248, 0, 0.3)',
              }}
            >
              <Typography variant='body-small' className='font-medium mb-2' style={{ color: '#caf800' }}>
                Preview:
              </Typography>
              <Typography variant='body-small' style={{ color: 'hsl(var(--foreground))' }}>
                {tempPrompt}
              </Typography>
            </div>
          )}
        </div>

        <div className='flex justify-end gap-3 mt-6'>
          <Button
            onClick={handleCancel}
            className='px-4 py-2'
            style={{
              backgroundColor: 'transparent',
              color: '#caf800',
              borderColor: '#caf800',
              border: '1px solid',
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className='px-4 py-2'
            style={{
              backgroundColor: '#caf800',
              color: '#000000',
              borderColor: '#caf800',
            }}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SystemPromptSettings;
