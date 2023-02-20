import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MapaService } from 'src/app/services/mapa.service';
import { Mapa } from 'src/app/models/mapa.model';
import { Location } from '@angular/common';


@Component({
  selector: 'app-mapa-form',
  templateUrl: './mapa-form.component.html',
  styleUrls: ['./mapa-form.component.css']
})
@Injectable()
export class MapaFormComponent {
  form: FormGroup;
  mapa?: Mapa;


  constructor(
    private fb: FormBuilder,
    private location: Location,
    private mapaService: MapaService
  ){
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      ap_paterno: ['', Validators.required],
      ap_materno: ['', Validators.required],
      nacionalidad: ['', Validators.required],
      edad: ['', Validators.required]
    })
  }
  OnSubmit(values: Mapa) {
    this.mapaService.addMapa(values).subscribe();
    this.form.reset();
    this.location.back();
  }
}
