import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdvisoryService } from '../../../service/advisory.service';
import { CommonModule, formatDate } from '@angular/common';

@Component({
  selector: 'app-create-advisory-advisor',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-advisory-advisor.component.html',
  styleUrl: './create-advisory-advisor.component.scss'
})
export class CreateAdvisoryAdvisorComponent {
  advisoryForm: FormGroup;
  students: any[] = [];
  isLoading: boolean = false;  
  showConfirmation: boolean = false; 
  loadingMessage: string = "Procesando...";  
  minDate: string = ''; 
  minTime: string = ''; 
  isTimeEnabled: boolean = false; 

  constructor(private fb: FormBuilder, private advisoryService: AdvisoryService) {
    this.advisoryForm = this.fb.group({
      link: ['', Validators.required],
      name: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      studentId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadAdvisers();
    this.minDate = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
  }
  onDateChange(): void {
    const selectedDate = this.advisoryForm.get('date')?.value;
    const today = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
  
    if (selectedDate === today) {
      // Si la fecha seleccionada es hoy, calcula la hora mínima (actual)
      this.isTimeEnabled = true;
      this.minTime = this.getCurrentTime();
    } else if (selectedDate > today) {
      // Si la fecha es futura, no hay restricción de hora mínima
      this.isTimeEnabled = true;
      this.minTime = '00:00';
    } else {
      // Si la fecha es inválida (pasada), deshabilita el campo de tiempo
      this.isTimeEnabled = false;
      this.minTime = '';
    }
  }
  
  private getCurrentTime(): string {
    // Obtiene la hora actual en formato HH:mm
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  loadAdvisers(): void {
    this.advisoryService.getStudents().subscribe(data => {
      this.students = data;
      
    });
  }

  createAdvisory(): void {
    const selectedDate = this.advisoryForm.get('date')?.value;
    const selectedTime = this.advisoryForm.get('time')?.value;
    const currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
    const currentTime = this.getCurrentTime();
  
    
    if (selectedDate === currentDate && selectedTime < currentTime) {
      alert('No puedes seleccionar horas pasadas.');
      return;
    }
  
    const adviserId = this.getAdvisorIdFromToken();
    const advisoryData = {
      ...this.advisoryForm.value,
      adviserId
    };
  
    this.isLoading = true;
    this.loadingMessage = "Creando asesoría...";
  
    this.advisoryService.createAdvisory(advisoryData).subscribe(
      response => {
        this.isLoading = false;
        this.showConfirmation = true;
        this.loadingMessage = "Asesoría creada con éxito!";
        setTimeout(() => {
          this.showConfirmation = false;
        }, 3000);
      },
      error => {
        console.log(error);
        this.isLoading = false;
        this.loadingMessage = "Hubo un error, por favor intente nuevamente.";
      }
    );
  }

  private getAdvisorIdFromToken(): number {
    const token = localStorage.getItem('authToken');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.userId;
    }
    return 0;
  }
}
