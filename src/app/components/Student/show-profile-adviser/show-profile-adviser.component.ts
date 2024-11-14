import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../../../service/auth.service';
import { environment } from '../../../../environments/environment';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-show-profile-adviser',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './show-profile-adviser.component.html',
  styleUrl: './show-profile-adviser.component.scss'
})
export class ShowProfileAdviserComponent {
  advisor: any;

  constructor(private route: ActivatedRoute, private advisorService: AuthService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.advisorService.getAdvisorById(id).subscribe(
        (data) => {
          this.advisor = data;
          if(this.advisor?.img_profile){
            this.advisor.img_profile = `${environment.apiUrl}api/v1/auth/${this.advisor.img_profile}`;
          }
        },
        (error) => {
          console.error('Error fetching advisor data:', error);
        }
      );
    }
  }
}
