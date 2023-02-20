import { TestBed } from '@angular/core/testing';

import { MapaObjetoService } from './mapa-objeto.service';

describe('MapaObjetoService', () => {
  let service: MapaObjetoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapaObjetoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
