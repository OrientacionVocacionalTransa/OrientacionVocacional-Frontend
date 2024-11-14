import { Component } from '@angular/core';
import { Adviser } from '../../../Authentication/auth.model';
import { AdvisoryService } from '../../../service/advisory.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-advisors',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './list-advisors.component.html',
  styleUrl: './list-advisors.component.scss'
})
export class ListAdvisorsComponent {
  advisors: Adviser[] = [];
  constructor(private advisoryService: AdvisoryService) {
  }

  ngOnInit() {
    this.loadAdvisors();
  
}

private getStudentIdFromToken(): number {
  const token = localStorage.getItem('authToken');
  if (token) {
    const payload = JSON.parse(atob(token.split('.')[1]));
   
    return payload.userId;
  }
  return 0;
}

loadAdvisors() {
  this.advisoryService.getAdvisers().subscribe(
    data => this.advisors = data,
    error => console.error(error)
  );
}
}
