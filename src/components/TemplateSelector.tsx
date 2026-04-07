import { useResume } from '../store/ResumeContext';
import type { TemplateType } from '../types/resume';

export function TemplateSelector() {
  const { state, dispatch } = useResume();
  const { currentTemplate } = state;

  const templates: { type: TemplateType; name: string; color: string }[] = [
    { type: 'classic', name: '经典黑白', color: '#000' },
    { type: 'gray', name: '灰色标题', color: '#666' },
    { type: 'purple', name: '紫色标题', color: '#7c3aed' },
    { type: 'blue', name: '蓝色标题', color: '#2563eb' },
  ];

  return (
    <div className="tab-content active">
      <p style={{ fontSize: '13px', color: '#666', marginBottom: '16px' }}>
        点击切换模板样式，内容保持不变
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {templates.map((template) => (
          <div
            key={template.type}
            className={`template-text-btn ${currentTemplate === template.type ? 'active' : ''}`}
            onClick={() => dispatch({ type: 'SET_TEMPLATE', payload: template.type })}
          >
            <span style={{ fontWeight: 'bold', fontSize: '14px', color: template.color }}>
              {template.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
