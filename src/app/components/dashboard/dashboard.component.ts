import { Component, OnInit } from '@angular/core';
import { HeroService } from '../../services/hero.service';
import { Hero } from '../../constTypes';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [HeroService],
})

export class DashBoardComponent implements OnInit {

  heroes: Hero[];

  constructor(private heroService: HeroService) {

  }

  ngOnInit() {
    this.heroService.getHeroesByMockAPI()
      .then(heroes => this.heroes = heroes);
  }
}
