import React, { useState } from 'react';

interface CodeBlockAdvancedProps {
  code: string;
  language?: string;
}

export function CodeBlockAdvanced({ code, language = 'javascript' }: CodeBlockAdvancedProps) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="border rounded-lg overflow-hidden bg-gray-900 text-gray-100">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b text-xs">
        <span className="font-mono text-gray-400">{language}</span>
        <button onClick={handleCopy} className="px-3 py-1 text-gray-400 hover:text-white bg-gray-700 hover:bg-gray-600 rounded transition">
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>
      <pre className="overflow-auto p-4 text-sm leading-6 font-mono">
        <code>{code}</code>
      </pre>
    </div>
  );
}
