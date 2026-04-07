// 简历数据接口定义

export interface BasicInfo {
  name: string;
  phone: string;
  email: string;
  location: string;
  birthDate: string;
  other: string;
  avatar: string;
}

export interface Education {
  id: number;
  school: string;
  degree: string;
  major: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
}

export interface WorkExperience {
  id: number;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
}

export interface InternshipExperience {
  id: number;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
}

export interface ProjectExperience {
  id: number;
  name: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface CustomModule {
  id: number;
  title: string;
  content: string;
}

export type TemplateType = 'classic' | 'gray' | 'purple' | 'blue';

export interface TemplateStyle {
  titleColor: string;
  titleBorderColor: string;
  dividerColor: string;
}

export interface ResumeData {
  basicInfo: BasicInfo;
  education: Education[];
  coreSkills: string;
  workExperience: WorkExperience[];
  internshipExperience: InternshipExperience[];
  projectExperience: ProjectExperience[];
  customModules: CustomModule[];
}

export type ModuleType =
  | 'basicInfo'
  | 'education'
  | 'coreSkills'
  | 'workExperience'
  | 'internshipExperience'
  | 'projectExperience'
  | 'custom';

export const MODULE_NAMES: Record<ModuleType, string> = {
  basicInfo: '基本信息',
  education: '教育经历',
  coreSkills: '核心能力',
  workExperience: '工作经历',
  internshipExperience: '实习经历',
  projectExperience: '项目经验',
  custom: '自定义模块',
};

export const DEFAULT_MODULE_ORDER: ModuleType[] = [
  'basicInfo',
  'education',
  'coreSkills',
  'workExperience',
  'internshipExperience',
  'projectExperience',
  'custom',
];
