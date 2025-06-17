import { useEffect, useRef, useState } from 'react';
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';

const VoiceInput = ({ onTranscriptUpdate, onListeningChange }) => {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const finalTranscriptRef = useRef('');

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error('Speech Recognition not available');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      let interimTranscript = '';
      let newFinalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          newFinalTranscript += transcript + ' ';
        } else {
          interimTranscript += transcript;
        }
      }

      if (newFinalTranscript) {
        finalTranscriptRef.current += newFinalTranscript;
      }

      onTranscriptUpdate(finalTranscriptRef.current + interimTranscript);
    };

    recognition.onerror = (event) => {
      console.error('Recognition error:', event.error);
      if (event.error === 'no-speech') {
        stopListening();
      }
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
    };
  }, [onTranscriptUpdate]);

  const startListening = () => {
    finalTranscriptRef.current = '';
    recognitionRef.current.start();
    setIsListening(true);
    onListeningChange(true);
  };

  const stopListening = () => {
    recognitionRef.current.stop();
    setIsListening(false);
    onListeningChange(false);
  };

  const toggleListening = () => {
    isListening ? stopListening() : startListening();
  };

  return (
    <button
      type="button"
      onClick={toggleListening}
      className={`p-3 rounded-full transition-colors ${
        isListening 
          ? 'bg-blue-500 text-white' 
          : 'bg-gray-300 hover:bg-gray-300'
      }`}
      aria-label={isListening ? 'Stop listening' : 'Start listening'}
    >
      {isListening ? <FaMicrophoneSlash /> : <FaMicrophone />}
    </button>
  );
};

export default VoiceInput;