import { Component, OnInit, Inject } from '@angular/core';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../shared/comment';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  commentsForm: FormGroup;
  comments: Comment;

  dish: Dish;
  dishIds: number[];
  prev: number;
  next: number;
  errMsg: string;

  formErrors = {
    'Name': '',
    'comments': '',
  };

  validationMessages = {
    'Name': {
      'required': 'Name is required',
      'minlength': 'Name must be at least 2 characters long',
    },
    'comments': {
      'required': 'comments is required',
      'minlength': 'comments must be at least 2 characters long',
    }
  };



  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    @Inject('BaseURL') private BaseURL) {
    this.createForm();
  }

  ngOnInit() {
    this.dishservice.getDishIds()
      .subscribe(dishIds => this.dishIds = dishIds);
    this.route.params
      .switchMap((params: Params) => this.dishservice.getDish(+params['id']))
      .subscribe(dish => {this.dish = dish; this.setPrevNext(dish.id); }, errMsg => this.errMsg = <any>errMsg);
  }

  setPrevNext(dishId: number) {
    let index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }

  createForm(): void {
    this.commentsForm = this.fb.group({
      Name: ['', [Validators.required, Validators.minLength(2)]],
      comments: ['', [Validators.required, Validators.minLength(2)]],
      stars: [5],
      date: ''
    });

    this.commentsForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set form validation messages
  }

  onValueChanged(data?: any) {
    if (!this.commentsForm) {return; }
    const form = this.commentsForm;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  onSubmit() {
    let date = new Date();
    this.commentsForm.value.date = date.toISOString();
    this.comments = this.commentsForm.value;
    console.log(this.comments);
    this.dish.comments.push(this.comments);
    this.commentsForm.reset({
      Name: '',
      comments: '',
      stars: 5,
      date: ''
    });
  }

}
