import { Component } from '@angular/core';
import { Question } from '../../Authentication/question.model';
import { VocationalTestService } from '../../service/vocational-test.service';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-vocational-test',
  standalone: true,
  imports: [RouterLink,CommonModule,FormsModule,HttpClientModule],
  templateUrl: './vocational-test.component.html',
  styleUrl: './vocational-test.component.scss'
})
export class VocationalTestComponent {
  questions: Question[] = [];
  currentQuestionIndex: number = 0;
  loading: boolean = true;
  testResult: any = null;
  errorMessage: string = '';
  isLoading: boolean = false; // Controla el spinner
  showConfirmation: boolean = false; // Controla la marca de verificación
  
  constructor(
    private vocationalTestService: VocationalTestService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadQuestions();
  }

  loadQuestions(): void {
    this.vocationalTestService.getQuestions().subscribe({
      next: (data: any[]) => {
        this.questions = data.map((question) => ({
          ...question,
          options: question.options || [],
        }));
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading questions:', error);
        this.loading = false;
        alert('Error al cargar las preguntas. Intenta de nuevo más tarde.');
      },
    });
  }

  selectOption(option: any): void {
    this.questions[this.currentQuestionIndex].selectedOption = option;

    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    } else {
      this.submitTest();
    }
  }

  submitTest(): void {
    const test = {
      questions: this.questions.map((question) => ({
        id: question.id,
        text: question.text,
        area: question.area,
        options: question.options,
        selectedOption: question.selectedOption,
      })),
    };
    this.isLoading = true;
    this.vocationalTestService.submitTestRegister(test).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.showConfirmation = true;
        this.testResult = response;
        setTimeout(() => {
          this.showConfirmation = false;
          alert(`${this.testResult.area || 'No se pudo determinar el área'}`);
          this.resetTest();
          this.router.navigate(['/page-principal']);
      }, 2000);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'Error al enviar el test. Inténtalo de nuevo.';
        alert(this.errorMessage);  // Mostrar el error como alerta
        console.error(error);
        this.resetTest();  // Reiniciar el test en caso de error
      },
    });
  }

  resetTest(): void {
    // Resetear todas las variables para reiniciar el test
    this.currentQuestionIndex = 0;
    this.testResult = null;
    this.questions = [];
    this.loading = true;
    this.errorMessage = '';
    this.loadQuestions();  // Volver a cargar las preguntas
  }

  getProgress(): number {
    return ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
  }
}
