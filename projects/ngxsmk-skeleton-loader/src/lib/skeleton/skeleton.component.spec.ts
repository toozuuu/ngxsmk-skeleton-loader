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
        animate: animate
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
    expect(skeleton.classList).toContain('anim-pulse');
    expect(skeleton.style.getPropertyValue('--w')).toBe('80%');
    expect(skeleton.style.getPropertyValue('--h')).toBe('24px');
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
