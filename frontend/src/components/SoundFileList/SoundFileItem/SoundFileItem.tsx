import React from "react";
import { Button, Card, Col } from "react-bootstrap";
import { useActions } from "../../../hooks/useActions";

interface SoundFileItemProps {
  id: string;
  name: string;
  url: string;
}

const SoundFileItem: React.FC<SoundFileItemProps> = ({ id, name, url }) => {
  const { deleteSoundFile, setSelectedSoundFile, showAudioPlayerModal } =
    useActions();

  const onSelectItem = (id: string) => {
    showAudioPlayerModal();
    setSelectedSoundFile(id);
  };

  return (
    <Col md={4}>
      <Card>
        <Card.Title className="text-center mt-2">{name}</Card.Title>
        <Card.Body className="text-center">
          <Button
            className="m-2"
            variant="primary"
            onClick={() => onSelectItem(id)}
          >
            Play
          </Button>
          <Button
            onClick={() => deleteSoundFile(id)}
            className="m-2"
            variant="danger"
          >
            Delete
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default SoundFileItem;
