import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators';

@Injectable()
export class AppService {

    private postsUrl = 'https://kwejk.pl/';
    private next = 0;

    constructor(private http: HttpClient) {
    }

    getNext(): Observable<any[]> {
        return this.http
            .get(this.postsUrl + 'strona/' + this.next, {responseType: 'text'})
            .pipe(
                map((response) => {
                    const myPosts = [];
                    const parser = new DOMParser();
                    const document = parser.parseFromString(response, 'text/html');
                    const posts = document.querySelectorAll('.media-element');
                    this.next = parseInt(document.querySelector('.current a').innerHTML, 10);
                    console.log(document.querySelector('.current a').innerHTML);
                    this.next--;
                    for (let i = 0; i < posts.length; i++) {
                        const post = posts[i];
                        const alt = post.querySelector('[dusk=media-title-selector]').innerHTML;
                        const src = post.getAttribute('data-image');

                        myPosts.push({src, alt});
                    }
                    console.log(myPosts);
                    return myPosts;
                })
            );
    }

    get(): Observable<any[]> {
        return this.http
            .get(this.postsUrl, {responseType: 'text'})
            .pipe(
                map((response) => {
                    const myPosts = [];
                    const parser = new DOMParser();
                    const document = parser.parseFromString(response, 'text/html');
                    const posts = document.querySelectorAll('.media-element');
                    this.next = parseInt(document.querySelector('.current a').innerHTML, 10);
                    console.log(document.querySelector('.current a').innerHTML);
                    this.next--;
                    for (let i = 0; i < posts.length; i++) {
                        const post = posts[i];
                        const alt = post.querySelector('[dusk=media-title-selector]').innerHTML;
                        const src = post.getAttribute('data-image');

                        myPosts.push({src, alt});
                    }
                    console.log(myPosts);
                    return myPosts;
                })
            );
    }
}
