import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreateVendaComponent } from './modal-create-venda.component';

describe('ModalCreateVendaComponent', () => {
  let component: ModalCreateVendaComponent;
  let fixture: ComponentFixture<ModalCreateVendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCreateVendaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCreateVendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
