import { Component } from '@angular/core';
import { ActivatedRoute, Route, ParamMap } from '@angular/router';
import { OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Receta } from 'src/app/models/receta.model';
import { RecetaService } from 'src/app/services/receta.service';

@Component({
  selector: 'app-receta-delete',
  templateUrl: './receta-delete.component.html',
  styleUrls: ['./receta-delete.component.css']
})
export class RecetaDeleteComponent {
  form: FormGroup;
  receta2?: Receta;
  suscription?: Subscription;
  id: number = 0;
  receta: Receta = { id: 0, nombre: '', duracion: '', preparacion: '', chef: 0};
  constructor(private route: ActivatedRoute,
    private recetaService: RecetaService,
    private fb: FormBuilder,
    private location: Location){
      this.form = this.fb.group({
        id: ['', Validators.required],
        nombre: ['', Validators.required]
      })
    }
    ngOnInit(): void {
      this.id = this.route.snapshot.params['id'];
      this.getOneReceta(this.id);
      this.suscription = this.recetaService.get_refresh$().subscribe(() => {
        this.getOneReceta(this.id);
      });
    }
    getOneReceta(id: number) {
      this.recetaService.getOneReceta(id).subscribe((data: Receta[]) => {
        this.receta2 = data[0];
        this.form.patchValue({
          id: this.receta2?.id,
          nombre: this.receta2?.nombre,
        })
      });
    }
    OnSubmit(values: Receta) {
      this.recetaService.deleteIngrediente(values).subscribe();
      this.form.reset();
      this.location.back();
    }
    OnBack() {
      this.location.back();
    }
}
