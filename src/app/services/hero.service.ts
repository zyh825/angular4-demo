import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Hero } from '../constTypes';
import HEROES from '../mocks/mock-heroes';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HeroService {
  private heroesUrl = 'api/heroes';

  constructor(private http: Http) {
  }

  getHero(id: number): Promise<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http
      .get(url)
      .toPromise()
      .then(response => response.json().data as Hero)
      .catch(this.handleError);
  }

  search(name: string): Observable<Hero []> {
    return this.http
      .get(`app/heroes/?name=${name}`)
      .map(response => response.json().data as Hero[])
  }

  getHeroesSlowly(): Promise<Hero[]> {
    return new Promise((f, r) => {
      setTimeout(() => f(HEROES), 2000);
    });
  }

  getHeroesByMockAPI(): Promise<Hero[]> {
    return this.http.get(this.heroesUrl)
      .toPromise()
      .then(response => response.json().data as Hero[])
      .catch(this.handleError);
  }

  create(name: string): Promise<Hero> {
    const url = `${this.heroesUrl}`;
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http
      .post(url, JSON.stringify({ name }), { headers })
      .toPromise()
      .then(response => response.json().data as Hero)
      .catch(this.handleError);
  }

  update(hero: Hero): Promise<Hero> {
    const url = `${this.heroesUrl}/${hero.id}`;
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http
      .put(url, JSON.stringify(hero), { headers })
      .toPromise()
      .then(() => hero)
      .catch(this.handleError);
  }

  delete(hero: Hero): Promise<void> {
    const url = `${this.heroesUrl}/${hero.id}`;
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http
      .delete(url, { headers })
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
