import { Component } from '@angular/core';
import { Adviser, FileResponse } from '../../../Authentication/auth.model';
import { AuthService } from '../../../service/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-profile-advisor',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule,RouterLink, RouterOutlet, RouterLinkActive],
  templateUrl: './profile-advisor.component.html',
  styleUrl: './profile-advisor.component.scss'
})
export class ProfileAdvisorComponent {
  selectedFile: File | null = null;  
  user: Adviser = { firstName: '', lastName: '', email: '' , specialty: '' , img_profile: ''}; // Información del usuario

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Obtener la información actual del usuario
    this.authService.getUserInfo().subscribe({
      next: (data) => {
        this.user = data;
        
      },
      error: (err) => {
        console.error('Error al obtener la información del usuario', err);
      }
    });
  }


  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);     
      this.authService.updateUserProfileImage(formData).subscribe({
        next: (response: FileResponse) => {        
          this.user.img_profile = response.filePath;


          alert('Imagen de perfil actualizada');
          window.location.reload();
        },
        error: (err) => {
          console.error('Error al actualizar la imagen', err);
          alert('Hubo un error al actualizar la imagen');
        }
      });
    } 
    this.updateUserProfile();
  }

  updateUserProfile(): void {
    this.authService.updateUserProfile(this.user).subscribe({
      next: (updatedUser) => {
        alert('Perfil actualizado exitosamente');
      },
      error: (err) => {
        console.error('Error al actualizar el perfil', err);
        alert('Hubo un error al actualizar el perfil');
      }
    });
  }

}
