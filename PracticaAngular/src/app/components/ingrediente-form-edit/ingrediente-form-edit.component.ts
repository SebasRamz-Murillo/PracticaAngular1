import { Component } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Route, ParamMap } from '@angular/router';
import { Ingrediente } from 'src/app/models/ingrediente.model';
import { IngredienteService } from 'src/app/services/ingrediente.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-ingrediente-form-edit',
  templateUrl: './ingrediente-form-edit.component.html',
  styleUrls: ['./ingrediente-form-edit.component.css']
})

export class IngredienteFormEditComponent {
  form: FormGroup;
  ingrediente2?: Ingrediente;
  suscription?: Subscription;
  id: number = 0;
  ingrediente = { id: 0, nombre: '', tipo: '', cantidad: 0 };

  constructor(private route: ActivatedRoute,
    private ingredienteService: IngredienteService,
    private location: Location,
    private fb: FormBuilder) {
    this.form = this.fb.group({
      id: ['', Validators.required],
      nombre: ['', Validators.required],
      tipo: ['', Validators.required],
      cantidad: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getOneIngrediente(this.id);
    this.suscription = this.ingredienteService.get_refresh$().subscribe(() => {
      this.getOneIngrediente(this.id);
    }
    );
  }

  getOneIngrediente(id: number) {
    this.ingredienteService.getOneIngrediente(id).subscribe((data: Ingrediente[]) => {
      this.ingrediente2 = data[0];
      this.form.patchValue({
        id: this.ingrediente2?.id,
        nombre: this.ingrediente2?.nombre,
        tipo: this.ingrediente2?.tipo,
        cantidad: this.ingrediente2?.cantidad
      })
    });
  }
  OnSubmit(values: Ingrediente) {
    this.ingredienteService.updateIngrediente(values).subscribe();
    this.form.reset();
    this.location.back();
  }
}
