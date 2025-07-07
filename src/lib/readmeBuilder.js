export const generateReadmeMarkdown = (projectName, techStack, structure) => {
  // 🧠 Auto intro based on keywords
  const keywords = structure.map((s) => s.name.toLowerCase());
  let intro = "This is a software project.";

  if (keywords.includes('index.html') && techStack.includes('HTML')) {
    intro = "A simple front-end website built with HTML.";
  }
  if (techStack.includes('React')) {
    intro = "A React-based web application scaffolded with Vite or Create React App.";
  }
  if (techStack.includes('Next.js')) {
    intro = "A server-side rendered application powered by Next.js.";
  }
  if (techStack.includes('Tailwind CSS')) {
    intro += " Styled using Tailwind CSS.";
  }
  if (techStack.includes('Node.js') && !techStack.includes('React')) {
    intro = "A Node.js-based backend project.";
  }
  if (techStack.includes('Python')) {
    intro = "A Python project. May include scripts, automation or backend services.";
  }

  const folderTree = structure
    .map((item) => `- ${item.isDirectory ? '📂' : '📄'} ${item.name}`)
    .join('\n');

  return `# ${projectName}

## 📖 Overview

${intro}

## 🚀 Getting Started

1. Clone the repository:
\`\`\`bash
git clone https://github.com/your-username/${projectName.toLowerCase().replace(/\s+/g, '-')}.git
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Run the app:
\`\`\`bash
npm run dev
\`\`\`

## 🧰 Technologies Used

- ${techStack.join('\n- ')}

## 📂 Project Structure

To view the full project structure, click below:

<details>
<summary><strong>📁 View Folder Tree</strong></summary>

\`\`\`
${folderTree}
\`\`\`

</details>

## 📄 License

This project is licensed under the MIT License.

## 📬 Contact

For any queries, reach out at [your-email@example.com](mailto:your-email@example.com)
`;
};
