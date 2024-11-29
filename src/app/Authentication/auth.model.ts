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

  export enum DayOfWeek {
    Lunes = 'Lunes',
    Martes = 'Martes',
    Miércoles = 'Miércoles',
    Jueves = 'Jueves',
    Viernes = 'Viernes',
    Sábado = 'Sábado',
    Domingo = 'Domingo'
  }
  export interface Availability {
    dayOfWeek: DayOfWeek;  // Usa el tipo DayOfWeek aquí
    selectedDays: { [key in DayOfWeek]: boolean };  // Esto asegura que solo se puedan usar días válidos
    startTime: string;
    endTime: string;
  }
  export interface Plan {
    id: number;
    name: string;
    price: number;
    description: string;
  }


  export interface Admin{
    id?: number;
    img_profile?: string;
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
  }