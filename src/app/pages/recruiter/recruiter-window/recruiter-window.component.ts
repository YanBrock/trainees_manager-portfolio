import { Candidate } from '../../../types/candidate';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectSelectCandidate } from '../../../store/candidates/selectors';
import { selectAllSkills } from '../../../store/directory/selectors';
import { map } from 'rxjs/operators';
import {selectCandidate} from '../../../store/candidates/actions';

@Component({
  selector: 'app-recruiter-window',
  templateUrl: './recruiter-window.component.html',
  styleUrls: ['./recruiter-window.component.scss']
})
export class RecruiterWindowComponent implements OnInit {

  selectedCandidate$: Observable<Candidate>;
  softSkills$: Observable<any[]>;
  assessmentsRecruiter = {};
  selectedCandidate: any;

  constructor(private store: Store) {
    this.selectedCandidate$ = this.store.select(selectSelectCandidate);
    this.softSkills$ = this.store.select(selectAllSkills).pipe(
      map(skills => skills.filter(skill => skill.type === 0))
    )
  }

  ngOnInit(): void {
  }

  onClick() {
    this.selectedCandidate$.subscribe(candidate => this.selectedCandidate = candidate);
    this.assessmentsRecruiter = this.selectedCandidate.assessmentsRecruiter;
    console.log(this.assessmentsRecruiter)
    this.selectedCandidate = { ...this.selectedCandidate, isInterviewedByHr: true, assessmentsRecruiter: this.assessmentsRecruiter};
    const candidatesFromLocalStorage = JSON.parse(localStorage.getItem('Candidate'));
    const index = candidatesFromLocalStorage.findIndex(candidate => candidate.firstName === this.selectedCandidate.firstName && candidate.lastName === this.selectedCandidate.lastName);
    candidatesFromLocalStorage[index] = this.selectedCandidate;
    localStorage.setItem('Candidate', JSON.stringify(candidatesFromLocalStorage));
    // localStorage.removeItem('Candidate');
    // localStorage.setItem('Candidate', JSON.stringify(this.selectedCandidate))
    // let id;
    // this.selectedCandidate$.subscribe(candidate => id = candidate.id);
    // const data = {
    //   dateOfInterview: new Date(),
    //   candidateID: id,
    //   marks: [],
    //   comment: this.assessmentsRecruiter['comment']
    // }
    // let result = []
    // for (let key in this.assessmentsRecruiter) {
    //   if (key == 'comment') {
    //     continue;
    //   } else {
    //     result.push({skillID: key, skillLevel: this.assessmentsRecruiter[key]})
    //   }
    //
    // }
    // data.marks.push(result)
    // console.log(data)
    // console.log(JSON.stringify(data))
    // this.assessmentsRecruiter = {}
  }

  onRecruiterFormChange(object) {
    this.assessmentsRecruiter = object
  }

}
