import React, { useCallback, useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { Camera, RotateCcw, StopCircle, Video } from 'lucide-react';

interface VideoRecorderProps {
  questionId: string;
  onVideoRecorded: (questionId: string, blob: Blob) => void;
}

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: 'user',
};

export const VideoRecorder: React.FC<VideoRecorderProps> = ({ questionId, onVideoRecorded }) => {
  const webcamRef = useRef<Webcam>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const [capturing, setCapturing] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const [currentStream, setCurrentStream] = useState<MediaStream | null>(null);
  const [permissionsGranted, setPermissionsGranted] = useState<boolean>(false);

  useEffect(() => {
    const requestPermissions = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setCurrentStream(stream);
        setPermissionsGranted(true);
        if (webcamRef.current?.video) {
          webcamRef.current.video.srcObject = stream;
        }
      } catch (error) {
        console.error('Error al solicitar permisos:', error);
        setPermissionsGranted(false);
      }
    };

    requestPermissions();

    return () => {
      if (currentStream) {
        currentStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleStartCapture = useCallback(() => {
    if (!webcamRef.current?.stream) return;

    chunksRef.current = [];
    setCapturing(true);
    setRecordedBlob(null);

    const stream = webcamRef.current.stream;
    const mimeType = MediaRecorder.isTypeSupported('video/mp4') ? 'video/mp4' : 'video/webm';

    const recorder = new MediaRecorder(stream, { mimeType });

    recorder.ondataavailable = (event) => {
      if (event.data && event.data.size > 0) {
        chunksRef.current.push(event.data);
      }
    };

    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: mimeType });
      setRecordedBlob(blob);
      onVideoRecorded(questionId, blob);
      chunksRef.current = [];
      setCapturing(false);

      // Apagar cámara al terminar
      if (webcamRef.current?.stream) {
        webcamRef.current.stream.getTracks().forEach((track) => track.stop());
        setCurrentStream(null);
      }
    };

    mediaRecorderRef.current = recorder;
    recorder.start();
  }, [questionId, onVideoRecorded]);

  const handleStopCapture = useCallback(() => {
    if (mediaRecorderRef.current && capturing) {
      mediaRecorderRef.current.stop();
    }
  }, [capturing]);

  const handleReset = useCallback(() => {
    setRecordedBlob(null);
    chunksRef.current = [];
    if (mediaRecorderRef.current && capturing) {
      mediaRecorderRef.current.stop();
      setCapturing(false);
    }
  }, [capturing]);

  if (!permissionsGranted) {
    return (
      <div className="text-center text-white">
        <p>No se han otorgado permisos para acceder a la cámara. Por favor, permite el acceso.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div className="relative aspect-video">
          <Webcam
            ref={webcamRef}
            audio
            muted
            videoConstraints={{ ...videoConstraints, facingMode }}
            className="w-full h-full rounded-lg object-cover"
          />
        </div>

        <div className="flex justify-center space-x-4">
          {!capturing && !recordedBlob && (
            <button
              onClick={handleStartCapture}
              className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
              type="button"
            >
              <Video className="w-5 h-5" />
              <span>Iniciar Grabación</span>
            </button>
          )}

          {capturing && (
            <button
              onClick={handleStopCapture}
              className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg animate-pulse"
              type="button"
            >
              <StopCircle className="w-5 h-5" />
              <span>Detener Grabación</span>
            </button>
          )}

          {recordedBlob && (
            <button
              onClick={handleReset}
              className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
              type="button"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Volver a Grabar</span>
            </button>
          )}
        </div>
      </div>

      {recordedBlob && (
        <div className="aspect-video">
          <video controls className="w-full h-full rounded-lg object-cover">
            <source src={URL.createObjectURL(recordedBlob)} type={recordedBlob.type} />
          </video>
        </div>
      )}
    </div>
  );
};
