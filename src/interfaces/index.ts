import { IconType } from "react-icons/lib";

export interface IBase {
    _id?: string;
    createdAt?: string;
    updatedAt?: string;
}

export enum EducationalStage {
    Nursery = 'Nursery',
    Primary = 'Primary',
    Secondary = 'Secondary'
}

export enum AccountTypeEnum {
  school = 'School',
  teacher = 'Teacher',
  manager = 'Manager',
}

export enum GenderEnum {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export enum TermEnum {
    FIRST = 'FIRST',
    SECOND = 'SECOND',
    THIRD = 'THIRD',
  }

export interface IResponseData<T> {    
    totalItems: number
    totalPages: number
    currentPage: number
    items: T
}

export interface IPaginatedResponse<T> {    
    docs: T;
    totalDocs: number;
    offset: number;
    limit: number;
    totalPages: number;
    page: number;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number;
    nextPage: number;
}


export interface IReducerAction<T> {
    type: T | 'reset';
    payload?: string | number | { [key: string]: string };
    data?: string | { [key: string]: string };
    name?: string;
}

export interface IUserLogin {
    email: string
    password: string
}

export interface IUserLoginResponse {
    _id: string | null;
    term: string | null;
    accountId: string | null;
    school: string | null;
    name: string | null;
    email: string | null; 
    role: AccountTypeEnum | null;
    accessToken: string | null;
    academicYear: string | null;
    refreshToken: string | null;

}

export interface IForgotPassword { 
    email: string, 
    redirect_url: string 
}

export interface IChangePassword { 
    password: string,
    confirm_password: string, 
    token: string, 
    uidb64: 'MTI' 
}

export interface IUserRegister {
    name: string   
    schoolName: string
    email: string
    password: string
    confirm_password: string
    phone: string;
    session: string;
    term: TermEnum | '';
}

export interface IProfile {
    email: string
    phone: string
    first_name: string      
    last_name: string        
    middle_name: string
    level: string      
    matric_no: string
    option: string 
}

export interface IUser extends IUserRegister {
    status: string
    middle_name: string | null
    profile_picture_url: string
    is_active: boolean | null
    is_verified: boolean | null
    is_staff: boolean | null
    createdAt?: string
    _id?: string
}

export interface IPassword {
    old_password: string
    new_password: string
    confirm_password: string
}
  
  
export interface ICourse {
    session: string
    semester: string
    level: string
}

export interface IAdminCourse {
    title: string
    code: string
    level: string
    semester: string
    unit: string
}


export interface ILoginReducerAction extends IReducerAction<"email" | "password"> {
    payload: string
}

export interface IRegistereducerAction extends IReducerAction<keyof IUserRegister | 'reset'> {
    payload: string
}


export interface ITableColumn {
    name: string;
    label: string;
    extra?: boolean;
    custom?: (value: string, meta: any) => JSX.Element;
    options?: {
        filter: boolean;
        sort: boolean;
    };
}


export interface ILogout { 
    refresh_token: string 
    role: string 
}

export interface INavItems {
    id: number;
    title: string;
    link: string;
    Icon: IconType;
    root?: boolean;
}

export interface INav { 
    id: number;
    title: string;
    navItems: INavItems[];
}

export interface ISchool extends IBase {
  name: string;
  inceptionDate?: string;
  location?: string;
  owner?: string;
}

export interface IClass extends IBase {
  _id?: string;
  school: string;
  formTeacher?: string | ITeacher;
  title: string;
  stage: EducationalStage | '';
  level: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface IAssignFormTeacher {
    id: string; 
    formTeacher: string;
}

export interface ITeacher extends IBase {
  school: string;
  name: string;
  gender?: GenderEnum | '';
  email: string;
  password: string;
}
export interface IAddTeacher extends Omit<ITeacher, "school"> {}

export interface IStudent extends IBase {
  school: string;
  name: string;
  age: number;
  gender: GenderEnum | '';
  currentClass: string | IClass;
  email?: string;
  password?: string;
}

export interface ISubject extends IBase {
    title: string;
    school: string;
//   classId: string;
//   teacherId: string;
}

export interface IAcademicYear extends IBase {
    school?: string;
    // startYear: number;
    // endYear: number;
    year: string;
    activeTerm?: TermEnum; // New field for the active term
    isActive?: boolean;
}


export interface IAddClassSubject extends IBase {
    class: string;
    subject: string;
    teacher: string;
}

export interface IClassSubject extends IBase {
    class: string | IClass;
    subject: string | ISubject;
    teacher: string | ITeacher;
}

export interface IClassStudent extends IBase {
    class: string;
    student: IStudent;
    academicYear: IAcademicYear;
}


export interface IScore extends IBase {
    classStudent: string | IClassStudent;
    classSubject: string | IClassSubject;
    academicYear: string | IAcademicYear;
    term: string;
    CA: number;
    exam: number;
    total?: number;
    remark?: string;
}

export interface IClassStudentScore extends IClassStudent {
    scores: IScore[]
    termTotal: number;
    termAverage: number;
    position: number;
}