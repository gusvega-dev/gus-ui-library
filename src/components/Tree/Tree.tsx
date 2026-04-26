'use client';

import React from 'react';

interface TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
}

interface TreeProps {
  nodes: TreeNode[];
}

export function Tree({ nodes }: TreeProps) {
  const [expanded, setExpanded] = React.useState<Set<string>>(new Set());
  
  const toggleNode = (id: string) => {
    const newExpanded = new Set(expanded);
    if (newExpanded.has(id)) newExpanded.delete(id);
    else newExpanded.add(id);
    setExpanded(newExpanded);
  };

  const renderNode = (node: TreeNode, level = 0) => (
    <div key={node.id}>
      <button
        onClick={() => toggleNode(node.id)}
        className="flex items-center gap-2 px-2 py-1 hover:bg-neutral-50 rounded"
        style={{ marginLeft: `${level * 20}px` }}
      >
        {node.children && <span className={`transition-transform ${expanded.has(node.id) ? 'rotate-90' : ''}`}>›</span>}
        {!node.children && <span className="w-4" />}
        <span>{node.label}</span>
      </button>
      {expanded.has(node.id) && node.children && node.children.map(child => renderNode(child, level + 1))}
    </div>
  );

  return <div className="select-none">{nodes.map(node => renderNode(node))}</div>;
}
