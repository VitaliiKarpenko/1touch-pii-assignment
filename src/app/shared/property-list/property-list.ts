import { Component, Input } from '@angular/core';
import { DisplayedProperty, Properties } from './model/property-list.model';
import { MatGridListModule } from '@angular/material/grid-list';
import { NormalizePropsPipe } from './pipes/normalize-props/normalize-props.pipe';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.html',
  styleUrls: ['./property-list.scss'],
  imports: [
    NormalizePropsPipe,
    MatGridListModule,
  ],
})
export class PropertyList {
  @Input() properties: Properties;
  @Input() displayedProperties: DisplayedProperty[];
  @Input() isSorting = true;
  @Input() compareFn = (a: DisplayedProperty, b: DisplayedProperty) => a.label.localeCompare(b.label);
}
