import { Component } from '@angular/core';
import { ActivatedRoute, Route, ParamMap } from '@angular/router';
import { Objeto } from 'src/app/models/objeto.model';
import { ObjetoService } from 'src/app/services/objeto.service';
import { OnInit, OnDestroy } from '@angular/core';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-objeto-form-edit',
  templateUrl: './objeto-form-edit.component.html',
  styleUrls: ['./objeto-form-edit.component.css']
})
export class ObjetoFormEditComponent implements OnInit{
  form: FormGroup;
  objeto2?: Objeto;

  suscription?:Subscription;
  id:number = 0;
  constructor(private route: ActivatedRoute,
    private objetoService: ObjetoService,
    location: Location,
    private fb: FormBuilder){
    this.form = this.fb.group({
      id: ['', Validators.required],
      nombre: ['', Validators.required],
      rareza: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
      limiteBolsa: ['', [Validators.required, Validators.min(1)]],
      valor: ['', [Validators.required, Validators.min(1)]],
      descripcion: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getOneObjeto(this.id);
    this.suscription = this.objetoService.get_refresh$().subscribe(() => {
      this.getOneObjeto(this.id);
    }
    );
    console.log("ngOnInit");
  }
  ngOnDestroy():void {
    this.suscription?.unsubscribe();
    console.log('Se destruyó el componente');
  }
  getOneObjeto(id : number){
    this.objetoService.getOneObjeto(id).subscribe((data: Objeto[]) => {
      this.objeto2 = data[0];
      this.form.patchValue({
        id: this.objeto2?.id,
        nombre: this.objeto2?.nombre,
        rareza: this.objeto2?.rareza,
        limiteBolsa: this.objeto2?.limiteBolsa,
        valor: this.objeto2?.valor,
        descripcion: this.objeto2?.descripcion
      })
    });

  }
    OnSubmit(values: Objeto) {
    this.objetoService.updateObjeto(values).subscribe();
    this.form.reset();
  }
  goBack(){

  }
}
