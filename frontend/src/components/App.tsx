import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "../assets/scss/style.scss";

import SoundFileList from "./SoundFileList/SoundFileLIst";
import CreateSoundFile from "./CreateSoundFile/CreateSoundFile";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { selectSoundFilesLoading } from "../state";
import Loader from "./Loader/Loader";
import ErrorHandler from "./ErrorHandler/ErrorHandler";
import PlaySoundItemModal from "./PlaySoundItemModal/PlaySoundItemModal";

const App: React.FC = () => {
  const loading = useTypedSelector(selectSoundFilesLoading);

  return (
    <div className="app-wrapper">
      <Container className="position-relative">
        <Row>
          <Col>
            <h1 className="text-center">Worst Media Player Universe:</h1>
          </Col>
        </Row>

        <SoundFileList />

        {loading && <Loader />}
      </Container>
      <CreateSoundFile />
      <PlaySoundItemModal />
      <ErrorHandler />
    </div>
  );
};

export default App;
