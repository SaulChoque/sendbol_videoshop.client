import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-svg-icon',
  templateUrl: './svg-icon.component.html',
  styleUrl: './svg-icon.component.scss',
  imports: [CommonModule],
})
export class SvgIconComponent implements OnChanges {
  @Input() name!: string;
  @Input() width: string = '32px';
  @Input() height: string = '32px';
  @Input() fill: string = 'currentColor';

  svgContent: SafeHtml = '';

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  ngOnChanges() {
    if (this.name) {
      this.http.get(`./assets/images/icons/${this.name}.html`, { responseType: 'text' })
        .subscribe(svg => {
          const svgWithAttrs = svg
            .replace(/fill\s*=\s*["'][^"']*["']/g, `fill="${this.fill}"`)
            .replace('<svg', `<svg width="${this.width}" height="${this.height}"`);
          this.svgContent = this.sanitizer.bypassSecurityTrustHtml(svgWithAttrs);
        });
    }
  }
}
