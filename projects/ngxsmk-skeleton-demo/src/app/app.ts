import {Component} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {NgxSmkSkeletonComponent, NgxSmkSkeletonDirective} from 'ngxsmk-skeleton-loader';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgOptimizedImage, NgxSmkSkeletonComponent, NgxSmkSkeletonDirective],
  template: `
    <main class="container">
      <header class="header">
        <h1>ngxsmk-skeleton-loader</h1>
        <p class="subtitle">Highly customizable modern skeleton placeholder animations for Angular</p>
      </header>

      <section class="controls-panel">
        <div class="control-group">
          <button type="button" class="btn" [class.btn-active]="loading" (click)="toggleLoading()">
            {{ loading ? 'Stop Loading' : 'Start Loading' }}
          </button>
          
          <button type="button" class="btn btn-secondary" [class.btn-active]="stopAnim" (click)="toggleStopAnim()">
            {{ stopAnim ? 'Resume Animation' : 'Pause Animation' }}
          </button>

          <button type="button" class="btn btn-secondary" [class.btn-active]="reverseAnim" (click)="toggleReverseAnim()">
            {{ reverseAnim ? 'Normal Direction' : 'Reverse Direction' }}
          </button>
        </div>
      </section>

      <section class="grid">
        <!-- Text Skeleton Example -->
        <div class="card">
          <div class="card-header">
            <h2>Standard Text Lines</h2>
            <span class="badge">Component Mode</span>
          </div>
          @if (loading) {
            <ngxsmk-skeleton type="text" width="60%" animate="wave" [stopAnimation]="stopAnim" [reverse]="reverseAnim"></ngxsmk-skeleton>
            <ngxsmk-skeleton type="text" width="80%" [stopAnimation]="stopAnim" [reverse]="reverseAnim"></ngxsmk-skeleton>
            <ngxsmk-skeleton type="text" width="40%" [stopAnimation]="stopAnim" [reverse]="reverseAnim"></ngxsmk-skeleton>
          } @else {
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <p>Dolor sit amet consectetur.</p>
            <p>Etiam porta sem malesuada magna mollis euismod.</p>
          }
        </div>

        <!-- Content Projection Wrapper Example -->
        <div class="card">
          <div class="card-header">
            <h2>Avatar + Bio (Content Projection)</h2>
            <span class="badge badge-primary">Wrapper Mode</span>
          </div>
          <div class="row">
            <ngxsmk-skeleton 
              type="circle" 
              size="56" 
              [visible]="!loading" 
              [stopAnimation]="stopAnim" 
              [reverse]="reverseAnim"
            >
              <img
                class="avatar"
                ngSrc="https://avatars.githubusercontent.com/u/42318070?v=4"
                alt="avatar"
                width="56"
                height="56"
              />
            </ngxsmk-skeleton>

            <div class="col" style="flex: 1;">
              <ngxsmk-skeleton 
                type="text" 
                width="80%" 
                [visible]="!loading" 
                [stopAnimation]="stopAnim" 
                [reverse]="reverseAnim"
              >
                <h3>Jane Developer</h3>
              </ngxsmk-skeleton>

              <ngxsmk-skeleton 
                type="text" 
                width="60%" 
                [visible]="!loading" 
                [stopAnimation]="stopAnim" 
                [reverse]="reverseAnim"
              >
                <p>Frontend Engineer</p>
              </ngxsmk-skeleton>
            </div>
          </div>
        </div>

        <!-- Custom Shimmer Colors & Custom Speed -->
        <div class="card">
          <div class="card-header">
            <h2>Custom Colors & Speeds</h2>
            <span class="badge badge-accent">Gradient Stops</span>
          </div>
          @if (loading) {
            <!-- Gold Theme Shimmer (Slow) -->
            <label class="demo-label">Gold Theme (2s duration, reverse):</label>
            <ngxsmk-skeleton 
              type="rect" 
              width="100%" 
              height="36px" 
              [shimmerColors]="goldGradient" 
              [locations]="[0, 0.5, 1]" 
              [duration]="2000"
              [reverse]="true"
              [stopAnimation]="stopAnim"
            ></ngxsmk-skeleton>

            <!-- Ocean Theme Wave (Fast) -->
            <label class="demo-label" style="margin-top: 1rem; display: block;">Ocean Breeze (800ms duration, wave):</label>
            <ngxsmk-skeleton 
              type="rect" 
              width="100%" 
              height="36px" 
              animate="wave"
              [shimmerColors]="oceanGradient" 
              [locations]="[0.2, 0.5, 0.8]" 
              [duration]="800"
              [stopAnimation]="stopAnim"
              [reverse]="reverseAnim"
            ></ngxsmk-skeleton>
          } @else {
            <div class="theme-showcase">
              <div class="theme-box gold-box">Gold Content Loaded</div>
              <div class="theme-box ocean-box">Ocean Content Loaded</div>
            </div>
          }
        </div>

        <!-- Structural Directive with Custom Settings -->
        <div class="card">
          <div class="card-header">
            <h2>Structural Directive</h2>
            <span class="badge">Directive Mode</span>
          </div>
          
          <div 
            *ngxsmkSkeleton="
              loading; 
              type: 'rect'; 
              height: '180px'; 
              shimmerColors: forestGradient; 
              duration: 1500; 
              stopAnimation: stopAnim;
              reverse: reverseAnim
            "
          >
            <img
              class="banner"
              src="https://picsum.photos/seed/banner/640/180"
              alt="banner"
              width="640"
              height="180"
            />
          </div>
        </div>

        <!-- Social Media Feed Card Example -->
        <div class="card social-card">
          <div class="card-header">
            <h2>Social Feed Card</h2>
            <span class="badge badge-primary">Rich Layout</span>
          </div>

          <div class="row">
            <ngxsmk-skeleton type="circle" size="40" [visible]="!loading" [stopAnimation]="stopAnim" [reverse]="reverseAnim">
              <img class="avatar" ngSrc="https://avatars.githubusercontent.com/u/42318070?v=4" alt="user" width="40" height="40" />
            </ngxsmk-skeleton>
            <div class="col" style="flex: 1; gap: 0.25rem;">
              <ngxsmk-skeleton type="text" width="40%" height="14px" [visible]="!loading" [stopAnimation]="stopAnim" [reverse]="reverseAnim">
                <span class="author-name">Alex Rivera</span>
              </ngxsmk-skeleton>
              <ngxsmk-skeleton type="text" width="20%" height="10px" [visible]="!loading" [stopAnimation]="stopAnim" [reverse]="reverseAnim">
                <span class="post-time">2 hrs ago</span>
              </ngxsmk-skeleton>
            </div>
          </div>

          <div class="post-body">
            @if (loading) {
              <ngxsmk-skeleton type="text" width="100%" [stopAnimation]="stopAnim" [reverse]="reverseAnim"></ngxsmk-skeleton>
              <ngxsmk-skeleton type="text" width="90%" [stopAnimation]="stopAnim" [reverse]="reverseAnim"></ngxsmk-skeleton>
              <ngxsmk-skeleton type="rect" width="100%" height="160px" radius="8px" style="margin-top: 0.5rem;" [stopAnimation]="stopAnim" [reverse]="reverseAnim"></ngxsmk-skeleton>
            } @else {
              <p class="post-text">Exploring the new layout and features of the library. Custom gradients, colors, durations, and pause states are looking awesome! Check this preview out:</p>
              <img src="https://picsum.photos/seed/social/640/320" alt="post attachment" class="post-img" />
            }
          </div>

          <div class="post-actions row">
            <ngxsmk-skeleton type="button" width="70px" height="28px" radius="6px" [visible]="!loading" [stopAnimation]="stopAnim" [reverse]="reverseAnim">
              <button class="action-btn">❤️ Like</button>
            </ngxsmk-skeleton>
            <ngxsmk-skeleton type="button" width="90px" height="28px" radius="6px" [visible]="!loading" [stopAnimation]="stopAnim" [reverse]="reverseAnim">
              <button class="action-btn">💬 Comment</button>
            </ngxsmk-skeleton>
          </div>
        </div>

        <!-- E-Commerce Product Card Example -->
        <div class="card product-card">
          <div class="card-header">
            <h2>E-Commerce Card</h2>
            <span class="badge badge-accent">Complex Shapes</span>
          </div>

          <div class="product-img-container">
            @if (loading) {
              <ngxsmk-skeleton type="image" width="100%" height="150px" radius="8px" [stopAnimation]="stopAnim" [reverse]="reverseAnim"></ngxsmk-skeleton>
            } @else {
              <img src="https://picsum.photos/seed/shoes/240/150" alt="product" class="product-img" />
              <span class="sale-badge">SALE</span>
            }
          </div>

          <div class="col" style="gap: 0.5rem;">
            <ngxsmk-skeleton type="text" width="80%" height="18px" [visible]="!loading" [stopAnimation]="stopAnim" [reverse]="reverseAnim">
              <h3 class="product-title">Ultra Lightweight Run Shoes</h3>
            </ngxsmk-skeleton>

            <!-- Star ratings -->
            <div class="row" style="gap: 4px;">
              @if (loading) {
                @for (star of [1,2,3,4,5]; track star) {
                  <ngxsmk-skeleton type="circle" size="12" [stopAnimation]="stopAnim" [reverse]="reverseAnim"></ngxsmk-skeleton>
                }
              } @else {
                <div class="stars">⭐⭐⭐⭐⭐</div>
              }
            </div>

            <div class="row" style="justify-content: space-between; align-items: center; margin-top: 0.5rem;">
              <ngxsmk-skeleton type="text" width="35%" height="22px" [visible]="!loading" [stopAnimation]="stopAnim" [reverse]="reverseAnim">
                <span class="product-price">$89.00 <span class="old-price">$120.00</span></span>
              </ngxsmk-skeleton>

              <ngxsmk-skeleton type="button" width="35%" height="32px" radius="20px" [visible]="!loading" [stopAnimation]="stopAnim" [reverse]="reverseAnim">
                <button class="buy-btn">Buy</button>
              </ngxsmk-skeleton>
            </div>
          </div>
        </div>

        <!-- Dashboard Stats Card Example -->
        <div class="card dashboard-card">
          <div class="card-header">
            <h2>Dashboard Panel</h2>
            <span class="badge">Analytics</span>
          </div>

          <div class="stats-row">
            <div class="stat-box">
              <span class="stat-label">Sales</span>
              <ngxsmk-skeleton type="text" width="60%" height="24px" [visible]="!loading" [stopAnimation]="stopAnim" [reverse]="reverseAnim">
                <span class="stat-value">$12.4k</span>
              </ngxsmk-skeleton>
              <ngxsmk-skeleton type="text" width="40%" height="10px" [visible]="!loading" [stopAnimation]="stopAnim" [reverse]="reverseAnim">
                <span class="stat-change color-green">+14.2%</span>
              </ngxsmk-skeleton>
            </div>

            <div class="stat-box">
              <span class="stat-label">Users</span>
              <ngxsmk-skeleton type="text" width="60%" height="24px" [visible]="!loading" [stopAnimation]="stopAnim" [reverse]="reverseAnim">
                <span class="stat-value">1,842</span>
              </ngxsmk-skeleton>
              <ngxsmk-skeleton type="text" width="40%" height="10px" [visible]="!loading" [stopAnimation]="stopAnim" [reverse]="reverseAnim">
                <span class="stat-change color-green">+8.4%</span>
              </ngxsmk-skeleton>
            </div>
          </div>

          <div class="chart-mockup">
            @if (loading) {
              <div class="row" style="align-items: flex-end; height: 80px; justify-content: space-around; padding-bottom: 5px;">
                <ngxsmk-skeleton type="rect" width="12%" height="30px" radius="4px" [stopAnimation]="stopAnim" [reverse]="reverseAnim"></ngxsmk-skeleton>
                <ngxsmk-skeleton type="rect" width="12%" height="55px" radius="4px" [stopAnimation]="stopAnim" [reverse]="reverseAnim"></ngxsmk-skeleton>
                <ngxsmk-skeleton type="rect" width="12%" height="40px" radius="4px" [stopAnimation]="stopAnim" [reverse]="reverseAnim"></ngxsmk-skeleton>
                <ngxsmk-skeleton type="rect" width="12%" height="75px" radius="4px" [stopAnimation]="stopAnim" [reverse]="reverseAnim"></ngxsmk-skeleton>
                <ngxsmk-skeleton type="rect" width="12%" height="60px" radius="4px" [stopAnimation]="stopAnim" [reverse]="reverseAnim"></ngxsmk-skeleton>
              </div>
            } @else {
              <div class="chart-bars">
                <div class="chart-bar" style="height: 30px;"></div>
                <div class="chart-bar" style="height: 55px;"></div>
                <div class="chart-bar" style="height: 40px;"></div>
                <div class="chart-bar" style="height: 75px;"></div>
                <div class="chart-bar" style="height: 60px;"></div>
              </div>
            }
          </div>
        </div>
      </section>
    </main>
  `,
  styles: [`
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 3rem 1.5rem;
      font-family: 'Outfit', system-ui, -apple-system, sans-serif;
      background: #f8fafc;
      min-height: 100vh;
      color: #0f172a;
    }

    .header {
      text-align: center;
      margin-bottom: 3rem;
    }

    h1 {
      font-size: 2.5rem;
      font-weight: 800;
      color: #0ea5e9;
      margin-bottom: 0.5rem;
      letter-spacing: -0.025em;
    }

    .subtitle {
      font-size: 1.125rem;
      color: #64748b;
    }

    .controls-panel {
      background: white;
      padding: 1.25rem;
      border-radius: 1rem;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.1);
      margin-bottom: 2.5rem;
      display: flex;
      justify-content: center;
    }

    .control-group {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .btn {
      padding: 0.625rem 1.25rem;
      border-radius: 0.5rem;
      border: 1px solid #e2e8f0;
      background: white;
      color: #334155;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .btn:hover {
      background: #f1f5f9;
      border-color: #cbd5e1;
    }

    .btn-active {
      background: #0ea5e9 !important;
      color: white !important;
      border-color: #0284c7 !important;
      box-shadow: 0 4px 6px -1px rgba(14, 165, 233, 0.2);
    }

    .btn-secondary.btn-active {
      background: #475569 !important;
      border-color: #334155 !important;
      box-shadow: 0 4px 6px -1px rgba(71, 85, 105, 0.2);
    }

    .grid {
      display: grid;
      gap: 2rem;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    }

    .card {
      padding: 1.75rem;
      border: 1px solid #f1f5f9;
      border-radius: 1.25rem;
      background: #fff;
      box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.02);
      display: grid;
      gap: 1rem;
      align-content: start;
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
    }

    .card h2 {
      font-size: 1.25rem;
      font-weight: 700;
      margin: 0;
      color: #1e293b;
    }

    .badge {
      font-size: 0.75rem;
      font-weight: 700;
      padding: 0.25rem 0.625rem;
      background: #f1f5f9;
      color: #475569;
      border-radius: 9999px;
    }

    .badge-primary {
      background: #e0f2fe;
      color: #0369a1;
    }

    .badge-accent {
      background: #fef3c7;
      color: #b45309;
    }

    .demo-label {
      font-size: 0.875rem;
      font-weight: 600;
      color: #64748b;
    }

    .row {
      display: flex;
      gap: 1rem;
      align-items: center;
    }

    .col {
      display: grid;
      gap: 0.75rem;
    }

    .avatar {
      border-radius: 9999px;
      object-fit: cover;
    }

    .banner {
      width: 100%;
      height: 180px;
      object-fit: cover;
      border-radius: 0.75rem;
    }

    .theme-showcase {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .theme-box {
      padding: 0.75rem;
      border-radius: 0.5rem;
      font-weight: 700;
      text-align: center;
    }

    .gold-box {
      background: #fef3c7;
      color: #b45309;
      border: 1px solid #fde68a;
    }

    .ocean-box {
      background: #e0f2fe;
      color: #0369a1;
      border: 1px solid #bae6fd;
    }

    /* Social Feed Layout */
    .author-name {
      font-weight: 700;
      font-size: 0.95rem;
    }
    .post-time {
      font-size: 0.75rem;
      color: #94a3b8;
    }
    .post-text {
      font-size: 0.9rem;
      line-height: 1.5;
      color: #334155;
      margin: 0 0 0.75rem;
    }
    .post-img {
      width: 100%;
      height: 160px;
      object-fit: cover;
      border-radius: 8px;
    }
    .action-btn {
      border: 1px solid #e2e8f0;
      background: #f8fafc;
      padding: 0.25rem 0.75rem;
      font-size: 0.85rem;
      border-radius: 6px;
      cursor: pointer;
    }

    /* Product card */
    .product-img-container {
      position: relative;
    }
    .product-img {
      width: 100%;
      height: 150px;
      object-fit: cover;
      border-radius: 8px;
    }
    .sale-badge {
      position: absolute;
      top: 8px;
      left: 8px;
      background: #ef4444;
      color: white;
      font-size: 0.7rem;
      font-weight: 800;
      padding: 2px 6px;
      border-radius: 4px;
    }
    .product-title {
      font-size: 1rem;
      font-weight: 700;
      margin: 0;
    }
    .product-price {
      font-weight: 800;
      font-size: 1.15rem;
      color: #0f172a;
    }
    .old-price {
      font-size: 0.85rem;
      text-decoration: line-through;
      color: #94a3b8;
      font-weight: 500;
      margin-left: 4px;
    }
    .buy-btn {
      width: 100%;
      height: 100%;
      border-radius: 20px;
      border: none;
      background: #0f172a;
      color: white;
      font-weight: 700;
      cursor: pointer;
    }

    /* Dashboard card */
    .stats-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
    .stat-box {
      border: 1px solid #f1f5f9;
      padding: 0.75rem;
      border-radius: 8px;
      background: #f8fafc;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    .stat-label {
      font-size: 0.75rem;
      color: #64748b;
      font-weight: 600;
    }
    .stat-value {
      font-size: 1.25rem;
      font-weight: 800;
      color: #0f172a;
    }
    .stat-change {
      font-size: 0.75rem;
      font-weight: 700;
    }
    .color-green {
      color: #10b981;
    }
    .chart-mockup {
      border: 1px solid #f1f5f9;
      border-radius: 8px;
      padding: 8px;
    }
    .chart-bars {
      display: flex;
      align-items: flex-end;
      height: 80px;
      justify-content: space-around;
      padding-bottom: 5px;
    }
    .chart-bar {
      width: 12%;
      background: #0ea5e9;
      border-radius: 4px;
    }
  `]
})
export class App {
  loading = true;
  stopAnim = false;
  reverseAnim = false;

  goldGradient = ['#fef3c7', '#fde68a', '#fef3c7'];
  oceanGradient = ['#bae6fd', '#38bdf8', '#bae6fd'];
  forestGradient = ['#dcfce7', '#4ade80', '#dcfce7'];

  toggleLoading() {
    this.loading = !this.loading;
  }

  toggleStopAnim() {
    this.stopAnim = !this.stopAnim;
  }

  toggleReverseAnim() {
    this.reverseAnim = !this.reverseAnim;
  }
}

