import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators';

@Injectable()
export class AppService {

    private postsUrl = 'https://kwejk.pl/';

    constructor(private http: HttpClient) {
    }

    get(page: number = 0): Observable<any> {
        let url = this.postsUrl;
        if (page > 0) {
            url += 'strona/' + page;
        }

        return this.http
            .get(url, {responseType: 'text'})
            .pipe(map(this.map));
    }

    private map(response): any {
        const myPosts = [];
        const parser = new DOMParser();
        const document = parser.parseFromString(response, 'text/html');
        const posts = document.querySelectorAll('.media-element');
        const current = parseInt(document.querySelector('.current a').innerHTML, 10);
        for (let i = 0; i < posts.length; i++) {
            const post = posts[i];
            const alt = post.querySelector('[dusk=media-title-selector]').innerHTML;
            const src = post.getAttribute('data-image');

            myPosts.push({src, alt});
        }
        return {posts: myPosts, current: current};
    }
}
