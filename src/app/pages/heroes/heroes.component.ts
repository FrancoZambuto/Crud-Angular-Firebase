import { Component, OnInit } from '@angular/core';
import { HeroesService } from 'src/app/services/heroes.service';
import { HeroeModel } from 'src/app/models/heroe.model';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: HeroeModel[] = [];
  loading: boolean = true;

  constructor(private heroesService: HeroesService) { }

  ngOnInit() {
    this.loading = true;
    this.heroesService.getHeroes().subscribe(resp => {
      this.heroes = resp;
      this.loading = false;
    });
  }

  deleteHero(hero: HeroeModel, i: number) {

    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete ${hero.name}?`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {
      if (resp.value === true) {
        this.heroes.splice(i, 1);
        this.heroesService.deleteHero(hero.id).subscribe();
      }
    });
  }

}
