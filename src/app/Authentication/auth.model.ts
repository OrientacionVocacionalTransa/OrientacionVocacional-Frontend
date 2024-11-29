export interface AdvisoryDTO {
    id: number;
    link: string;
    name: string;
    date: string;  
    time: string; 
    studentId: number | null;
    adviserId: number | null;
    student?: any; 
    adviser?: any; 
  }
  
  export interface FileResponse {
    filePath: string;
  }
  
  export interface StudentDTO{
      id: number;
      img_profile: string ;
      firstName: string ;
      lastName: string ;
      email: string ;
      plan: string ;
  }

  export interface User{
    id?: number;
    img_profile?: string;
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
  }
  
  
  export interface Adviser{
    id?: number;
    img_profile?: string;
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    specialty: string;
  }
  
  export interface LoginResponse {
    message: string;
    token: string;
  }

  export interface Solicitation {
    id: number;
    student:StudentDTO;
    adviser: Adviser;
    status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
    createdAt: string;
  }