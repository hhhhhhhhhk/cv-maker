import { useState } from 'react';
import { useResume } from '../store/ResumeContext';
import type { ModuleType } from '../types/resume';
import { RichEditor } from './RichEditor';
import type {
  Education,
  WorkExperience,
  InternshipExperience,
  ProjectExperience,
  CustomModule,
} from '../types/resume';

// 通用的 Section Header 组件
interface SectionHeaderProps {
  module: ModuleType;
  icon: React.ReactNode;
}

function SectionHeader({ module, icon }: SectionHeaderProps) {
  const { state, dispatch } = useResume();
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(state.sectionTitles[module]);

  const title = state.sectionTitles[module];

  const startEditing = () => {
    setEditValue(title);
    setIsEditing(true);
  };

  const saveTitle = () => {
    const newTitle = editValue.trim() || title;
    dispatch({ type: 'SET_SECTION_TITLE', payload: { module, title: newTitle } });
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      saveTitle();
    }
  };

  return (
    <>
      <div className="section-title-wrapper">
        <div className="form-section-title">
          {icon}
          <span id={`${module}-title-text`}>{title}</span>
        </div>
        <button className="edit-title-btn" onClick={startEditing} title="编辑标题">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </button>
      </div>
      <input
        type="text"
        className="section-title-input"
        id={`${module}-title-input`}
        style={{ display: isEditing ? 'block' : 'none' }}
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onBlur={saveTitle}
        onKeyPress={handleKeyPress}
      />
    </>
  );
}

// 教育经历编辑器
export function EducationEditor() {
  const { state, dispatch } = useResume();
  const { education } = state.resumeData;

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now(),
      school: '',
      degree: '',
      major: '',
      startDate: '',
      endDate: '',
      location: '',
      description: '',
    };
    dispatch({ type: 'ADD_EDUCATION', payload: newEdu });
  };

  const updateEducation = (id: number, field: string, value: string) => {
    dispatch({ type: 'UPDATE_EDUCATION', payload: { id, field, value } });
  };

  const deleteEducation = (id: number) => {
    dispatch({ type: 'DELETE_EDUCATION', payload: id });
  };

  return (
    <div className="form-section">
      <SectionHeader
        module="education"
        icon={
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            <path d="M6 12v5c3 3 9 3 12 0v-5" />
          </svg>
        }
      />
      <div id="education-list">
        {education.map((edu, index) => (
          <div key={edu.id} className="list-item">
            <div className="list-item-header">
              <span className="list-item-title">教育经历 {index + 1}</span>
              <div className="list-item-actions">
                <button className="icon-btn delete" onClick={() => deleteEducation(edu.id)}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>学校名称</label>
                <input
                  type="text"
                  value={edu.school}
                  onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                  placeholder="香港中文大学"
                />
              </div>
              <div className="form-group">
                <label>时间</label>
                <input
                  type="text"
                  value={edu.startDate && edu.endDate ? `${edu.startDate} - ${edu.endDate}` : ''}
                  onChange={(e) => {
                    const parts = e.target.value.split(' - ');
                    updateEducation(edu.id, 'startDate', parts[0] || '');
                    updateEducation(edu.id, 'endDate', parts[1] || '');
                  }}
                  placeholder="2022.08 - 2024.07"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>学位</label>
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                  placeholder="硕士"
                />
              </div>
              <div className="form-group">
                <label>专业</label>
                <input
                  type="text"
                  value={edu.major}
                  onChange={(e) => updateEducation(edu.id, 'major', e.target.value)}
                  placeholder="数据科学"
                />
              </div>
            </div>
            <div className="form-group">
              <label>地点</label>
              <input
                type="text"
                value={edu.location}
                onChange={(e) => updateEducation(edu.id, 'location', e.target.value)}
                placeholder="香港"
              />
            </div>
            <div className="form-group">
              <label>描述（相关课程、科研项目等）</label>
              <RichEditor
                id={`edu-desc-${edu.id}`}
                value={edu.description}
                onChange={(html) => updateEducation(edu.id, 'description', html)}
                placeholder="相关课程：机器学习...科研项目：..."
              />
            </div>
          </div>
        ))}
      </div>
      <button className="add-btn" onClick={addEducation}>+ 添加教育经历</button>
    </div>
  );
}

// 核心能力编辑器
export function CoreSkillsEditor() {
  const { state, dispatch } = useResume();
  const { coreSkills } = state.resumeData;

  return (
    <div className="form-section">
      <SectionHeader
        module="coreSkills"
        icon={
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        }
      />
      <div className="form-group">
        <label>能力描述（支持富文本编辑）</label>
        <RichEditor
          id="coreSkills"
          value={coreSkills}
          onChange={(html) => dispatch({ type: 'SET_CORE_SKILLS', payload: html })}
          placeholder="输入您的核心能力..."
        />
      </div>
    </div>
  );
}

// 工作经历编辑器
export function WorkExperienceEditor() {
  const { state, dispatch } = useResume();
  const { workExperience } = state.resumeData;

  const addWork = () => {
    const newWork: WorkExperience = {
      id: Date.now(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      location: '',
      description: '',
    };
    dispatch({ type: 'ADD_WORK', payload: newWork });
  };

  const updateWork = (id: number, field: string, value: string) => {
    dispatch({ type: 'UPDATE_WORK', payload: { id, field, value } });
  };

  const deleteWork = (id: number) => {
    dispatch({ type: 'DELETE_WORK', payload: id });
  };

  return (
    <div className="form-section">
      <SectionHeader
        module="workExperience"
        icon={
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
          </svg>
        }
      />
      <div id="work-list">
        {workExperience.map((work, index) => (
          <div key={work.id} className="list-item">
            <div className="list-item-header">
              <span className="list-item-title">工作经历 {index + 1}</span>
              <div className="list-item-actions">
                <button className="icon-btn delete" onClick={() => deleteWork(work.id)}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>公司名称</label>
                <input
                  type="text"
                  value={work.company}
                  onChange={(e) => updateWork(work.id, 'company', e.target.value)}
                  placeholder=""
                />
              </div>
              <div className="form-group">
                <label>时间</label>
                <input
                  type="text"
                  value={work.startDate}
                  onChange={(e) => updateWork(work.id, 'startDate', e.target.value)}
                  placeholder="例如2024.08 - 至今"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>职位</label>
                <input
                  type="text"
                  value={work.position}
                  onChange={(e) => updateWork(work.id, 'position', e.target.value)}
                  placeholder=""
                />
              </div>
              <div className="form-group">
                <label>地点</label>
                <input
                  type="text"
                  value={work.location}
                  onChange={(e) => updateWork(work.id, 'location', e.target.value)}
                  placeholder=""
                />
              </div>
            </div>
            <div className="form-group">
              <label>工作描述</label>
              <RichEditor
                id={`work-desc-${work.id}`}
                value={work.description}
                onChange={(html) => updateWork(work.id, 'description', html)}
                placeholder="描述您的工作职责和成就..."
              />
            </div>
          </div>
        ))}
      </div>
      <button className="add-btn" onClick={addWork}>+ 添加工作经历</button>
    </div>
  );
}

// 实习经历编辑器
export function InternshipExperienceEditor() {
  const { state, dispatch } = useResume();
  const { internshipExperience } = state.resumeData;

  const addInternship = () => {
    const newIntern: InternshipExperience = {
      id: Date.now(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      location: '',
      description: '',
    };
    dispatch({ type: 'ADD_INTERNSHIP', payload: newIntern });
  };

  const updateInternship = (id: number, field: string, value: string) => {
    dispatch({ type: 'UPDATE_INTERNSHIP', payload: { id, field, value } });
  };

  const deleteInternship = (id: number) => {
    dispatch({ type: 'DELETE_INTERNSHIP', payload: id });
  };

  return (
    <div className="form-section">
      <SectionHeader
        module="internshipExperience"
        icon={
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
          </svg>
        }
      />
      <div id="internship-list">
        {internshipExperience.map((intern, index) => (
          <div key={intern.id} className="list-item">
            <div className="list-item-header">
              <span className="list-item-title">实习经历 {index + 1}</span>
              <div className="list-item-actions">
                <button className="icon-btn delete" onClick={() => deleteInternship(intern.id)}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>公司名称</label>
                <input
                  type="text"
                  value={intern.company}
                  onChange={(e) => updateInternship(intern.id, 'company', e.target.value)}
                  placeholder=""
                />
              </div>
              <div className="form-group">
                <label>时间</label>
                <input
                  type="text"
                  value={intern.startDate}
                  onChange={(e) => updateInternship(intern.id, 'startDate', e.target.value)}
                  placeholder="例如2024.08 - 至今"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>职位</label>
                <input
                  type="text"
                  value={intern.position}
                  onChange={(e) => updateInternship(intern.id, 'position', e.target.value)}
                  placeholder=""
                />
              </div>
              <div className="form-group">
                <label>地点</label>
                <input
                  type="text"
                  value={intern.location}
                  onChange={(e) => updateInternship(intern.id, 'location', e.target.value)}
                  placeholder=""
                />
              </div>
            </div>
            <div className="form-group">
              <label>实习描述</label>
              <RichEditor
                id={`intern-desc-${intern.id}`}
                value={intern.description}
                onChange={(html) => updateInternship(intern.id, 'description', html)}
                placeholder="描述您的实习职责和收获..."
              />
            </div>
          </div>
        ))}
      </div>
      <button className="add-btn" onClick={addInternship}>+ 添加实习经历</button>
    </div>
  );
}

// 项目经验编辑器
export function ProjectExperienceEditor() {
  const { state, dispatch } = useResume();
  const { projectExperience } = state.resumeData;

  const addProject = () => {
    const newProject: ProjectExperience = {
      id: Date.now(),
      name: '',
      role: '',
      startDate: '',
      endDate: '',
      description: '',
    };
    dispatch({ type: 'ADD_PROJECT', payload: newProject });
  };

  const updateProject = (id: number, field: string, value: string) => {
    dispatch({ type: 'UPDATE_PROJECT', payload: { id, field, value } });
  };

  const deleteProject = (id: number) => {
    dispatch({ type: 'DELETE_PROJECT', payload: id });
  };

  return (
    <div className="form-section">
      <SectionHeader
        module="projectExperience"
        icon={
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
          </svg>
        }
      />
      <div id="project-list">
        {projectExperience.map((proj, index) => (
          <div key={proj.id} className="list-item">
            <div className="list-item-header">
              <span className="list-item-title">项目经验 {index + 1}</span>
              <div className="list-item-actions">
                <button className="icon-btn delete" onClick={() => deleteProject(proj.id)}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="form-group">
              <label>项目名称</label>
              <input
                type="text"
                value={proj.name}
                onChange={(e) => updateProject(proj.id, 'name', e.target.value)}
                placeholder=""
              />
            </div>
            <div className="form-group">
              <label>项目角色</label>
              <input
                type="text"
                value={proj.role}
                onChange={(e) => updateProject(proj.id, 'role', e.target.value)}
                placeholder=""
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>开始时间</label>
                <input
                  type="text"
                  value={proj.startDate}
                  onChange={(e) => updateProject(proj.id, 'startDate', e.target.value)}
                  placeholder=""
                />
              </div>
              <div className="form-group">
                <label>结束时间</label>
                <input
                  type="text"
                  value={proj.endDate}
                  onChange={(e) => updateProject(proj.id, 'endDate', e.target.value)}
                  placeholder=""
                />
              </div>
            </div>
            <div className="form-group">
              <label>项目描述</label>
              <RichEditor
                id={`proj-desc-${proj.id}`}
                value={proj.description}
                onChange={(html) => updateProject(proj.id, 'description', html)}
                placeholder="项目背景、技术栈、您的贡献..."
              />
            </div>
          </div>
        ))}
      </div>
      <button className="add-btn" onClick={addProject}>+ 添加项目经验</button>
    </div>
  );
}

// 自定义模块编辑器
export function CustomModuleEditor() {
  const { state, dispatch } = useResume();
  const { customModules } = state.resumeData;

  const addCustomModule = () => {
    const newModule: CustomModule = {
      id: Date.now(),
      title: '',
      content: '',
    };
    dispatch({ type: 'ADD_CUSTOM', payload: newModule });
  };

  const updateCustom = (id: number, field: string, value: string) => {
    dispatch({ type: 'UPDATE_CUSTOM', payload: { id, field, value } });
  };

  const deleteCustom = (id: number) => {
    dispatch({ type: 'DELETE_CUSTOM', payload: id });
  };

  return (
    <div className="form-section">
      <div className="section-title-wrapper">
        <div className="form-section-title">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <span>自定义模块</span>
        </div>
      </div>
      <div id="custom-list">
        {customModules.map((mod, index) => (
          <div key={mod.id} className="list-item">
            <div className="list-item-header">
              <span className="list-item-title">自定义模块 {index + 1}</span>
              <div className="list-item-actions">
                <button className="icon-btn delete" onClick={() => deleteCustom(mod.id)}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="form-group">
              <label>模块标题</label>
              <input
                type="text"
                value={mod.title}
                onChange={(e) => updateCustom(mod.id, 'title', e.target.value)}
                placeholder="获奖荣誉"
              />
            </div>
            <div className="form-group">
              <label>模块内容</label>
              <RichEditor
                id={`custom-content-${mod.id}`}
                value={mod.content}
                onChange={(html) => updateCustom(mod.id, 'content', html)}
                placeholder="模块内容..."
              />
            </div>
          </div>
        ))}
      </div>
      <button className="add-btn" onClick={addCustomModule}>+ 添加自定义模块</button>
    </div>
  );
}
