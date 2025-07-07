import React, { useState } from 'react';
import DropZone from './components/DropZone';
import { parseZipFile } from './lib/zipParser';
import { generateReadmeMarkdown } from './lib/readmeBuilder';

const App = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [structure, setStructure] = useState([]);
  const [detectedTech, setDetectedTech] = useState([]);
  const [readme, setReadme] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [readmePreviewExpanded, setReadmePreviewExpanded] = useState(false);
  const [showStructure, setShowStructure] = useState(false);


  const handleFileSelect = async (file) => {
    console.log("Selected file:", file);
    setUploadedFile(file);

    try {
      const { structure, tech } = await parseZipFile(file);
      setStructure(structure);
      setDetectedTech(tech);

      const markdown = generateReadmeMarkdown(
        file.name.replace('.zip', ''),
        tech,
        structure
      );

      setReadme(markdown);
      setIsEditing(false);
      setReadmePreviewExpanded(false);
    } catch (error) {
      console.error('Error parsing zip file:', error);
      alert("Failed to read zip file.");
    }
  };

  const handleDownload = () => {
    const blob = new Blob([readme], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'README.md';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const togglePreview = () => setReadmePreviewExpanded(prev => !prev);
  const toggleEdit = () => setIsEditing(prev => !prev);

  const trimmedReadme = readme
    .split('\n')
    .slice(0, 15)
    .join('\n') + '\n...';

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">📄 Auto ReadMe Generator</h1>

      <DropZone onFileSelect={handleFileSelect} />

      {detectedTech.length > 0 && (
        <div className="mt-8 w-full max-w-xl bg-gray-800 rounded-xl p-4">
          <h2 className="text-lg font-semibold mb-2">🧠 Detected Technologies:</h2>
          <ul className="flex flex-wrap gap-2 text-sm text-white">
            {detectedTech.map((tech, index) => (
              <li key={index} className="bg-blue-700 px-3 py-1 rounded-full">{tech}</li>
            ))}
          </ul>
        </div>
      )}

      {structure.length > 0 && readme && (
        <div className="mt-8 w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left - Project Structure */}
          <div className="bg-gray-800 rounded-xl p-4 text-left max-h-[500px] overflow-y-auto">
            <h2 className="text-lg font-semibold mb-2">📁 Project Structure</h2>
            <ul className="text-sm font-mono text-gray-300 space-y-1">
              {structure.map((item, index) => (
                <li key={index}>
                  {item.isDirectory ? '📂' : '📄'} {item.name}
                </li>
              ))}
            </ul>
          </div>

          {/* Right - README */}
          {structure.length > 0 && readme && (
  <div className="mt-8 w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* 📝 Right - README */}
    <div className="col-span-1 md:col-span-2 bg-gray-800 rounded-xl p-4 relative">
      <h2 className="text-lg font-semibold mb-3 flex justify-between items-center">
        📝 README.md
        <div className="space-x-2">
          <button
            onClick={toggleEdit}
            className="bg-yellow-500 hover:bg-yellow-600 text-sm px-3 py-1 rounded"
          >
            {isEditing ? 'Close Edit' : '✏️ Manual Edit'}
          </button>
          <button
            onClick={handleDownload}
            className="bg-blue-600 hover:bg-blue-700 text-sm px-3 py-1 rounded"
          >
            ⬇️ Download
          </button>
        </div>
      </h2>

      {isEditing ? (
        <textarea
          className="w-full h-[400px] bg-gray-900 text-green-300 text-sm font-mono p-3 rounded resize-none outline-none"
          value={readme}
          onChange={(e) => setReadme(e.target.value)}
        />
      ) : (
        <div className="relative max-h-[400px] overflow-y-auto border border-gray-700 rounded p-3 bg-gray-900">
          <pre className="text-sm text-green-300 font-mono whitespace-pre-wrap">
            {readmePreviewExpanded ? readme : trimmedReadme}
          </pre>
          {readme.split('\n').length > 15 && (
            <button
              onClick={togglePreview}
              className="mt-2 text-xs text-blue-400 hover:underline"
            >
              {readmePreviewExpanded ? 'Show Less' : 'Show More'}
            </button>
          )}
        </div>
      )}
    </div>

    {/* 📁 Project Structure - Collapsible */}
    <div className="col-span-1 md:col-span-2 mt-6">
      <button
        onClick={() => setShowStructure((prev) => !prev)}
        className="bg-gray-700 hover:bg-gray-600 px-4 py-2 text-sm rounded text-white font-medium"
      >
        {showStructure ? '📁 Hide Project Structure' : '📂 Show Project Structure'}
      </button>

      {showStructure && (
        <div className="mt-4 bg-gray-800 rounded-xl p-4 text-left max-h-[400px] overflow-y-auto">
          <h2 className="text-lg font-semibold mb-2">📁 Project Structure</h2>
          <ul className="text-sm font-mono text-gray-300 space-y-1">
            {structure.map((item, index) => (
              <li key={index}>
                {item.isDirectory ? '📂' : '📄'} {item.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  </div>
)}

        </div>
      )}
    </div>
  );
};

export default App;
