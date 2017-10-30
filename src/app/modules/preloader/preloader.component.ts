import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'preloader',
    template: `<img src="../../../../assets/img/preloader.gif">`
})
export class PreloaderComponent implements OnInit {
    constructor() { }

    ngOnInit() { }

}
