import { Component } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Receta } from 'src/app/models/receta.model';
import { RecetaService } from 'src/app/services/receta.service';

@Component({
  selector: 'app-receta',
  templateUrl: './receta.component.html',
  styleUrls: ['./receta.component.css']
})
export class RecetaComponent implements OnInit, OnDestroy{
  receta: Receta[] = [];
  suscription?: Subscription;

  constructor(private RecetaService: RecetaService) { }
  ngOnInit(): void {
    this.getIngredientes();
    this.suscription = this.RecetaService.get_refresh$().subscribe(() => {
      this.getIngredientes();
    });
  }

  ngOnDestroy(): void {
    this.suscription?.unsubscribe();
    console.log('Se destruyó el componente');
  }
  //Metodos
  getIngredientes() {
    this.RecetaService.getRecetas().subscribe(data => this.receta = data);
  }
}
