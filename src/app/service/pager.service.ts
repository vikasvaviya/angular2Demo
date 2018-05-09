import { Injectable } from '@angular/core';
import * as _ from 'underscore';

@Injectable()
export class PagerService {

  constructor() { }

  getPager(totalItems: number, currentPage: number = 1, pageSize: number =  10 ){
    let totalPages = Math.ceil(totalItems/pageSize);
    let startPage: number, endPage: number;

    if(totalPages <= 10) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if(currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if(currentPage + 4 >= totalPages ) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }

    let startindex = (currentPage - 1) * pageSize;
    let endindex = Math.min(startindex + pageSize - 1, totalItems -1);
    let pages = _.range(startPage, endPage + 1);

    return {
      totalItems: totalItems,
      startPage: startPage,
      endPage : endPage,
      totalPages: totalPages,
      startindex: startindex,
      endindex: endindex,
      currentPage: currentPage,
      pageSize: pageSize,
      pages: pages
    }
  }

}
