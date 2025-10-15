import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PropertyList } from './property-list';
import { DisplayedProperty, Properties } from './models/property-list.model';

describe('PropertyList', () => {
  const properties: Properties = {
    a: 'Alpha',
    b: [1, 2],
    c: 'Gamma',
  };
  const displayedProperties: DisplayedProperty[] = [
    { property: 'a', label: 'LabelA' },
    { property: 'b', label: 'LabelB' },
    { property: 'c', label: 'LabelC' },
  ];

  let component: PropertyList;
  let fixture: ComponentFixture<PropertyList>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [PropertyList],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyList);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render property labels and values', () => {
    component.properties = properties;
    component.displayedProperties = displayedProperties;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('LabelA:');
    expect(compiled.textContent).toContain('Alpha');
    expect(compiled.textContent).toContain('LabelB:');
    expect(compiled.textContent).toContain('1');
    expect(compiled.textContent).toContain('2');
    expect(compiled.textContent).toContain('LabelC:');
    expect(compiled.textContent).toContain('Gamma');
  });
});
