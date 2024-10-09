import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

type MarkdownRenderProps = {
  content: string;
};

type CodeProps = {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
};

// Custom code component to handle syntax highlighting
const codeComponent = ({
  inline,
  className,
  children,
  ...props
}: CodeProps) => {
  // Extract the language from the className
  const match = /language-(\w+)/.exec(className || '');
  // If it's a code block and a language is specified, use SyntaxHighlighter
  return !inline && match ? (
    <SyntaxHighlighter
      language={match[1]}
      PreTag="div"
      style={oneDark}
      {...props}
    >
      {String(children).replace(/\n$/, '')}
    </SyntaxHighlighter>
  ) : (
    // Otherwise, render inline code
    <code className={className} {...props}>
      {children}
    </code>
  );
};

export default function MarkdownRender({ content }: MarkdownRenderProps) {
  return (
    <div className="markdown-content">
      {/* Render the markdown content using ReactMarkdown */}
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSanitize]}
        components={{ code: codeComponent }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
