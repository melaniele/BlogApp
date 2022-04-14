import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { BlogPost } from './BlogPost';
import { HttpClient, HttpParams } from '@angular/common/http';

const perPage = 6;

@Injectable({
  providedIn: 'root',
})
export class PostService {
  readonly url = 'https://dry-stream-81044.herokuapp.com/api';
  constructor(private http: HttpClient) {}

  getPosts(page: any, tag: any, category: any): Observable<BlogPost[]> {
    let params = new HttpParams();
    params = params.append('page', page);
    params = params.append('perPage', perPage);
    if (tag != null) params = params.append('tag', tag);
    if (category != null) params = params.append('category', category);

    return this.http
      .get<BlogPost[]>(`${this.url}/posts`, { params: params })
      .pipe(
        catchError((err) => {
          console.log('handling error', err);
          return throwError(err);
        })
      );
  }

  getPostbyId(id: any): Observable<BlogPost> {
    return this.http.get<BlogPost>(`${this.url}/posts/${id}`).pipe(
      catchError((err) => {
        console.log('handling error', err);
        return throwError(err);
      })
    );
  }

  getCategories(): Observable<any> {
    return this.http.get<any>(`${this.url}/categories`).pipe(
      catchError((err) => {
        console.log('handling error', err);
        return throwError(err);
      })
    );
  }

  getTags(): Observable<string[]> {
    return this.http.get<string[]>(`${this.url}/tags`).pipe(
      catchError((err) => {
        console.log('handling error', err);
        return throwError(err);
      })
    );
  }

  getAllPosts(): Observable<BlogPost[]> {
    return this.http
      .get<BlogPost[]>(
        `${this.url}/posts?page=1&perPage=${Number.MAX_SAFE_INTEGER}`
      )
      .pipe(
        catchError((err) => {
          console.log('handling error', err);
          return throwError(err);
        })
      );
  }

  // invoke POST method on the injected "http"
  newPost(data:BlogPost): Observable<any>{
    return this.http.post<any>(`${this.url}/posts`, data);
  }

  // invoke PUT method on the injected "http"
  updatePostById(id:string, data:BlogPost): Observable<any>{
    return this.http.put<any>(`${this.url}/posts/${id}`, data);
  }

  // invoke DELETE method on the injected "http"
  deletePostById(id:string): Observable<any>{
    return this.http.delete<any>(`${this.url}/posts/${id}`);
  }
}
