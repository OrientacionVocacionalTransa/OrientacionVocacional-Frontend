import { Component } from '@angular/core';
import { StudentDTO } from '../../../Authentication/auth.model';
import { AdvisoryService } from '../../../service/advisory.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-students',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './list-students.component.html',
  styleUrl: './list-students.component.scss'
})
export class ListStudentsComponent {

  students: StudentDTO[] = [];
  loading = false;
  confirmation = false;

  constructor(private advisoryService: AdvisoryService) {
    
  }
  ngOnInit() {
      this.loadStudents();
  }

  private getStudentIdFromToken(): number {
    const token = localStorage.getItem('authToken');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
     
      return payload.userId;
    }
    return 0;
  }

  loadStudents() {
    this.advisoryService.getStudents().subscribe(
      data => this.students = data,
      error => console.error(error)
    );
  }
}
