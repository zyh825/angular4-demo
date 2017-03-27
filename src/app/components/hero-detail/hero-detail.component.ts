import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/switchMap';

import { Hero } from '../../constTypes';
import { HeroService } from '../../services/hero.service';

@Component({
  selector: 'hero-detail',
  providers: [HeroService],
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss'],
})

export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;

  constructor(private heroService: HeroService, private route: ActivatedRoute, private location: Location) {
  }

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.heroService.getHero(+params['id']))
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.heroService
      .update(this.hero)
      .then(() => this.goBack());
  }

  add(): void {
    this.heroService
      .create(this.hero.name)
      .then(() => this.goBack());
  }

  delete(): void {
    this.heroService
      .delete(this.hero)
      .then(() =>  this.goBack());
  }
}
