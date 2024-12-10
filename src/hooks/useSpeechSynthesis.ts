import { useCallback, useRef } from 'react';

export function useSpeechSynthesis() {
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  const cancelSpeech = useCallback(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }, []);

  const speak = useCallback((text: string) => {
    if (!window.speechSynthesis) {
      alert('Text-to-speech is not supported in this browser.');
      return;
    }

    // Cancel any ongoing speech
    cancelSpeech();

    // Create and store new utterance
    const utterance = new SpeechSynthesisUtterance(text);
    speechRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [cancelSpeech]);

  return { speak, cancelSpeech };
}