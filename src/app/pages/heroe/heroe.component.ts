import { Component, OnInit } from '@angular/core';
import { HeroeModel } from 'src/app/models/heroe.model';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { HeroesService } from 'src/app/services/heroes.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  hero = new HeroeModel();

  constructor(private heroesService: HeroesService, private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== 'new') {
      this.heroesService.getHeroe(id)
        .subscribe((resp: HeroeModel) => {
          this.hero = resp;
          this.hero.id = id;
        })
    }
  }

  save(form: NgForm) {
    if (form.invalid) {
      console.log("form invalid");
      return;
    }

    Swal.fire({
      title: 'Wait',
      text: 'Saving info',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let request: Observable<any>;

    if (!this.hero.id) {
      request = this.heroesService.createHero(this.hero);
    } else {
      request = this.heroesService.updateHero(this.hero);
    }

    request.subscribe(resp => {
      Swal.fire({
        title: this.hero.name,
        text: 'Update succes',
        icon: 'success'
      });
    });
  }

}