import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewFoodPage } from './view-food.page';

describe('ViewFoodPage', () => {
  let component: ViewFoodPage;
  let fixture: ComponentFixture<ViewFoodPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewFoodPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewFoodPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
