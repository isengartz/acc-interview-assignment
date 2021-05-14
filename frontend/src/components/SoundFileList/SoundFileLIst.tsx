import React, { useEffect } from "react";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { selectSoundFiles, selectSoundFilesLoading } from "../../state";
import { Col, Image, Row } from "react-bootstrap";
import SoundFileItem from "./SoundFileItem/SoundFileItem";

import noDataImage from "../../assets/images/no-data.jpg";

const SoundFileList: React.FC = () => {
  const { getAllSoundFiles } = useActions();
  const soundFiles = useTypedSelector(selectSoundFiles);
  const isLoading = useTypedSelector(selectSoundFilesLoading);

  useEffect(() => {
    getAllSoundFiles();
  }, [getAllSoundFiles]);

  return (
    <Row className="mt-5">
      {soundFiles &&
        soundFiles.length > 0 &&
        soundFiles.map((file) => (
          <SoundFileItem
            key={file.id}
            id={file.id}
            url={file.url}
            name={file.name}
          />
        ))}

      {!isLoading && soundFiles.length < 1 && (
        <Col>
          <Image style={{ width: "100%" }} src={noDataImage} />
        </Col>
      )}
    </Row>
  );
};

export default SoundFileList;
