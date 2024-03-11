import React, { useState } from "react";

const FileUpload = ({
  acceptedTypes,
  onUpload,
  errorMessage,
  fieldName,
  instructions,
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [validationError, setValidationError] = useState(false);

  const handleChange = (event) => {
    const file = event.target.files[0];

    if (acceptedTypes.includes(file.type)) {
      setSelectedFile(file);
      setValidationError(false);
      onUpload(file, fieldName); // Pass the file to the parent component
    } else {
      setSelectedFile(null);
      setValidationError(true);
    }
  };

  return (
    <div className="file-upload">
      <div className="instructions">
        <ul style={{ textAlign: "left" }}>
          {instructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ul>
      </div>
      <div className="upload-section">
        <input type="file" onChange={handleChange} />
        {validationError && <p style={{ color: "red" }}>{errorMessage}</p>}
      </div>
    </div>
  );
};

export default FileUpload;
