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

export class ChefComponent implements OnInit {
  chefs: Chef[] = [];
  suscription?: Subscription;


  constructor(private chefService: ChefService) { }

  ngOnInit(): void {
    this.getChefs();
    this.suscription = this.chefService.get_refresh$().subscribe(() => {
      this.getChefs();

    }
    );
  }

  getChefs() {
    this.chefService.getChefs().subscribe(data => this.chefs = data);
  }
}
