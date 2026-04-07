import { useState } from 'react';
import { useResume } from '../store/ResumeContext';
import type { ModuleType } from '../types/resume';
import { MODULE_NAMES } from '../types/resume';

interface SortModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SortModal({ isOpen, onClose }: SortModalProps) {
  const { state, dispatch } = useResume();
  const [items, setItems] = useState<ModuleType[]>([]);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  // 当模态框打开时，初始化排序列表
  const handleOpen = () => {
    // 排除基本信息模块
    setItems(state.moduleOrder.filter((m) => m !== 'basicInfo'));
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  if (isOpen && items.length === 0) {
    handleOpen();
  }

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === dropIndex) return;

    const newItems = [...items];
    const [removed] = newItems.splice(draggedIndex, 1);
    newItems.splice(dropIndex, 0, removed);
    setItems(newItems);
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleSave = () => {
    // 保持基本信息在第一位
    const newOrder: ModuleType[] = ['basicInfo', ...items];
    dispatch({ type: 'SET_MODULE_ORDER', payload: newOrder });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay show" onClick={onClose}>
      <div
        className="sort-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <h3>调整模块顺序</h3>
        <p>拖动模块进行排序</p>
        <div className="sort-modal-list">
          {items.map((module, index) => (
            <div
              key={module}
              className={`sort-item ${
                draggedIndex === index ? 'dragging' : ''
              } ${dragOverIndex === index ? 'drag-over' : ''}`}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, index)}
              onDragEnd={handleDragEnd}
            >
              <span className="drag-handle">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="8" y1="6" x2="16" y2="6" />
                  <line x1="8" y1="12" x2="16" y2="12" />
                  <line x1="8" y1="18" x2="16" y2="18" />
                </svg>
              </span>
              <span className="sort-label">{MODULE_NAMES[module]}</span>
            </div>
          ))}
        </div>
        <button
          className="btn btn-secondary"
          onClick={handleSave}
        >
          关闭
        </button>
      </div>
    </div>
  );
}
