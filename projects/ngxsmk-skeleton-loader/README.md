# ngxsmk-skeleton-loader: Angular Skeleton Loader for Angular and Ionic

Fast, themeable Angular skeleton loader for Angular 22 and Ionic Angular apps. Use standalone components, NgModule imports, SSR-friendly rendering, shimmer placeholders, pulse placeholders, wave placeholders, and responsive loading states with a small API.

[![npm version](https://img.shields.io/npm/v/ngxsmk-skeleton-loader.svg)](https://www.npmjs.com/package/ngxsmk-skeleton-loader)
[![downloads](https://img.shields.io/npm/dm/ngxsmk-skeleton-loader.svg)](https://www.npmjs.com/package/ngxsmk-skeleton-loader)
![angular version](https://img.shields.io/badge/angular-22-red)
![license](https://img.shields.io/badge/license-MIT-blue)

## Angular Skeleton Loader Features

- Standalone Angular component and structural directive
- NgModule export for module-based apps and many Ionic page/module setups
- SSR and prerender friendly: no direct browser DOM creation
- Ionic-aware color fallbacks through `--ion-color-step-*`
- Themeable with CSS custom properties
- Motion-safe animations with `prefers-reduced-motion`
- Tiny API for text, rect, circle, avatar, button, and image skeleton presets

## Install Angular Skeleton Loader

```bash
npm install ngxsmk-skeleton-loader
```

This release is built for Angular 22. For older Angular majors, publish or maintain matching package majors built with the same Angular major.

## Standalone Angular Usage

```ts
import {Component} from '@angular/core';
import {NgxSmkSkeletonComponent, NgxSmkSkeletonDirective} from 'ngxsmk-skeleton-loader';

@Component({
  standalone: true,
  imports: [NgxSmkSkeletonComponent, NgxSmkSkeletonDirective],
  templateUrl: './profile.html',
})
export class ProfileComponent {
  loading = true;
}
```

```html
<ngxsmk-skeleton type="text" width="80%"></ngxsmk-skeleton>
<ngxsmk-skeleton type="circle" size="56"></ngxsmk-skeleton>
<ngxsmk-skeleton type="rect" width="100%" [height]="180"></ngxsmk-skeleton>

<ng-container *ngxsmkSkeleton="loading; type: 'text'; width: '70%'">
  <p>Loaded content appears here</p>
</ng-container>
```

## Angular NgModule and Ionic Usage

```ts
import {NgModule} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {NgxSmkSkeletonModule} from 'ngxsmk-skeleton-loader';

@NgModule({
  imports: [IonicModule, NgxSmkSkeletonModule],
})
export class ProfilePageModule {}
```

## Inputs

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `type` | `'text' \| 'rect' \| 'circle' \| 'avatar' \| 'button' \| 'image'` | `text` | Shape preset |
| `width` | `string \| number` | `100%` | Width; numbers become px |
| `height` | `string \| number` | preset | Height; numbers become px |
| `size` | `string \| number` | unset | Shortcut for equal width and height |
| `radius` | `string \| number` | preset | Border radius |
| `animate` | `'shimmer' \| 'pulse' \| 'wave' \| 'none'` | `shimmer` | Animation style |
| `tint` | `string` | unset | Base color override |

## Skeleton Loader Theming

Override CSS variables globally, per page, or per skeleton:

```css
ngxsmk-skeleton {
  --ngx-skel-base: #e5e7eb;
  --ngx-skel-highlight: #ffffffb3;
}
```

In Ionic apps, the component falls back to Ionic color-step variables:

```css
ion-content {
  --ngx-skel-base: var(--ion-color-step-200);
  --ngx-skel-highlight: var(--ion-color-step-50);
}
```

## Development

```bash
npm run build -- ngxsmk-skeleton-loader
ng test ngxsmk-skeleton-loader --watch=false --browsers=ChromeHeadless
```

## Publish

```bash
npm run build -- ngxsmk-skeleton-loader
cd dist/ngxsmk-skeleton-loader
npm publish --access public
```

## License

MIT
