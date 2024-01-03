import { ElementRef, Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {

  private renderer: Renderer2;

  constructor(private rendererFactory: RendererFactory2) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  animateButton = (target: HTMLElement): void => {
    this.renderer.addClass(target, 'animate');
    setTimeout(() => {
      this.renderer.removeClass(target, 'animate');
    }, 1000);
  };

  attachAnimationListener(elementRef: ElementRef) {
    const nativeElement = elementRef.nativeElement;
    if (nativeElement && nativeElement.classList.contains('bubbly-button')) {
      nativeElement.addEventListener('click', () => this.animateButton(nativeElement), { capture: false });
    }
  }
}

