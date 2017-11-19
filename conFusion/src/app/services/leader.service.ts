import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { Observable } from 'rxjs/Observable';
import { RestangularModule, Restangular } from 'ngx-restangular';

import { baseURL } from '../shared/baseurl';
import { ProcessHttpmsgService } from './process-httpmsg.service';

@Injectable()
export class LeaderService {

  constructor(private restangular: Restangular, private processHttpMsgService: ProcessHttpmsgService) { }

  getLeaders(): Observable<Leader[]> {
  	return this.restangular.all('leaders').getList();
  }

  getLeader(id: number): Observable<Leader> {
    return this.restangular.one('leaders', id).get();;
  }

  getFeaturedLeader(): Observable<Leader> {
  	return this.restangular.all('leaders').getList({featured: true}).map(leaders => leaders[0]);
  }
}
