import { useResume } from '../store/ResumeContext';
import type { ModuleType } from '../types/resume';
import { MODULE_NAMES } from '../types/resume';

interface ModuleSelectorProps {
  onOpenSortModal: () => void;
}

export function ModuleSelector({ onOpenSortModal }: ModuleSelectorProps) {
  const { state, dispatch } = useResume();
  const { activeModules, moduleOrder } = state;

  const toggleModule = (module: ModuleType) => {
    if (module === 'basicInfo') return; // 基本信息不能取消
    dispatch({ type: 'TOGGLE_MODULE', payload: module });
  };

  // 基本信息始终在第一位
  const otherModules = moduleOrder.filter((m) => m !== 'basicInfo');

  return (
    <div className="module-selector">
      <button className="module-btn active" disabled style={{ cursor: 'default', opacity: 0.7 }}>
        基本信息
      </button>
      {otherModules.map((module) => (
        <button
          key={module}
          className={`module-btn ${activeModules.includes(module) ? 'active' : ''}`}
          onClick={() => toggleModule(module)}
        >
          {MODULE_NAMES[module]}
        </button>
      ))}
      <span style={{ color: '#e5e7eb', borderLeft: '1px dashed #e5e7eb', height: '16px', margin: '0 4px' }} />
      <button className="module-btn" onClick={onOpenSortModal} style={{ borderStyle: 'dashed' }}>
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          style={{ marginRight: 4 }}
        >
          <line x1="3" y1="9" x2="21" y2="9" />
          <line x1="3" y1="15" x2="21" y2="15" />
          <line x1="3" y1="3" x2="3" y2="21" />
          <line x1="21" y1="3" x2="21" y2="21" />
        </svg>
        修改排序
      </button>
    </div>
  );
}
