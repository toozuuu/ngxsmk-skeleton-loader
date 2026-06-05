import {NgModule} from '@angular/core';

import {NgxSmkSkeletonComponent} from './skeleton.component';
import {NgxSmkSkeletonDirective} from './skeleton.directive';

@NgModule({
  imports: [NgxSmkSkeletonComponent, NgxSmkSkeletonDirective],
  exports: [NgxSmkSkeletonComponent, NgxSmkSkeletonDirective],
})
export class NgxSmkSkeletonModule {}
