import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdvisoryService } from '../../../service/advisory.service';

@Component({
  selector: 'app-create-advisory-advisor',
  standalone: true,
  imports: [],
  templateUrl: './create-advisory-advisor.component.html',
  styleUrl: './create-advisory-advisor.component.scss'
})
export class CreateAdvisoryAdvisorComponent {
  advisoryForm: FormGroup;
  students: any[] = [];
  isLoading: boolean = false;  // Estado de carga
  showConfirmation: boolean = false;  // Para mostrar la confirmación
  loadingMessage: string = "Procesando...";  // Mensaje de carga

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
  }

  loadAdvisers(): void {
    this.advisoryService.getStudents().subscribe(data => {
      this.students = data;
      
    });
  }

  createAdvisory(): void {
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
       console.log(error)
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
