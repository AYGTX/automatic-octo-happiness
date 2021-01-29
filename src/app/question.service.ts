import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from './question';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})

export class QuestionService {
  questions:Question[];
  subscription: Subscription;
  constructor(private http: HttpClient
  ) {
   }

  
  getQuestions (): Observable<Question[]> {
    return this.http.get<Question[]>("http://localhost:9091/api/questions")
  }
  addQuestion (question: Question): Observable<Question>{
    return this.http.post<Question>("http://localhost:9091/api/questions", question, httpOptions);

}
updateQuestion(question: Question):Observable<Question>{
  return this.http.put<Question>("http://localhost:9091/api/questions", question, httpOptions);
}


delete():Observable<Question>{
  return this.http.delete<Question>("http://localhost:9091/api/questions")
}
ngOnDestroy() {
  this.subscription.unsubscribe();
}

}
