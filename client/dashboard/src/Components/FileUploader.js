import React, { useState } from 'react';
import './FileUploader.css';
import axios from 'axios';

function FileUploader() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [mergedPdfLink, setMergedPdfLink] = useState(null);

  const handleFileChange = (e) => {
    const files = e.target.files;
    const fileList = Array.from(files);
    setSelectedFiles([...selectedFiles, ...fileList]);
    e.target.value = null;
  };

  const handleRemoveFile = (fileToRemove) => {
    const updatedFiles = selectedFiles.filter((file) => file !== fileToRemove);
    setSelectedFiles(updatedFiles);
  };

  async function mergePdf() {
    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append('pdf_files', file);
    });

    try {
      const response = await axios.post("http://localhost:5000/upload", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);

      // Set the download link for the merged PDF
      setMergedPdfLink(response.data);
    } catch (error) {
      console.error("Error merging PDFs:", error);
    }
  }

  return (
    <div className="container">
      <div className="file-uploader">
        <label className="custom-file-input">
          Choose files
          <input type="file" name='pdf_files' onChange={handleFileChange} multiple />
        </label>
        {selectedFiles.length > 0 && (
          <div className="selected-files">
            <h3>Selected Files:</h3>
            <ul>
              {selectedFiles.map((file, index) => (
                <li key={index}>
                  {file.name}
                  <button onClick={() => handleRemoveFile(file)}>Remove</button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <button onClick={mergePdf}>Merge PDF</button>

      {mergedPdfLink && (
        <div>
          <h3>Download Merged PDF:</h3>
          <a href={mergedPdfLink} download="merged.pdf">Download Merged PDF</a>
        </div>
      )}
    </div>
  );
}

export default FileUploader;
