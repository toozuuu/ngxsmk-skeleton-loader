import {
  ComponentRef,
  Directive,
  EmbeddedViewRef,
  Input,
  OnChanges,
  TemplateRef,
  ViewContainerRef,
  booleanAttribute,
} from '@angular/core';

import {NgxSmkSkeletonComponent} from './skeleton.component';
import {
  NgxSmkSkeletonAnimation,
  NgxSmkSkeletonDimension,
  NgxSmkSkeletonType,
} from './skeleton.types';


/**
 * *ngxsmkSkeleton - structural directive to toggle a skeleton placeholder
 *
 * Example:
 * <ng-container *ngxsmkSkeleton="loading; type: 'text'; width: '80%'"></ng-container>
 */
@Directive({
  selector: '[ngxsmkSkeleton]',
  standalone: true
})
export class NgxSmkSkeletonDirective implements OnChanges {
  @Input({alias: 'ngxsmkSkeleton', transform: booleanAttribute}) loading = false;


  @Input('ngxsmkSkeletonType') type: NgxSmkSkeletonType = 'text';
  @Input('ngxsmkSkeletonWidth') width?: NgxSmkSkeletonDimension;
  @Input('ngxsmkSkeletonHeight') height?: NgxSmkSkeletonDimension;
  @Input('ngxsmkSkeletonSize') size?: NgxSmkSkeletonDimension;
  @Input('ngxsmkSkeletonRadius') radius?: NgxSmkSkeletonDimension;
  @Input('ngxsmkSkeletonAnimate') animate: NgxSmkSkeletonAnimation = 'shimmer';

  @Input('ngxsmkSkeletonShimmerColors') shimmerColors?: string[];
  @Input('ngxsmkSkeletonLocations') locations?: number[];
  @Input('ngxsmkSkeletonDuration') duration?: number;
  @Input('ngxsmkSkeletonDelay') delay?: number;
  @Input({alias: 'ngxsmkSkeletonReverse', transform: booleanAttribute}) reverse = false;
  @Input({alias: 'ngxsmkSkeletonStopAnimation', transform: booleanAttribute}) stopAnimation = false;

  private skeletonRef?: ComponentRef<NgxSmkSkeletonComponent>;
  private contentRef?: EmbeddedViewRef<unknown>;


  constructor(private readonly tpl: TemplateRef<unknown>, private readonly vcr: ViewContainerRef) {
  }

  ngOnChanges(): void {
    this.updateView();
  }

  private updateView() {
    if (this.loading) {
      if (!this.skeletonRef) {
        this.vcr.clear();
        this.contentRef = undefined;
        this.skeletonRef = this.vcr.createComponent(NgxSmkSkeletonComponent);
      }

      this.skeletonRef.setInput('type', this.type);
      this.skeletonRef.setInput('animate', this.animate);
      this.skeletonRef.setInput('size', this.size);
      this.skeletonRef.setInput('width', this.width);
      this.skeletonRef.setInput('height', this.height);
      this.skeletonRef.setInput('radius', this.radius);
      this.skeletonRef.setInput('shimmerColors', this.shimmerColors);
      this.skeletonRef.setInput('locations', this.locations);
      this.skeletonRef.setInput('duration', this.duration);
      this.skeletonRef.setInput('delay', this.delay);
      this.skeletonRef.setInput('reverse', this.reverse);
      this.skeletonRef.setInput('stopAnimation', this.stopAnimation);
    } else {
      if (!this.contentRef) {
        this.vcr.clear();
        this.skeletonRef = undefined;
        this.contentRef = this.vcr.createEmbeddedView(this.tpl);
      }
    }
  }
}

