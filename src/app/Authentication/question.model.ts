export interface Question {
    id: number;
    text: string; 
    area: Area;
    options: Option[];  
    selectedOption?: Option;
  }

  export interface Area{
    id: number;
    name: string;
    career: Career[];
  }
  
  export interface Option {
    id: number;
    text: string;
    score: number;
  }
  

  export interface Career {
    id: number;
    name: string;
    img: string;
    description: string;
    priceMonthly: string;
    location: Location;
  }

  export interface Location {
  id: number;
  city: string;
  country: string;
  region: string;
}