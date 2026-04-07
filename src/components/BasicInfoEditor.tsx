import { useResume } from '../store/ResumeContext';
import { RichEditor } from './RichEditor';

export function BasicInfoEditor() {
  const { state, dispatch } = useResume();
  const { basicInfo } = state.resumeData;

  const handleChange = (field: string, value: string) => {
    dispatch({ type: 'UPDATE_BASIC_INFO', payload: { [field]: value } });
  };

  return (
    <div className="form-section">
      <div className="form-section-title">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
        基本信息
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>姓名</label>
          <input
            type="text"
            value={basicInfo.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="输入姓名"
          />
        </div>
        <div className="form-group">
          <label>出生年月</label>
          <input
            type="text"
            value={basicInfo.birthDate}
            onChange={(e) => handleChange('birthDate', e.target.value)}
            placeholder="例如2000-01"
          />
        </div>
      </div>
      <div className="form-group">
        <label>电话</label>
        <input
          type="text"
          value={basicInfo.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          placeholder="13xxxxxxxx"
        />
      </div>
      <div className="form-group">
        <label>邮箱</label>
        <input
          type="email"
          value={basicInfo.email}
          onChange={(e) => handleChange('email', e.target.value)}
          placeholder="example@email.com"
        />
      </div>
      <div className="form-group">
        <label>所在城市</label>
        <input
          type="text"
          value={basicInfo.location}
          onChange={(e) => handleChange('location', e.target.value)}
          placeholder="上海"
        />
      </div>
      <div className="form-group">
        <label>其他信息</label>
        <RichEditor
          id="basicInfo-other"
          value={basicInfo.other}
          onChange={(html) => handleChange('other', html)}
          placeholder="个人简介、求职意向、其他信息..."
        />
      </div>
    </div>
  );
}
