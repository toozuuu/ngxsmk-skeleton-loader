import {Component} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NgxSmkSkeletonComponent} from './skeleton.component';
import {NgxSmkSkeletonDirective} from './skeleton.directive';
import {NgxSmkSkeletonModule} from './skeleton.module';

describe('NgxSmkSkeletonComponent', () => {
  let fixture: ComponentFixture<NgxSmkSkeletonComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxSmkSkeletonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NgxSmkSkeletonComponent);
    element = fixture.nativeElement as HTMLElement;
  });

  it('applies the default text skeleton classes and accessibility attributes', () => {
    fixture.detectChanges();

    expect(element.classList).toContain('ngxsmk-skeleton');
    expect(element.classList).toContain('is-text');
    expect(element.classList).toContain('anim-shimmer');
    expect(element.getAttribute('role')).toBe('presentation');
    expect(element.getAttribute('aria-hidden')).toBe('true');
  });

  it('normalizes numeric dimensions to pixels', () => {
    fixture.componentRef.setInput('type', 'circle');
    fixture.componentRef.setInput('size', 48);
    fixture.detectChanges();

    expect(element.style.getPropertyValue('--w')).toBe('48px');
    expect(element.style.getPropertyValue('--h')).toBe('48px');
    expect(element.style.getPropertyValue('--r')).toBe('9999px');
  });

  it('keeps CSS dimensions when units are already provided', () => {
    fixture.componentRef.setInput('width', '75%');
    fixture.componentRef.setInput('height', '1.25rem');
    fixture.componentRef.setInput('radius', '8px');
    fixture.detectChanges();

    expect(element.style.getPropertyValue('--w')).toBe('75%');
    expect(element.style.getPropertyValue('--h')).toBe('1.25rem');
    expect(element.style.getPropertyValue('--r')).toBe('8px');
  });

  it('correctly sets custom styles for duration, delay, reverse, stopAnimation, and custom gradient', () => {
    fixture.componentRef.setInput('duration', 1500);
    fixture.componentRef.setInput('delay', 300);
    fixture.componentRef.setInput('reverse', true);
    fixture.componentRef.setInput('stopAnimation', true);
    fixture.componentRef.setInput('shimmerColors', ['#ff0000', '#00ff00', '#0000ff']);
    fixture.componentRef.setInput('locations', [0.1, 0.5, 0.9]);
    fixture.detectChanges();

    expect(element.style.getPropertyValue('--ngx-skel-duration')).toBe('1500ms');
    expect(element.style.getPropertyValue('--ngx-skel-delay')).toBe('300ms');
    expect(element.style.getPropertyValue('--ngx-skel-direction')).toBe('reverse');
    expect(element.style.getPropertyValue('--ngx-skel-play-state')).toBe('paused');
    expect(element.style.getPropertyValue('--ngx-skel-gradient')).toBe('linear-gradient(90deg, #ff0000 10%, #00ff00 50%, #0000ff 90%)');
  });
});

@Component({
  standalone: true,
  imports: [NgxSmkSkeletonComponent],
  template: `
    <ngxsmk-skeleton [visible]="visible" type="text" width="60%">
      <span class="actual-content">Real Content</span>
    </ngxsmk-skeleton>
  `
})
class ComponentProjectionHost {
  visible = false;
}

describe('NgxSmkSkeletonComponent Content Projection', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentProjectionHost, NgxSmkSkeletonComponent],
    }).compileComponents();
  });

  it('renders skeleton class and hides projected content when visible is false', () => {
    const projFixture = TestBed.createComponent(ComponentProjectionHost);
    projFixture.detectChanges();
    const el = projFixture.nativeElement.querySelector('ngxsmk-skeleton') as HTMLElement;
    expect(el.classList).toContain('ngxsmk-skeleton');
    expect(projFixture.nativeElement.querySelector('.actual-content')).toBeNull();
  });

  it('removes skeleton class and projects content when visible is true', () => {
    const projFixture = TestBed.createComponent(ComponentProjectionHost);
    projFixture.componentInstance.visible = true;
    projFixture.detectChanges();
    const el = projFixture.nativeElement.querySelector('ngxsmk-skeleton') as HTMLElement;
    expect(el.classList).not.toContain('ngxsmk-skeleton');
    expect(projFixture.nativeElement.querySelector('.actual-content')).toBeTruthy();
  });
});

@Component({
  standalone: true,
  imports: [NgxSmkSkeletonDirective],
  template: `
    <ng-container
      *ngxsmkSkeleton="
        loading;
        type: type;
        width: width;
        height: height;
        animate: animate;
        shimmerColors: shimmerColors;
        locations: locations;
        duration: duration;
        delay: delay;
        reverse: reverse;
        stopAnimation: stopAnimation
      "
    >
      <p class="content">Loaded</p>
    </ng-container>
  `,
})
class DirectiveHostComponent {
  loading = true;
  type: 'text' | 'rect' = 'rect';
  width = '80%';
  height = 24;
  animate: 'shimmer' | 'pulse' = 'pulse';
  shimmerColors = ['#ff0000', '#00ff00'];
  locations = [0, 1];
  duration = 2000;
  delay = 500;
  reverse = true;
  stopAnimation = true;
}

describe('NgxSmkSkeletonDirective', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DirectiveHostComponent],
    }).compileComponents();
  });

  it('renders a configured skeleton while loading', () => {
    const fixture = TestBed.createComponent(DirectiveHostComponent);
    fixture.detectChanges();

    const skeleton = fixture.nativeElement.querySelector('ngxsmk-skeleton') as HTMLElement;

    expect(skeleton).toBeTruthy();
    expect(skeleton.classList).toContain('is-rect');
    expect(skeleton.style.getPropertyValue('--w')).toBe('80%');
    expect(skeleton.style.getPropertyValue('--h')).toBe('24px');
    expect(skeleton.style.getPropertyValue('--ngx-skel-duration')).toBe('2000ms');
    expect(skeleton.style.getPropertyValue('--ngx-skel-delay')).toBe('500ms');
    expect(skeleton.style.getPropertyValue('--ngx-skel-direction')).toBe('reverse');
    expect(skeleton.style.getPropertyValue('--ngx-skel-play-state')).toBe('paused');
    expect(skeleton.style.getPropertyValue('--ngx-skel-gradient')).toBe('linear-gradient(90deg, #ff0000 0%, #00ff00 100%)');
    expect(fixture.nativeElement.querySelector('.content')).toBeNull();
  });

  it('renders projected content when loading is false', () => {
    const fixture = TestBed.createComponent(DirectiveHostComponent);
    fixture.componentInstance.loading = false;
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('ngxsmk-skeleton')).toBeNull();
    expect(fixture.nativeElement.querySelector('.content')?.textContent).toContain('Loaded');
  });
});

describe('NgxSmkSkeletonModule', () => {
  it('exports the component and directive for NgModule-style consumers', () => {
    expect(NgxSmkSkeletonModule).toBeTruthy();
  });
});

