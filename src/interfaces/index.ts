export enum AccountTypeEnum {
  school = 'School',
  teacher = 'Teacher',
  manager = 'Manager',
}

export enum GenderEnum {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  NONE = '',
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
    payload?: string | { [key: string]: string };
    data?: string | { [key: string]: string };
    name?: string;
}

export interface IUserLogin {
    email: string
    password: string
}

export interface IUserLoginResponse {
    name: string | null;
    email: string | null; 
    account: string | null; 
    role: string | null;
    access_token: string | null;
    refresh_token: string | null;
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
    phone: string
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

export interface ISchool {
  name: string;
  inceptionDate?: string;
  location?: string;
  owner?: string;
}

export interface IClass {
  schoolId: string;
  title: string;
}

export interface ITeacher {
  _id?: string;
  schoolId: string;
  name: string;
  gender?: GenderEnum;
  email: string;
  password: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IStudent {
  schoolId: string;
  name: string;
  age: number;
  gender: GenderEnum;
  currentClass: string;
  previousClasses?: string[];
  email?: string;
  password?: string;
}

export interface ISubject {
  classId: string;
  teacherId: string;
  name: string;
}
