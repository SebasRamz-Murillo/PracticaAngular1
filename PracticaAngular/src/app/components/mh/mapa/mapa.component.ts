import { Component } from '@angular/core';
import { Mapa } from 'src/app/Models/mapa.model';
import { MapaService } from 'src/app/services/mapa.service';
import { OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  mapas: Mapa[] = [];
  suscription?:Subscription;

  constructor(private mapaService: MapaService) { }
  ngOnInit(): void {
    this.getMapas();
    this.suscription = this.mapaService.get_refresh$().subscribe(() => {
      this.getMapas();
    }
    );
  }

  getMapas() {
    this.mapaService.getMapas().subscribe(data => this.mapas = data);
  }
}
