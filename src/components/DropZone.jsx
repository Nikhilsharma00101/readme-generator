import React, { useState } from 'react';

const DropZone = ({ onFileSelect }) => {
  const [highlight, setHighlight] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleDrop = (e) => {
    e.preventDefault();
    setHighlight(false);

    const file = e.dataTransfer.files[0];
    if (file && file.name.endsWith('.zip')) {
      setFileName(file.name);
      onFileSelect(file);
    } else {
      alert("Please upload a valid .zip file");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.name.endsWith('.zip')) {
      setFileName(file.name);
      onFileSelect(file);
    } else {
      alert("Please upload a valid .zip file");
    }
  };

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDragEnter={() => setHighlight(true)}
      onDragLeave={() => setHighlight(false)}
      onDrop={handleDrop}
      className={`w-full max-w-xl mx-auto p-10 border-4 border-dashed rounded-2xl 
        ${highlight ? "border-green-500 bg-green-50" : "border-gray-500 bg-gray-800"} 
        text-white text-center transition-all duration-300`}
    >
      <p className="text-lg font-semibold mb-2">Drag & drop your zipped project folder here</p>
      <p className="text-sm text-gray-300 mb-4">(.zip format only)</p>

      <label className="cursor-pointer inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition">
        Browse File
        <input type="file" accept=".zip" onChange={handleFileChange} className="hidden" />
      </label>

      {fileName && (
        <p className="mt-4 text-sm text-green-400">✅ Uploaded: {fileName}</p>
      )}
    </div>
  );
};

export default DropZone;
