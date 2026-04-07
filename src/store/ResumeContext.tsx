import React, { createContext, useContext, useReducer } from 'react';
import type { ReactNode } from 'react';
import type {
  ResumeData,
  TemplateType,
  TemplateStyle,
  ModuleType,
} from '../types/resume';
import { DEFAULT_MODULE_ORDER } from '../types/resume';

// 初始状态
const initialResumeData: ResumeData = {
  basicInfo: {
    name: '',
    phone: '',
    email: '',
    location: '',
    birthDate: '',
    other: '',
    avatar: '',
  },
  education: [],
  coreSkills: '',
  workExperience: [],
  internshipExperience: [],
  projectExperience: [],
  customModules: [],
};

// 状态接口
interface ResumeState {
  resumeData: ResumeData;
  currentTemplate: TemplateType;
  activeModules: ModuleType[];
  moduleOrder: ModuleType[];
  sectionTitles: Record<ModuleType, string>;
}

// Action 类型
type ResumeAction =
  | { type: 'UPDATE_BASIC_INFO'; payload: Partial<ResumeData['basicInfo']> }
  | { type: 'ADD_EDUCATION'; payload: ResumeData['education'][0] }
  | { type: 'UPDATE_EDUCATION'; payload: { id: number; field: string; value: string } }
  | { type: 'DELETE_EDUCATION'; payload: number }
  | { type: 'SET_EDUCATION'; payload: ResumeData['education'] }
  | { type: 'ADD_WORK'; payload: ResumeData['workExperience'][0] }
  | { type: 'UPDATE_WORK'; payload: { id: number; field: string; value: string } }
  | { type: 'DELETE_WORK'; payload: number }
  | { type: 'SET_WORK'; payload: ResumeData['workExperience'] }
  | { type: 'ADD_INTERNSHIP'; payload: ResumeData['internshipExperience'][0] }
  | { type: 'UPDATE_INTERNSHIP'; payload: { id: number; field: string; value: string } }
  | { type: 'DELETE_INTERNSHIP'; payload: number }
  | { type: 'SET_INTERNSHIP'; payload: ResumeData['internshipExperience'] }
  | { type: 'ADD_PROJECT'; payload: ResumeData['projectExperience'][0] }
  | { type: 'UPDATE_PROJECT'; payload: { id: number; field: string; value: string } }
  | { type: 'DELETE_PROJECT'; payload: number }
  | { type: 'SET_PROJECT'; payload: ResumeData['projectExperience'] }
  | { type: 'ADD_CUSTOM'; payload: ResumeData['customModules'][0] }
  | { type: 'UPDATE_CUSTOM'; payload: { id: number; field: string; value: string } }
  | { type: 'DELETE_CUSTOM'; payload: number }
  | { type: 'SET_CUSTOM'; payload: ResumeData['customModules'] }
  | { type: 'SET_CORE_SKILLS'; payload: string }
  | { type: 'SET_TEMPLATE'; payload: TemplateType }
  | { type: 'TOGGLE_MODULE'; payload: ModuleType }
  | { type: 'SET_MODULE_ORDER'; payload: ModuleType[] }
  | { type: 'SET_SECTION_TITLE'; payload: { module: ModuleType; title: string } }
  | { type: 'CLEAR_ALL' }
  | { type: 'LOAD_DATA'; payload: ResumeData };

// Reducer
function resumeReducer(state: ResumeState, action: ResumeAction): ResumeState {
  switch (action.type) {
    case 'UPDATE_BASIC_INFO':
      return {
        ...state,
        resumeData: {
          ...state.resumeData,
          basicInfo: { ...state.resumeData.basicInfo, ...action.payload },
        },
      };

    case 'ADD_EDUCATION':
      return {
        ...state,
        resumeData: {
          ...state.resumeData,
          education: [...state.resumeData.education, action.payload],
        },
      };
    case 'UPDATE_EDUCATION':
      return {
        ...state,
        resumeData: {
          ...state.resumeData,
          education: state.resumeData.education.map((edu) =>
            edu.id === action.payload.id
              ? { ...edu, [action.payload.field]: action.payload.value }
              : edu
          ),
        },
      };
    case 'DELETE_EDUCATION':
      return {
        ...state,
        resumeData: {
          ...state.resumeData,
          education: state.resumeData.education.filter((e) => e.id !== action.payload),
        },
      };
    case 'SET_EDUCATION':
      return {
        ...state,
        resumeData: { ...state.resumeData, education: action.payload },
      };

    case 'ADD_WORK':
      return {
        ...state,
        resumeData: {
          ...state.resumeData,
          workExperience: [...state.resumeData.workExperience, action.payload],
        },
      };
    case 'UPDATE_WORK':
      return {
        ...state,
        resumeData: {
          ...state.resumeData,
          workExperience: state.resumeData.workExperience.map((work) =>
            work.id === action.payload.id
              ? { ...work, [action.payload.field]: action.payload.value }
              : work
          ),
        },
      };
    case 'DELETE_WORK':
      return {
        ...state,
        resumeData: {
          ...state.resumeData,
          workExperience: state.resumeData.workExperience.filter((w) => w.id !== action.payload),
        },
      };
    case 'SET_WORK':
      return {
        ...state,
        resumeData: { ...state.resumeData, workExperience: action.payload },
      };

    case 'ADD_INTERNSHIP':
      return {
        ...state,
        resumeData: {
          ...state.resumeData,
          internshipExperience: [...state.resumeData.internshipExperience, action.payload],
        },
      };
    case 'UPDATE_INTERNSHIP':
      return {
        ...state,
        resumeData: {
          ...state.resumeData,
          internshipExperience: state.resumeData.internshipExperience.map((intern) =>
            intern.id === action.payload.id
              ? { ...intern, [action.payload.field]: action.payload.value }
              : intern
          ),
        },
      };
    case 'DELETE_INTERNSHIP':
      return {
        ...state,
        resumeData: {
          ...state.resumeData,
          internshipExperience: state.resumeData.internshipExperience.filter(
            (i) => i.id !== action.payload
          ),
        },
      };
    case 'SET_INTERNSHIP':
      return {
        ...state,
        resumeData: { ...state.resumeData, internshipExperience: action.payload },
      };

    case 'ADD_PROJECT':
      return {
        ...state,
        resumeData: {
          ...state.resumeData,
          projectExperience: [...state.resumeData.projectExperience, action.payload],
        },
      };
    case 'UPDATE_PROJECT':
      return {
        ...state,
        resumeData: {
          ...state.resumeData,
          projectExperience: state.resumeData.projectExperience.map((proj) =>
            proj.id === action.payload.id
              ? { ...proj, [action.payload.field]: action.payload.value }
              : proj
          ),
        },
      };
    case 'DELETE_PROJECT':
      return {
        ...state,
        resumeData: {
          ...state.resumeData,
          projectExperience: state.resumeData.projectExperience.filter((p) => p.id !== action.payload),
        },
      };
    case 'SET_PROJECT':
      return {
        ...state,
        resumeData: { ...state.resumeData, projectExperience: action.payload },
      };

    case 'ADD_CUSTOM':
      return {
        ...state,
        resumeData: {
          ...state.resumeData,
          customModules: [...state.resumeData.customModules, action.payload],
        },
      };
    case 'UPDATE_CUSTOM':
      return {
        ...state,
        resumeData: {
          ...state.resumeData,
          customModules: state.resumeData.customModules.map((mod) =>
            mod.id === action.payload.id
              ? { ...mod, [action.payload.field]: action.payload.value }
              : mod
          ),
        },
      };
    case 'DELETE_CUSTOM':
      return {
        ...state,
        resumeData: {
          ...state.resumeData,
          customModules: state.resumeData.customModules.filter((m) => m.id !== action.payload),
        },
      };
    case 'SET_CUSTOM':
      return {
        ...state,
        resumeData: { ...state.resumeData, customModules: action.payload },
      };

    case 'SET_CORE_SKILLS':
      return {
        ...state,
        resumeData: { ...state.resumeData, coreSkills: action.payload },
      };

    case 'SET_TEMPLATE':
      return { ...state, currentTemplate: action.payload };

    case 'TOGGLE_MODULE':
      return {
        ...state,
        activeModules: state.activeModules.includes(action.payload)
          ? state.activeModules.filter((m) => m !== action.payload)
          : [...state.activeModules, action.payload],
      };

    case 'SET_MODULE_ORDER':
      return { ...state, moduleOrder: action.payload };

    case 'SET_SECTION_TITLE':
      return {
        ...state,
        sectionTitles: {
          ...state.sectionTitles,
          [action.payload.module]: action.payload.title,
        },
      };

    case 'CLEAR_ALL':
      return {
        ...state,
        resumeData: initialResumeData,
        activeModules: ['basicInfo'],
        moduleOrder: DEFAULT_MODULE_ORDER,
      };

    case 'LOAD_DATA':
      return {
        ...state,
        resumeData: action.payload,
      };

    default:
      return state;
  }
}

// 模板样式
export const templateStyles: Record<TemplateType, TemplateStyle> = {
  classic: {
    titleColor: '#000000',
    titleBorderColor: '#333333',
    dividerColor: '#333',
  },
  gray: {
    titleColor: '#666666',
    titleBorderColor: '#e5e7eb',
    dividerColor: '#e5e7eb',
  },
  purple: {
    titleColor: '#7c3aed',
    titleBorderColor: '#e5e7eb',
    dividerColor: '#e5e7eb',
  },
  blue: {
    titleColor: '#2563eb',
    titleBorderColor: '#e5e7eb',
    dividerColor: '#e5e7eb',
  },
};

// 初始 section titles
const initialSectionTitles: Record<ModuleType, string> = {
  basicInfo: '基本信息',
  education: '教育经历',
  coreSkills: '核心能力',
  workExperience: '工作经历',
  internshipExperience: '实习经历',
  projectExperience: '项目经验',
  custom: '自定义模块',
};

// Context
interface ResumeContextType {
  state: ResumeState;
  dispatch: React.Dispatch<ResumeAction>;
}

const ResumeContext = createContext<ResumeContextType | null>(null);

// Provider
interface ResumeProviderProps {
  children: ReactNode;
}

export function ResumeProvider({ children }: ResumeProviderProps) {
  const [state, dispatch] = useReducer(resumeReducer, {
    resumeData: initialResumeData,
    currentTemplate: 'classic',
    activeModules: ['basicInfo'],
    moduleOrder: DEFAULT_MODULE_ORDER,
    sectionTitles: initialSectionTitles,
  });

  return (
    <ResumeContext.Provider value={{ state, dispatch }}>
      {children}
    </ResumeContext.Provider>
  );
}

// Hook
export function useResume() {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
}
