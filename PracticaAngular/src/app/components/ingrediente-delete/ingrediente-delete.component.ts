import { Component } from '@angular/core';
import { ActivatedRoute, Route, ParamMap } from '@angular/router';
import { OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ingrediente } from 'src/app/models/ingrediente.model';
import { IngredienteService } from 'src/app/services/ingrediente.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-ingrediente-delete',
  templateUrl: './ingrediente-delete.component.html',
  styleUrls: ['./ingrediente-delete.component.css']
})
export class IngredienteDeleteComponent {
  form: FormGroup;
  ingrediente2?: Ingrediente;
  suscription?: Subscription;
  id: number = 0;
  ingrediente: Ingrediente = { id: 0, nombre: '', tipo: '', cantidad: 0};

  constructor(private route: ActivatedRoute,
    private ingredienteService: IngredienteService,
    private fb: FormBuilder,
    private location: Location) {
    this.form = this.fb.group({
      id: [this.id, Validators.required],
      nombre: [this.ingrediente.nombre, Validators.required],
      tipo: [this.ingrediente.tipo, Validators.required],
      cantidad: [this.ingrediente.cantidad, Validators.required]
    });
    }
    ngOnInit(): void {
      this.id = this.route.snapshot.params['id'];
      this.getOneIngrediente(this.id);
      this.suscription = this.ingredienteService.get_refresh$().subscribe(() => {
        this.getOneIngrediente(this.id);
      });
    }
    getOneIngrediente(id: number) {
      this.ingredienteService.getOneIngrediente(id).subscribe((data: Ingrediente[]) => {
        this.ingrediente2 = data[0];
        this.form.patchValue({
          id: this.ingrediente2?.id,
          nombre: this.ingrediente2?.nombre,
        })
      });
    }
    OnSubmit(values: Ingrediente) {
      this.ingredienteService.deleteIngrediente(values).subscribe();
      this.form.reset();
      this.location.back();
    }
    OnBack() {
      this.location.back();
    }
}
