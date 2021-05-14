import React, { ChangeEventHandler, FormEventHandler, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import classes from "./CreateSoundFile.module.scss";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { selectAddAudioFileModal } from "../../state/selectors/modal.selector";

const CreateSoundFile: React.FC = () => {
  const [formInputs, setFormInputs] = useState<{
    name: string;
    file: File | undefined;
  }>({
    name: "",
    file: undefined,
  });

  const {
    showCreateAudioFileModal,
    closeCreateAudioFileModal,
    createSoundFile,
  } = useActions();

  const isModalOpen = useTypedSelector(selectAddAudioFileModal);

  // Form Submit Handler
  const onFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    createSoundFile(formInputs);
  };

  // Form Input Change Handler
  const onFormInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    // Handle both file and text input
    const val =
      e.target.files && e.target.files.length > 0
        ? e.target.files[0]
        : e.target.value;

    setFormInputs((prevState) => ({ ...prevState, [e.target.name]: val }));
  };

  return (
    <div className={classes.Wrapper}>
      <Button
        onClick={showCreateAudioFileModal}
        className={classes.AddNewButton}
        variant="primary"
        size="lg"
      >
        +
      </Button>
      <Modal show={isModalOpen} onHide={closeCreateAudioFileModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Sound File</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onFormSubmit}>
            <Form.Group controlId="createForm.name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                value={formInputs.name}
                onChange={onFormInputChange}
                required
                type="text"
                placeholder="random audio file"
              />
            </Form.Group>
            <Form.Group controlId="createForm.file">
              <Form.Label>File</Form.Label>
              <input
                required
                type="file"
                name="file"
                onChange={onFormInputChange}
                accept="audio/*"
                className="form-control-file"
              />
              {/*<Form.Control type="file" />*/}
            </Form.Group>
            <Form.Group controlId="createForm.btn">
              <Button type="submit" variant="primary">
                Submit
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CreateSoundFile;
