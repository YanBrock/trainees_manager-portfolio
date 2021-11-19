import { Component, OnInit } from '@angular/core';
import { Candidate } from '../../../types/candidate';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectSelectCandidate } from '../../../store/candidates/selectors';


@Component({
  selector: 'app-mentor-window',
  templateUrl: './mentor-window.component.html',
  styleUrls: ['./mentor-window.component.scss']
})
export class MentorWindowComponent implements OnInit {


  selectedCandidate$: Observable<Candidate>;
  assessments = {
    englishLevel: '',
    communicationSkills: '',
    abilityToListen: '',
    selfConfidence: ''
  };

  constructor(private store: Store) {
    this.selectedCandidate$ = this.store.select(selectSelectCandidate);
  }

  ngOnInit(): void {
  };

  onClick() {
    console.log(this.assessments)

    this.assessments = {
      englishLevel: '',
      communicationSkills: '',
      abilityToListen: '',
      selfConfidence: ''
    }
  };

  onFormChange(object) {
    this.assessments = object
  }
}
