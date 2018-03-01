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
    current = 0;

    constructor(private service: AppService) {
    }

    ngOnInit(): void {
        this.service.get().subscribe(data => {
            this.posts = data.posts;
            this.current = data.current;
        });
    }

    next(): void {
        if (this.current > 0) {
            this.current--;
        }

        this.service.get(this.current).subscribe(data => {
            this.posts = data.posts;
            this.current = data.current;
        });
    }
}
