import { Injectable } from '@angular/core';
import { HeroeModel } from '../models/heroe.model';
import { HttpClient } from '@angular/common/http';
import { map, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'https://crud-angular-firebase-dad90.firebaseio.com';

  constructor(private http: HttpClient) { }

  createHero(hero: HeroeModel) {
    return this.http.post(`${this.url}/heroes.json`, hero)
      .pipe(
        map((resp: any) => {
          hero.id = resp.name;
          return hero;
        })
      );
  }

  updateHero(hero: HeroeModel) {
    const heroTemp = {
      ...hero
    };
    delete heroTemp.id;
    return this.http.put(`${this.url}/heroes/${hero.id}.json`, heroTemp);
  }


  getHeroe(id: string) {
    return this.http.get(`${this.url}/heroes/${id}.json`);
  }

  deleteHero(id: string) {
    return this.http.delete(`${this.url}/heroes/${id}.json`);
  }

  getHeroes() {
    return this.http.get(`${this.url}/heroes.json`)
      .pipe(map(this.heroesArray), delay(1500));
  }

  private heroesArray(heroesObj: Object) {
    const heroes: HeroeModel[] = [];
    console.log(heroesObj);

    if (heroesObj === null) {
      return [];
    }

    Object.keys(heroesObj).forEach(key => {
      const heroe: HeroeModel = heroesObj[key];
      heroe.id = key;
      heroes.push(heroe);
    });
    return heroes;
  }

}
