import React from 'react';
import { Mic, MicOff } from 'lucide-react';

interface VoiceControlsProps {
  isListening: boolean;
  onStartListening: () => void;
  disabled?: boolean;
}

export function VoiceControls({ isListening, onStartListening, disabled }: VoiceControlsProps) {
  return (
    <button
      onClick={onStartListening}
      className={`p-3 rounded-full ${
        isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
      } text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
      title={isListening ? 'Listening...' : 'Start speaking'}
      disabled={disabled}
    >
      {isListening ? <MicOff size={24} /> : <Mic size={24} />}
    </button>
  );
}