import { Injectable } from '@angular/core';

import { Feedback } from '../shared/feedback';
import { Observable } from 'rxjs/Observable';
import { RestangularModule, Restangular } from 'ngx-restangular';

import { baseURL } from '../shared/baseurl';
import { ProcessHttpmsgService } from './process-httpmsg.service';

@Injectable()
export class FeedbackService {

  constructor(private restangular: Restangular, private processHttpMsgService: ProcessHttpmsgService) { }

  submitFeedback(feedback: Feedback) {
      this.restangular.all('feedback').post(feedback);
  }

}
