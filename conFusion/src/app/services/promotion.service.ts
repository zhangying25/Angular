import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RestangularModule, Restangular } from 'ngx-restangular';

import { baseURL } from '../shared/baseurl';
import { ProcessHttpmsgService } from './process-httpmsg.service';

import { Promotion } from '../shared/promotion';

@Injectable()
export class PromotionService {

  constructor(private restangular: Restangular, private processHttpMsgService: ProcessHttpmsgService) { }

  getPromotions(): Observable<Promotion[]> {
  	return this.restangular.all('promotions').getList();
  }

  getPromotion(id: number): Observable<Promotion> {
  	return this.restangular.one('promotions', id).get();;
  }

  getFeaturedPromotion(): Observable<Promotion> {
  	return this.restangular.all('promotions').getList({ Featured: true }).map(promotions => promotions[0]);
  }
}
