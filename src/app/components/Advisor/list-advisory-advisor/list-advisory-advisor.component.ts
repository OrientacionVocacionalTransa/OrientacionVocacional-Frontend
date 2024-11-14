import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdvisoryService } from '../../../service/advisory.service';
import { AuthService } from '../../../service/auth.service';
import { AdvisoryDTO } from '../../../Authentication/auth.model';
import { environment } from '../../../../environments/environment';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-list-advisory-advisor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './list-advisory-advisor.component.html',
  styleUrl: './list-advisory-advisor.component.scss'
})
export class ListAdvisoryAdvisorComponent {
  advisories: AdvisoryDTO[] = [];
  loading = false;
  confirmation = false;
  selectedAdvisory: AdvisoryDTO | null = null;
  reprogramForm: FormGroup;
  
  constructor(private advisoryService: AdvisoryService, private fb: FormBuilder, private auth: AuthService) {
    this.reprogramForm = this.fb.group({
      name: ['', Validators.required],
      link: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required]
    });
  }
  ngOnInit() {
  const userId = this.getStudentIdFromToken();
  this.advisoryService.getAdvisoriesByUserId(userId).subscribe(advisories => {
    this.advisories = advisories;

    
    this.advisories.sort((a, b) => {
      const dateA = new Date(a.date + ' ' + a.time); 
      const dateB = new Date(b.date + ' ' + b.time);

    
      if (dateA.toDateString() === dateB.toDateString()) {
     
        return dateA.getTime() - dateB.getTime(); 
      } else {
        
        return dateA.getTime() - dateB.getTime();
      }
    });

    advisories.forEach(advisory => {
      if (advisory.studentId) {
      
        this.auth.getStudentById(String(advisory.studentId)).subscribe(student => {
         
          advisory.student = student;
          if (student.img_profile) {
            student.img_profile = `${environment.apiUrl}api/v1/auth/${student.img_profile}`;
          }
        });
      }
    });
  });
}

  private getStudentIdFromToken(): number {
    const token = localStorage.getItem('authToken');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
     
      return payload.userId;
    }
    return 0;
  }

  reloadPage() {
    window.location.reload(); // Recargar la página
  }
  loadAdvisories(userId: number) {
    this.advisoryService.getAdvisoriesByUserId(userId).subscribe(
      data => this.advisories = data,
      error => console.error(error)
    );
  }

  onReprogram(advisory: AdvisoryDTO) {
    this.selectedAdvisory = { ...advisory };
  }

  updateAdvisory(advisory: AdvisoryDTO) {
    this.loading = true;
    this.advisoryService.updateAdvisory(advisory).subscribe(
      (updatedAdvisory: AdvisoryDTO) => {
        this.loading = false;
        this.confirmation = true;
        const index = this.advisories.findIndex(a => a.id === updatedAdvisory.id);
        if (index !== -1) {
          this.advisories[index] = updatedAdvisory;
        }
        this.selectedAdvisory = null;
      },
      error => {
        this.loading = false;
        console.error(error);
      }
    );
  }

  onCancel(id: number) {
    this.loading = true;
    this.advisoryService.deleteAdvisory(id).subscribe(
      () => {
        this.loading = false;
        this.confirmation = true;
        // Esperamos 2 segundos (2000 milisegundos) antes de continuar con el flujo
        setTimeout(() => {
          
          const userId = this.getStudentIdFromToken();
          this.reloadPage();
          this.loadAdvisories(userId);
        }, 2000); // Puedes ajustar el valor de 2000 a la cantidad de milisegundos que necesites
  
      },
      error => {
        this.loading = false;
        console.error(error);
      }
    );
  }

  closeConfirmation() {
    this.confirmation = false;
  }
}
