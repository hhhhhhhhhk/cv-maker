import { useState, useRef } from 'react';
import { ResumeProvider, useResume } from './store/ResumeContext';
import { ModuleSelector } from './components/ModuleSelector';
import { BasicInfoEditor } from './components/BasicInfoEditor';
import {
  EducationEditor,
  CoreSkillsEditor,
  WorkExperienceEditor,
  InternshipExperienceEditor,
  ProjectExperienceEditor,
  CustomModuleEditor,
} from './components/SectionEditor';
import { TemplateSelector } from './components/TemplateSelector';
import { ResumePreview } from './components/ResumePreview';
import { SortModal } from './components/SortModal';
import type { ResumeData } from './types/resume';
import './App.css';

// 示例数据
const sampleData: ResumeData = {
  basicInfo: {
    name: '张三',
    phone: '13800138000',
    email: 'zhangsan@example.com',
    location: '上海',
    birthDate: '2000-01',
    other: '求职意向：前端开发工程师',
    avatar: '',
  },
  education: [
    {
      id: 1,
      school: '上海交通大学',
      degree: '硕士',
      major: '计算机科学',
      startDate: '2022.09',
      endDate: '2024.06',
      location: '上海',
      description: '相关课程：数据结构、算法设计、机器学习',
    },
  ],
  coreSkills: '<ul><li>熟练掌握 React、Vue 等前端框架</li><li>熟悉 TypeScript、Node.js 开发</li><li>了解微服务架构与容器化部署</li></ul>',
  workExperience: [
    {
      id: 1,
      company: '字节跳动',
      position: '前端开发工程师',
      startDate: '2024.07',
      endDate: '至今',
      location: '上海',
      description: '<ul><li>负责公司核心业务前端开发</li><li>参与技术架构设计与优化</li></ul>',
    },
  ],
  internshipExperience: [
    {
      id: 1,
      company: '某知名企业',
      position: '前端开发实习生',
      startDate: '2021.06',
      endDate: '2021.09',
      location: '北京',
      description: '<ul><li>参与前端页面开发，完成多个功能模块</li><li>协助团队进行代码审查和优化</li><li>学习并掌握 Vue.js 框架</li></ul>',
    },
  ],
  projectExperience: [
    {
      id: 1,
      name: '个人博客系统',
      role: '全栈开发',
      startDate: '2023.01',
      endDate: '2023.06',
      description: '<ul><li>使用 React + Node.js 构建全栈博客</li><li>实现文章发布、评论、标签分类功能</li></ul>',
    },
  ],
  customModules: [
    {
      id: 1,
      title: '获奖荣誉',
      content: '<ul><li>校级一等奖学金 (2022)</li><li>ACM 程序设计竞赛铜奖</li></ul>',
    },
  ],
};

// 主应用组件
function AppContent() {
  const { state, dispatch } = useResume();
  const [activeTab, setActiveTab] = useState<'editor' | 'templates'>('editor');
  const [isSortModalOpen, setIsSortModalOpen] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [showSampleConfirm, setShowSampleConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 导出 JSON
  const exportJSON = () => {
    const dataStr = JSON.stringify(state.resumeData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resume.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  // 导入 JSON
  const importJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target?.result as string);
          dispatch({ type: 'LOAD_DATA', payload: data });
        } catch {
          alert('JSON 格式错误');
        }
      };
      reader.readAsText(file);
    }
  };

  // 导出 PDF（通过 API）
  const exportPDF = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/hello', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(state.resumeData),
      });
      const data = await response.json();
      console.log('PDF 导出请求已发送', data);
      alert('PDF 导出功能正在开发中，请稍候');
    } catch (error) {
      console.error('导出失败', error);
      alert('导出失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  // 填充示例数据
  const confirmFillSample = () => {
    dispatch({ type: 'LOAD_DATA', payload: sampleData });
    // 确保所有模块都是激活状态
    dispatch({ type: 'TOGGLE_MODULE', payload: 'education' });
    dispatch({ type: 'TOGGLE_MODULE', payload: 'coreSkills' });
    dispatch({ type: 'TOGGLE_MODULE', payload: 'workExperience' });
    dispatch({ type: 'TOGGLE_MODULE', payload: 'internshipExperience' });
    dispatch({ type: 'TOGGLE_MODULE', payload: 'projectExperience' });
    dispatch({ type: 'TOGGLE_MODULE', payload: 'custom' });
    setShowSampleConfirm(false);
  };

  // 清空数据
  const confirmClearData = () => {
    dispatch({ type: 'CLEAR_ALL' });
    setShowClearConfirm(false);
  };

  // 复制微信号
  const copyWechat = () => {
    navigator.clipboard.writeText('7424986484');
    alert('小红书号已复制');
  };

  const { activeModules } = state;

  return (
    <>
      {/* 顶部工具栏 */}
      <div className="toolbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <h1>简历生成器</h1>
          <span style={{ fontSize: 12, color: '#999' }}>|</span>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); setShowContactModal(true); }}
            style={{ fontSize: 13, color: '#666', textDecoration: 'none' }}
          >
            联系我们
          </a>
        </div>
        <div className="toolbar-actions">
          <button className="btn btn-secondary" onClick={() => setShowSampleConfirm(true)}>填充示例数据</button>
          <button className="btn btn-secondary" onClick={() => fileInputRef.current?.click()}>导入JSON</button>
          <input ref={fileInputRef} type="file" accept=".json" className="file-input-hidden" onChange={importJSON} />
          <button className="btn btn-secondary" onClick={exportJSON}>导出JSON</button>
          <button className="btn btn-danger" onClick={() => setShowClearConfirm(true)}>清空数据</button>
          <button className={`btn btn-primary ${loading ? 'loading' : ''}`} onClick={exportPDF}>导出PDF</button>
        </div>
      </div>

      {/* 联系我们弹窗 */}
      {showContactModal && (
        <div className="modal-overlay show" onClick={() => setShowContactModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>联系我们</h3>
            <p>欢迎一起讨论～</p>
            <div style={{ background: '#f5f5f5', padding: 24, borderRadius: 12, marginBottom: 20 }}>
              <p style={{ fontSize: 18, fontWeight: 'bold', color: '#333' }}>小红书号</p>
              <p style={{ fontSize: 28, color: '#2563eb', marginTop: 12, fontWeight: 600 }}>7424986484</p>
            </div>
            <button onClick={copyWechat} style={{ padding: '12px 32px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 15, marginBottom: 16 }}>复制小红书号</button>
            <br />
            <button onClick={() => setShowContactModal(false)} style={{ padding: '10px 24px', background: '#e5e7eb', color: '#666', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 14 }}>关闭</button>
          </div>
        </div>
      )}

      {/* 清空数据确认弹窗 */}
      {showClearConfirm && (
        <div className="modal-overlay show" onClick={() => setShowClearConfirm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>确认清空数据</h3>
            <p>此操作将清空所有简历数据，无法恢复。</p>
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setShowClearConfirm(false)}>取消</button>
              <button className="btn btn-danger" onClick={confirmClearData}>确定清空</button>
            </div>
          </div>
        </div>
      )}

      {/* 填充示例数据确认弹窗 */}
      {showSampleConfirm && (
        <div className="modal-overlay show" onClick={() => setShowSampleConfirm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>确认填充示例</h3>
            <p>此操作将覆盖当前所有内容，是否继续？</p>
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setShowSampleConfirm(false)}>取消</button>
              <button className="btn btn-primary" onClick={confirmFillSample}>确定填充</button>
            </div>
          </div>
        </div>
      )}

      {/* 主布局 */}
      <div className="main-container">
        {/* 左侧编辑区 */}
        <div className="editor-panel">
          {/* Tab 切换 */}
          <div className="tab-container">
            <div className={`tab ${activeTab === 'editor' ? 'active' : ''}`} onClick={() => setActiveTab('editor')}>简历编辑</div>
            <div className={`tab ${activeTab === 'templates' ? 'active' : ''}`} onClick={() => setActiveTab('templates')}>简历模板</div>
          </div>

          {/* 简历编辑 Tab */}
          {activeTab === 'editor' && (
            <div id="editor-tab" className="tab-content active">
              <ModuleSelector onOpenSortModal={() => setIsSortModalOpen(true)} />
              <BasicInfoEditor />
              {activeModules.includes('education') && <EducationEditor />}
              {activeModules.includes('coreSkills') && <CoreSkillsEditor />}
              {activeModules.includes('workExperience') && <WorkExperienceEditor />}
              {activeModules.includes('internshipExperience') && <InternshipExperienceEditor />}
              {activeModules.includes('projectExperience') && <ProjectExperienceEditor />}
              {activeModules.includes('custom') && <CustomModuleEditor />}
            </div>
          )}

          {/* 简历模板 Tab */}
          {activeTab === 'templates' && <TemplateSelector />}
        </div>

        {/* 右侧预览区 */}
        <div className="preview-panel">
          <div className="preview-hint">简历预览区（可导出PDF）</div>
          <ResumePreview />
        </div>
      </div>

      {/* 排序弹窗 */}
      <SortModal isOpen={isSortModalOpen} onClose={() => setIsSortModalOpen(false)} />
    </>
  );
}

function App() {
  return (
    <ResumeProvider>
      <AppContent />
    </ResumeProvider>
  );
}

export default App;
