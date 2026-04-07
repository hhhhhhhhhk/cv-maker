import { useRef } from 'react';

interface RichEditorProps {
  id: string;
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export function RichEditor({ id, value, onChange, placeholder }: RichEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);

  const execCommand = (command: string) => {
    if (editorRef.current) {
      editorRef.current.focus();
      document.execCommand(command, false, undefined);
      if (editorRef.current) {
        onChange(editorRef.current.innerHTML);
      }
    }
  };

  return (
    <div className="rich-editor">
      <div className="rich-toolbar">
        <button type="button" onClick={() => execCommand('bold')} title="加粗">
          <b>B</b>
        </button>
        <button type="button" onClick={() => execCommand('insertUnorderedList')} title="无序列表">
          •
        </button>
        <button type="button" onClick={() => execCommand('insertOrderedList')} title="有序列表">
          1.
        </button>
        <button type="button" onClick={() => execCommand('indent')} title="增加缩进">
          →
        </button>
        <button type="button" onClick={() => execCommand('outdent')} title="减少缩进">
          ←
        </button>
      </div>
      <div
        id={id}
        ref={editorRef}
        className="rich-content"
        contentEditable
        data-placeholder={placeholder || '输入内容...'}
        onInput={(e) => onChange(e.currentTarget.innerHTML)}
        dangerouslySetInnerHTML={{ __html: value }}
      />
    </div>
  );
}
