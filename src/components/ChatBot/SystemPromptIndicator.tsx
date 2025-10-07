import React, { useState } from 'react';
import { Button, Typography, Flex } from '@neo4j-ndl/react';
import { CogIconOutline, InformationCircleIconOutline } from '@neo4j-ndl/react/icons';
import { useSystemPrompt } from '../../context/SystemPromptContext';

interface SystemPromptIndicatorProps {
  onOpenSettings: () => void;
}

const SystemPromptIndicator: React.FC<SystemPromptIndicatorProps> = ({ onOpenSettings }) => {
  const { systemPrompt, isSystemPromptEnabled } = useSystemPrompt();
  const [showPreview, setShowPreview] = useState(false);

  if (!isSystemPromptEnabled || !systemPrompt) {
    return null;
  }

  return (
    <div className='mb-2 p-2 bg-muted rounded-md border border-border'>
      <Flex justifyContent='space-between' alignItems='center' className='mb-1'>
        <Flex alignItems='center' gap='1'>
          <InformationCircleIconOutline className='w-3 h-3 text-muted-foreground' />
          <Typography variant='body-small' className='font-medium'>
            System Prompt Active
          </Typography>
        </Flex>
        <Flex gap='1'>
          <Button
            onClick={() => setShowPreview(!showPreview)}
            className='p-0.5'
            style={{
              backgroundColor: 'transparent',
              color: 'hsl(var(--muted-foreground))',
              border: 'none',
            }}
          >
            <Typography variant='body-small'>{showPreview ? 'Hide' : 'Show'}</Typography>
          </Button>
          <Button
            onClick={onOpenSettings}
            className='p-0.5'
            style={{
              backgroundColor: 'transparent',
              color: 'hsl(var(--muted-foreground))',
              border: 'none',
            }}
          >
            <CogIconOutline className='w-3 h-3' />
          </Button>
        </Flex>
      </Flex>
      {showPreview && (
        <div className='mt-1 p-1 bg-background rounded border border-border max-h-24 overflow-auto'>
          <Typography variant='body-small' className='text-muted-foreground'>
            {systemPrompt}
          </Typography>
        </div>
      )}
    </div>
  );
};

export default SystemPromptIndicator;
