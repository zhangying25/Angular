import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from  '../shared/feedback';
import { flyInOut } from '../animations/app.animation';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: {
    "[@flyInOut]": 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut()
  ]
})
export class ContactComponent implements OnInit {

  feedbackForm: FormGroup;
  feedback: Feedback;
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

  constructor(private fb: FormBuilder) {
    this.createForm();
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
  	console.log(this.feedbackForm);
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
