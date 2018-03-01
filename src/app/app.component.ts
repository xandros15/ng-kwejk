import {Component, Input, OnInit} from '@angular/core';
import {AppService} from './app.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'KWEJK';
    @Input() posts: any[];

    constructor(private service: AppService) {
    }

    ngOnInit(): void {
        this.service.get().subscribe(data => {
            this.posts = data;
        });
    }

    next(): void {
        this.service.getNext().subscribe(data => {
            this.posts = data;
        });
    }
}
