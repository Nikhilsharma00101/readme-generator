import JSZip from 'jszip';

export const parseZipFile = async (file) => {
  const zip = new JSZip();
  const loadedZip = await zip.loadAsync(file);

  const fileStructure = [];
  const detectedFiles = [];

  loadedZip.forEach((relativePath, zipEntry) => {
    fileStructure.push({
      name: zipEntry.name,
      isDirectory: zipEntry.dir,
    });

    // Collect file names for tech detection
    if (!zipEntry.dir) {
      const fileName = zipEntry.name.split('/').pop().toLowerCase();
      detectedFiles.push(fileName);
    }
  });

  // 🔍 Detect tech based on filenames
  const detectedTech = [];

  const fileList = detectedFiles;

  if (fileList.includes('package.json')) {
    detectedTech.push('Node.js');
    if (fileList.includes('next.config.js')) detectedTech.push('Next.js');
    else if (fileList.includes('react.svg') || fileList.includes('vite.config.js')) detectedTech.push('React');
  }

  if (fileList.includes('index.html')) {
    if (!detectedTech.includes('React') && !detectedTech.includes('Next.js'))
      detectedTech.push('HTML');
  }

  if (fileList.includes('tailwind.config.js')) detectedTech.push('Tailwind CSS');
  if (fileList.includes('requirements.txt')) detectedTech.push('Python');
  if (fileList.includes('manage.py')) detectedTech.push('Django');
  if (fileList.includes('flask_app.py')) detectedTech.push('Flask');

  return {
    structure: fileStructure,
    tech: detectedTech,
  };
};
