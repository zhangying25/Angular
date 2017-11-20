import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from  '../shared/feedback';
import { FeedbackService } from '../services/feedback.service';
import { visibility, flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: {
    "[@flyInOut]": 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class ContactComponent implements OnInit {

  feedbackForm: FormGroup;
  feedback: Feedback;
  submittedFeedback: Feedback;
  submitting: Boolean;
  contactType = ContactType;
  formErrors = {
  	'firstname': '',
  	'lastname': '',
  	'telnum': '',
  	'email': ''
  };

  validationMessage = {
  	'firstname': {
  		'required': 'First Name is required.',
  		'minlength': 'First Name must be at least 2 characters long',
  		'maxlength': 'First Name cannot be more than 25 characters long'
  	},
  	'lastname': {
  		'required': 'Last Name is required.',
  		'minlength': 'Last Name must be at least 2 characters long',
  		'maxlength': 'Last Name cannot be more than 25 characters long'
  	},
  	'telnum': {
  		'required': 'Tel num is required.',
  		'pattern': 'Tel. number must contain only numbers'
  	},
  	'email': {
  		'required': 'Last Name is required.',
  		'email': 'Email not in valid format'
  	}
  };

  constructor(private fb: FormBuilder, private feedbackService: FeedbackService) {
    this.createForm();
    this.submitting = false;
  }

  ngOnInit() {
  }

  createForm() {
  	this.feedbackForm = this.fb.group({
  		firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
  		lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
  		telnum: ['', [Validators.required, Validators.pattern]],
  		email: ['', [Validators.required, Validators.email]],
  		agree: false,
  		contacttype: 'None',
  		message: ''
  	});

  	this.feedbackForm.valueChanges
  		.subscribe(data => this.onValueChanged(data));

  	this.onValueChanged();
  }

  onValueChanged(data?: any) {
  	if (!this.feedbackForm) { return; }
  	const form = this.feedbackForm;

  	for (const field in this.formErrors) {
  		this.formErrors[field] = '';
  		const control = form.get(field);
  		if (control && control.dirty && !control.valid) {
  			const messages = this.validationMessage[field];
  			for (const key in control.errors) {
  				this.formErrors[field] += messages[key] + ' ';
  			}
  		}
  	}
  }

  onSubmit() {
  	this.feedback = this.feedbackForm.value;
    this.submitting = true;
    this.feedbackService.submitFeedback(this.feedback).subscribe(feedback => {
      this.submitting = false;
      this.submittedFeedback = feedback;
      console.log(feedback);
      this.submittedFeedback = undefined;
      setTimeout(function(){
        console.log(this.submittedFeedback);
      }, 5000);
    });

  	this.feedbackForm.reset({
  		firstname: '',
  		lastname: '',
  		telnum: '',
  		email: '',
  		agree: false,
  		contacttype: 'None',
  		message: ''
  	});
  }
}
