import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  
  questions: any;
  newQuestion: any = {};
  topic="Graph";
  formError = ''; // Variable to store server error message

  
  constructor(private http: HttpClient) { 
    
  }

  ngOnInit() {
    this.loadQuestions();
  }

  loadQuestions() {
    
    this.http.get<any[]>('https://dsa-questions.onrender.com/api/graph').subscribe(
      (data) => {
        // console.log(data);
        this.questions = data;
      },
      (error) => {
        console.log('An error occurred:', error);
      }
    );
  }

  addQuestion() {
    // Clear previous error
    this.formError = '';
    this.http.post<any>('https://dsa-questions.onrender.com/api/graph', this.newQuestion)
      .subscribe(
        (response) => {
          console.log('Question added successfully:', response);
          this.loadQuestions();
          // Reset the form after successful submission
          this.newQuestion = {};
        },
        (error) => {
           // Handle error response
           if (error.error && error.error.errors && error.error.errors.length > 0) {
            // Extract the first error message
            this.formError = error.error.errors[0].msg;
          } else {
            // Generic error message
            this.formError = 'An error occurred while adding the question.';
          }
          console.log('An error occurred:', error);
        }
      );
  }

  deleteQuestion(id: string) {
    this.http.delete(`https://dsa-questions.onrender.com/api/graph/${id}`).subscribe(
      () => {
        console.log('Question deleted successfully');
        this.loadQuestions();
      },
      (error) => {
        console.log('An error occurred:', error);
      }
    );
  }

 
  
}
