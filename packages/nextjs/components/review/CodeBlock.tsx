// @ts-nocheck

'use client';

import React, { useRef, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { Clipboard } from 'lucide-react';

const customTheme = {
  'code[class*="language-"]': {
    backgroundColor: "#fbfbfb",
    color: "#333",
    fontSize: "0.875rem",
    fontFamily: "'Fira Code', monospace",
    padding: "1rem",
    borderRadius: "8px"
  },
  'pre[class*="language-"]': {
    backgroundColor: "#fbfbfb",
    color: "#333",
    padding: "1rem",
    borderRadius: "8px",
    overflowX: "auto",
    maxHeight: "30vh"
  },
  function: { color: "#9b59b6" },
  keyword: { color: "#e74c3c" },
  builtin: { color: "#3498db" },
  string: { color: "#4DAFFF" },
  comment: { color: "#7f8c8d" }
};

interface CodeBlockProps {
  code: string;
  language: string;
  fileName?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language, fileName }) => {
  const [copied, setCopied] = useState(false);
const ref = useRef()
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-[0.8rem] my-4 mb-8 overflow-hidden shadow-sm border border-gray-200 bg-[#fbfbfb] text-gray-700 mb-6">
      {fileName && (
        <div className="flex items-center justify-between bg-[#f5f5f5] px-4 py-2 border-b border-gray-200">
          <span className="text-sm font-medium text-gray-600">{fileName}</span>
          <button
            onClick={handleCopy}
            className="flex items-center space-x-1 text-gray-500 hover:text-gray-700"
          >
            <Clipboard size={14} />
            <span className="ml-1">{copied ? "Copied" : "Copy"}</span>
          </button>
        </div>
      )}

      <div className="max-h-[40vh] overflow-auto">
        <SyntaxHighlighter
        ref={ref}
          language={language}
          style={customTheme}
          customStyle={{
            backgroundColor: "#fbfbfb",
            padding: "1rem",
            fontSize: "0.875rem",
          }}
          codeTagProps={{
            className: "whitespace-pre-wrap"
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CodeBlock;
