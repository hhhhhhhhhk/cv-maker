import { forwardRef } from 'react';
import { useResume, templateStyles } from '../store/ResumeContext';
import type { ModuleType } from '../types/resume';

export const ResumePreview = forwardRef<HTMLDivElement>((_, ref) => {
  const { state } = useResume();
  const { resumeData, currentTemplate, activeModules, moduleOrder, sectionTitles } = state;
  const { basicInfo, education, coreSkills, workExperience, internshipExperience, projectExperience, customModules } = resumeData;
  const style = templateStyles[currentTemplate];

  const hasColorBar = currentTemplate !== 'classic';

  const renderModule = (module: ModuleType) => {
    if (!activeModules.includes(module)) return null;

    switch (module) {
      case 'basicInfo':
        // 基本信息模块 - 渲染其他信息（只有内容不为空时才显示）
        if (basicInfo.other && basicInfo.other.trim() && !basicInfo.other.match(/^<[^>]+>$/)) {
          return <div className="resume-contact" style={{ marginTop: 8 }} dangerouslySetInnerHTML={{ __html: basicInfo.other }} />;
        }
        return null;

      case 'education':
        if (education.length === 0) return null;
        return (
          <div className="resume-section">
            <div className="resume-section-title" style={{ color: style.titleColor, borderColor: style.titleBorderColor }}>
              {sectionTitles.education || '教育经历'}
            </div>
            {education.map((edu) => (
              <div key={edu.id} className="resume-item">
                <div className="resume-item-row1">
                  <span className="resume-item-title">{edu.school || '学校名称'}</span>
                  <span className="resume-item-meta">{[edu.startDate, edu.endDate].filter(Boolean).join(' - ')}</span>
                </div>
                <div className="resume-item-row2">
                  <span>{[edu.major, edu.degree].filter(Boolean).join(' ')}</span>
                  <span className="resume-item-location">{edu.location || ''}</span>
                </div>
                {edu.description ? <div className="resume-item-content" dangerouslySetInnerHTML={{ __html: edu.description }} /> : null}
              </div>
            ))}
          </div>
        );

      case 'coreSkills':
        if (!coreSkills) return null;
        return (
          <div className="resume-section">
            <div className="resume-section-title" style={{ color: style.titleColor, borderColor: style.titleBorderColor }}>
              {sectionTitles.coreSkills || '核心能力'}
            </div>
            <div className="resume-skills" dangerouslySetInnerHTML={{ __html: coreSkills }} />
          </div>
        );

      case 'workExperience':
        if (workExperience.length === 0) return null;
        return (
          <div className="resume-section">
            <div className="resume-section-title" style={{ color: style.titleColor, borderColor: style.titleBorderColor }}>
              {sectionTitles.workExperience || '工作经历'}
            </div>
            {workExperience.map((work) => (
              <div key={work.id} className="resume-item">
                <div className="resume-item-row1">
                  <span className="resume-item-title">{work.company || '公司名称'}</span>
                  <span className="resume-item-meta">{[work.startDate, work.endDate].filter(Boolean).join(' - ')}</span>
                </div>
                <div className="resume-item-row2">
                  <span>{work.position || ''}</span>
                  <span className="resume-item-location">{work.location || ''}</span>
                </div>
                {work.description ? <div className="resume-item-content" dangerouslySetInnerHTML={{ __html: work.description }} /> : null}
              </div>
            ))}
          </div>
        );

      case 'internshipExperience':
        if (internshipExperience.length === 0) return null;
        return (
          <div className="resume-section">
            <div className="resume-section-title" style={{ color: style.titleColor, borderColor: style.titleBorderColor }}>
              {sectionTitles.internshipExperience || '实习经历'}
            </div>
            {internshipExperience.map((intern) => (
              <div key={intern.id} className="resume-item">
                <div className="resume-item-row1">
                  <span className="resume-item-title">{intern.company || '公司名称'}</span>
                  <span className="resume-item-meta">{[intern.startDate, intern.endDate].filter(Boolean).join(' - ')}</span>
                </div>
                <div className="resume-item-row2">
                  <span>{intern.position || ''}</span>
                  <span className="resume-item-location">{intern.location || ''}</span>
                </div>
                {intern.description ? <div className="resume-item-content" dangerouslySetInnerHTML={{ __html: intern.description }} /> : null}
              </div>
            ))}
          </div>
        );

      case 'projectExperience':
        if (projectExperience.length === 0) return null;
        return (
          <div className="resume-section">
            <div className="resume-section-title" style={{ color: style.titleColor, borderColor: style.titleBorderColor }}>
              {sectionTitles.projectExperience || '项目经验'}
            </div>
            {projectExperience.map((proj) => (
              <div key={proj.id} className="resume-item">
                <div className="resume-item-row1">
                  <span className="resume-item-title">{proj.name || '项目名称'}</span>
                  <span className="resume-item-meta">{[proj.startDate, proj.endDate].filter(Boolean).join(' - ')}</span>
                </div>
                <div className="resume-item-row2">
                  <span>{proj.role || ''}</span>
                </div>
                {proj.description ? <div className="resume-item-content" dangerouslySetInnerHTML={{ __html: proj.description }} /> : null}
              </div>
            ))}
          </div>
        );

      case 'custom':
        if (customModules.length === 0) return null;
        return (
          <div className="resume-section">
            {customModules.map((mod) => (
              <div key={mod.id}>
                <div className="resume-section-title" style={{ color: style.titleColor, borderColor: style.titleBorderColor }}>
                  {mod.title || '自定义模块'}
                </div>
                <div className="resume-skills" dangerouslySetInnerHTML={{ __html: mod.content }} />
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="resume-container" id="resume-preview" ref={ref}>
      {/* 顶部彩色装饰条 */}
      {currentTemplate === 'gray' && <div style={{ height: 6, background: '#666', margin: '-20mm -20mm 0 -20mm' }} />}
      {currentTemplate === 'purple' && <div style={{ height: 6, background: '#7c3aed', margin: '-20mm -20mm 0 -20mm' }} />}
      {currentTemplate === 'blue' && <div style={{ height: 6, background: '#2563eb', margin: '-20mm -20mm 0 -20mm' }} />}

      {/* 头像已禁用 */}
      {/*{basicInfo.avatar && (
        <div style={{ textAlign: 'center', marginBottom: 10, marginTop: hasColorBar ? 60 : 0 }}>
          <img
            src={basicInfo.avatar}
            style={{ width: 100, height: 133, objectFit: 'cover', borderRadius: 4, border: '1px solid #e5e7eb', display: 'inline-block' }}
            alt="头像"
          />
        </div>
      )}*/}

      {/* 姓名 */}
      {basicInfo.name && (
        <div className="resume-name" style={hasColorBar && !basicInfo.avatar ? { marginTop: 60 } : {}}>
          {basicInfo.name}
        </div>
      )}

      {/* 联系信息 */}
      {([basicInfo.phone, basicInfo.email, basicInfo.location, basicInfo.birthDate].filter(Boolean).length > 0) && (
        <div className="resume-contact">
          {[basicInfo.phone, basicInfo.email, basicInfo.location, basicInfo.birthDate].filter(Boolean).join('  |  ')}
        </div>
      )}

      {/* 渲染模块 */}
      {moduleOrder.map((module) => renderModule(module))}
    </div>
  );
});
