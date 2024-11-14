import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { Adviser } from '../../../Authentication/auth.model';
import { HomePageService } from '../../../service/home-page.service';
import { AuthService } from '../../../service/auth.service';
import { VocationalTestService } from '../../../service/vocational-test.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-page-principal',
  standalone: true,
  imports: [CommonModule,RouterLink,ReactiveFormsModule,FormsModule,RouterOutlet,RouterLinkActive],
  templateUrl: './page-principal.component.html',
  styleUrl: './page-principal.component.scss'
})
export class PagePrincipalComponent {
  @ViewChild('sideMenu', { static: false }) sideMenu!: ElementRef;
  @ViewChild('menuBtn', { static: false }) menuBtn!: ElementRef;
  @ViewChild('closeBtn', { static: false }) closeBtn!: ElementRef;
  @ViewChild('themeToggler', { static: false }) themeToggler!: ElementRef;

  ubicaciones: any[] = [];
  carreras: any[] = [];
  carreraSeleccionada1: any = null;
  carreraSeleccionada2: any = null;
  user: Adviser | null = null;
  showTestWarning: boolean = false; 

  constructor(
    private carreraService: HomePageService,
    private authService: AuthService,
    private vocational: VocationalTestService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.getUserInfo();
  }

 

  getUserInfo(): void {

    this.authService.getUserInfo().subscribe({
      next: (data) => {
        this.user = data; // Asigna los detalles del usuario// Cargar las carreras despuÃ©s de obtener el usuario
      },
      error: (err) => {
        
        this.showTestWarning = true; // Muestra el aviso si hay un error
      }
    });
  }

  

  logout(): void {
    this.authService.logout();
  }

  ngAfterViewInit() {
    this.menuBtn.nativeElement.addEventListener('click', () => {
      this.sideMenu.nativeElement.style.display = 'block';
    });

    this.closeBtn.nativeElement.addEventListener('click', () => {
      this.sideMenu.nativeElement.style.display = 'none';
    });

    this.themeToggler.nativeElement.addEventListener('click', () => {
      document.body.classList.toggle('dark-theme-variables');
      this.themeToggler.nativeElement.querySelector('span:nth-child(1)').classList.toggle('active');
      this.themeToggler.nativeElement.querySelector('span:nth-child(2)').classList.toggle('active');
    });
  }

  ngOnDestroy() {
    // Limpieza de listeners para evitar fugas de memoria
    this.menuBtn.nativeElement.removeEventListener('click', this.menuBtn.nativeElement.click);
    this.closeBtn.nativeElement.removeEventListener('click', this.closeBtn.nativeElement.click);
    this.themeToggler.nativeElement.removeEventListener('click', this.themeToggler.nativeElement.click);
  }

}
