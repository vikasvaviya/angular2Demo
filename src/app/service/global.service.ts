import { Injectable } from '@angular/core';
declare var $: any;

@Injectable()
export class GlobalService {

  constructor() { }
  ToastMessage (result, color) {
    $.notify({
      icon: 'notifications',
      message: result
    }, {
      type: color,
      timer: 500,
      placement: {
        from: 'top',
        align: 'right'
      }
    });

  }

  Curre
}
