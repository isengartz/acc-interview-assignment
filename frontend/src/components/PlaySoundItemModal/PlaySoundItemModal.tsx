import React, { useEffect, useRef, useState } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { selectSelectedSoundFile } from "../../state";
import { selectAudioPlayerModal } from "../../state/selectors/modal.selector";
import { Button, Modal } from "react-bootstrap";
import WaveSurfer from "wavesurfer.js";
import { useUpdateEffect } from "../../hooks/useUpdateEffect";
import { useActions } from "../../hooks/useActions";
import { generateS3Url } from "../../util/generate-s3-url";

const PlaySoundItemModal: React.FC = () => {
  const selectedSoundFile = useTypedSelector(selectSelectedSoundFile);
  const modalIsVisible = useTypedSelector(selectAudioPlayerModal);

  const { closeAudioPlayerModal, clearSelectedSoundFile } = useActions();

  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  let waveSurferRef = useRef<HTMLDivElement | null>(null);
  let waveSurfer = useRef<WaveSurfer>();

  // Initialize WaveSurfer
  useEffect(() => {
    if (!waveSurferRef.current) return;

    waveSurfer.current = WaveSurfer.create({
      container: waveSurferRef.current,
      waveColor: "violet",
      progressColor: "purple",
    });
    // Attach Event Handler
    waveSurfer.current?.on("ready", () => {
      setIsPlaying(true);
      waveSurfer.current?.play();
    });
  }, [modalIsVisible]);

  // Load the sound file
  useUpdateEffect(() => {
    if (selectedSoundFile) {
      waveSurfer.current!.load(generateS3Url(selectedSoundFile.url));
    }
  }, [selectedSoundFile]);

  const onModalHide = () => {
    waveSurfer.current?.stop();
    setIsPlaying(false);
    clearSelectedSoundFile();
    closeAudioPlayerModal();
  };

  const onStartStopBtnClick = () => {
    isPlaying ? waveSurfer.current?.pause() : waveSurfer.current?.play();
    setIsPlaying(!isPlaying);
  };

  return (
    <Modal id="play-sound-modal" show={modalIsVisible} onHide={onModalHide}>
      <Modal.Header closeButton>
        <Modal.Title>
          Currently playing: {selectedSoundFile && selectedSoundFile?.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div id="wave-surfer-container" ref={waveSurferRef} />
        <div className="mt-2">
          <Button onClick={onStartStopBtnClick} variant="primary">
            {isPlaying ? "Pause" : "Start"}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default PlaySoundItemModal;
