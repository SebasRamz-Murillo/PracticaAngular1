import { Component, inject } from '@angular/core';
import { Chef } from 'src/app/models/chef.model';
import { ChefService } from 'src/app/services/chef.service';
import { OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TokenInterceptor } from 'src/app/Interceptors/token.interceptor';
import { HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Component({
  selector: 'app-chef',
  templateUrl: './chef.component.html',
  styleUrls: ['./chef.component.css']
})

export class ChefComponent implements OnInit, OnDestroy {
  chefs: Chef[] = [];
  suscription?: Subscription;
  private token: string = '';

  constructor(private chefService: ChefService,
    private httpInterceptor: HttpInterceptor) { }

  ngOnInit(): void {
    this.getChefs();
    this.suscription = this.chefService.get_refresh$().subscribe(() => {
      this.getChefs();
      this.token = this.httpInterceptor.();
    }
    );
  }
  ngOnDestroy(): void {
    this.suscription?.unsubscribe();
    console.log('Se destruyó el componente');
  }
  getChefs() {
    this.chefService.getChefs().subscribe(data => this.chefs = data);
  }
}
