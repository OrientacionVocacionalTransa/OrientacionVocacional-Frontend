import { Component } from '@angular/core';
import { StudentDTO } from '../../../Authentication/auth.model';
import { AdvisoryService } from '../../../service/advisory.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SolicitationService } from '../../../service/solicitation.service';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-list-students',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './list-students.component.html',
  styleUrl: './list-students.component.scss'
})
export class ListStudentsComponent {
  students: StudentDTO[] = [];

  adviserId: number | null = null;

  constructor(private solicitationService: SolicitationService, private authService: AuthService) {
    
  }
  ngOnInit(): void {
    this.adviserId = this.authService.getUserId();
    if (this.adviserId) {
      this.solicitationService.getAcceptedStudents(this.adviserId).subscribe({
        next: (data) => this.students = data,
        error: (err) => console.error(err)
      });
    }
  }
  

  
}
