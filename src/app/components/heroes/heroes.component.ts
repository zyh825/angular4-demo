import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HeroService } from '../../services/hero.service';
import { Hero } from '../../constTypes';

@Component({
  selector: 'app-my-heroes',
  templateUrl: './heroes.component.html',
  providers: [HeroService],
  styleUrls: ['./heroes.component.scss'],
})

export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];
  selectedHero: Hero;

  constructor(private heroService: HeroService, private router: Router) {
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }

  getHeroes(): void {
    this.heroService
      .getHeroesByMockAPI()
      .then(heroes => this.heroes = heroes);
  }

  ngOnInit(): void {
    this.getHeroes();
  }
}
