import { Component } from '@angular/core';
import { timer } from 'rxjs';
import { Question } from './question';
import { QuestionService } from './question.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'quiz';
  
  question = new Question();
  questions: Question[];
  submitted = false;
  processing = false;
  ngOnInit() {
    setInterval(()=>{
     this.qService.getQuestions().subscribe(x=>{
       this.questions=x;
     })},1000);
  }
  

  constructor(private qService: QuestionService) {


   }
   newQuestion(): void {
    this.submitted = false;
    this.processing = false;
    this.question = new Question();


}
addQuestion() {
  this.submitted = true;
  this.qService.addQuestion(this.question)
  .subscribe();
}
processQuestions(){

  setInterval(()=>{
     this.qService.getQuestions()
    .subscribe(
      questions => {
        console.log(questions);
        console.log('dd');
        this.questions = questions;
      }
    );
  },500)
  
}
pickAnswer(correct,picked,q){
  console.log(picked)
  if(picked==correct){
   this.qService.updateQuestion(q).subscribe()
  }
else{
  alert('think again')
}
}
delete(){
  this.qService.delete().subscribe();
}

}
