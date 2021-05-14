import React, { useEffect } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { selectSoundFilesErrors } from "../../state";
import { Toast } from "react-bootstrap";
import { useActions } from "../../hooks/useActions";

const ErrorHandler: React.FC = () => {
  const { clearSoundFileErrors } = useActions();

  const errors = useTypedSelector(selectSoundFilesErrors);

  useEffect(() => {
    let timer: any;
    // Clear all the errors after 3 seconds
    if (errors && errors.length > 0) {
      timer = setTimeout(() => clearSoundFileErrors(), 3000);
    }
    return () => clearTimeout(timer);
  }, [errors, clearSoundFileErrors]);

  return errors && errors.length > 0 ? (
    <div
      aria-live="polite"
      aria-atomic="true"
      style={{
        position: "relative",
        minHeight: "100px",
      }}
    >
      {errors.map((error) => {
        return (
          <Toast
            key={error.message}
            style={{
              position: "absolute",
              top: 0,
              right: 0,
            }}
          >
            <Toast.Header>
              <strong className="mr-auto">Error Occured</strong>
              <small>just now</small>
            </Toast.Header>
            <Toast.Body>{error.message}</Toast.Body>
          </Toast>
        );
      })}
    </div>
  ) : null;
};

export default ErrorHandler;
