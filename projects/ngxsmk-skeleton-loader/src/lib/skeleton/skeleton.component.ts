import {Component, HostBinding, Input, booleanAttribute} from '@angular/core';

import {
  NgxSmkSkeletonAnimation,
  NgxSmkSkeletonDimension,
  NgxSmkSkeletonType,
} from './skeleton.types';


/**
 * ngxsmk-skeleton - Standalone skeleton component.
 * Usage:
 * <ngxsmk-skeleton type="text" width="80%"></ngxsmk-skeleton>
 * <ngxsmk-skeleton type="circle" size="48"></ngxsmk-skeleton>
 */
@Component({
  selector: 'ngxsmk-skeleton',
  standalone: true,
  template: `
    @if (visible) {
      <ng-content></ng-content>
    }
  `,
  styleUrls: ['./skeleton.component.scss']
})
export class NgxSmkSkeletonComponent {
  /** visual preset */
  @Input() type: NgxSmkSkeletonType = 'text';
  /** width: accepts px/%, number treated as px */
  @Input() width?: NgxSmkSkeletonDimension;
  /** height: accepts px/%, number treated as px */
  @Input() height?: NgxSmkSkeletonDimension;
  /** size shortcut (applies to width & height if provided) */
  @Input() size?: NgxSmkSkeletonDimension;
  /** border radius (e.g. 8, '8px', '9999px') */
  @Input() radius?: NgxSmkSkeletonDimension;
  /** animation style */
  @Input() animate: NgxSmkSkeletonAnimation = 'shimmer';
  /** base color & highlight overrides via CSS vars, but a fallback tint can be set */
  @Input() tint?: string; // e.g. #e5e7eb

  /** toggle visibility to display projected content instead of the placeholder */
  @Input({transform: booleanAttribute}) visible = false;
  /** custom shimmer colors for the gradient */
  @Input() shimmerColors?: string[];
  /** color stops for the custom gradient */
  @Input() locations?: number[];
  /** custom animation duration in ms */
  @Input() duration?: number;
  /** custom animation delay in ms */
  @Input() delay?: number;
  /** reverse animation direction */
  @Input({transform: booleanAttribute}) reverse = false;
  /** freeze/pause animation */
  @Input({transform: booleanAttribute}) stopAnimation = false;


  @HostBinding('class.ngxsmk-skeleton') get baseClass() {
    return !this.visible;
  }


  @HostBinding('class.is-rect') get isRect() {
    return !this.visible && (this.type === 'rect' || this.type === 'image' || this.type === 'button');
  }

  @HostBinding('class.is-text') get isText() {
    return !this.visible && this.type === 'text';
  }

  @HostBinding('class.is-circle') get isCircle() {
    return !this.visible && (this.type === 'circle' || this.type === 'avatar');
  }


  @HostBinding('class.anim-shimmer') get cShimmer() {
    return !this.visible && this.animate === 'shimmer';
  }

  @HostBinding('class.anim-pulse') get cPulse() {
    return !this.visible && this.animate === 'pulse';
  }

  @HostBinding('class.anim-wave') get cWave() {
    return !this.visible && this.animate === 'wave';
  }


  @HostBinding('attr.role') role = 'presentation';
  @HostBinding('attr.aria-hidden') aria = 'true';


  @HostBinding('style') get styleMap() {
    if (this.visible) {
      return '';
    }
    const w = this.size ?? this.width;
    const h = this.size ?? this.height;
    const r = this.radius ?? (this.isCircle ? '9999px' : undefined);


    const style: Record<string, string> = {};
    if (w != null) style['--w'] = this.unit(w);
    if (h != null) style['--h'] = this.unit(h);
    if (r != null) style['--r'] = this.unit(r);
    if (this.tint) style['--ngx-skel-base'] = this.tint;

    if (this.duration != null) style['--ngx-skel-duration'] = `${this.duration}ms`;
    if (this.delay != null) style['--ngx-skel-delay'] = `${this.delay}ms`;
    if (this.reverse) style['--ngx-skel-direction'] = 'reverse';
    if (this.stopAnimation) style['--ngx-skel-play-state'] = 'paused';

    if (this.shimmerColors && this.shimmerColors.length > 0) {
      const gradientParts = this.shimmerColors.map((color, idx) => {
        const stop = this.locations?.[idx] != null ? ` ${this.locations[idx] * 100}%` : '';
        return `${color}${stop}`;
      });
      style['--ngx-skel-gradient'] = `linear-gradient(90deg, ${gradientParts.join(', ')})`;
    }

    return Object.entries(style).map(([k, v]) => `${k}:${v}`).join(';');
  }


  private unit(v: NgxSmkSkeletonDimension): string {
    if (typeof v === 'number') return `${v}px`;
    // if it's a numeric string, add px
    return /^-?\d+(\.\d+)?$/.test(v.trim()) ? `${v}px` : v;
  }

}
