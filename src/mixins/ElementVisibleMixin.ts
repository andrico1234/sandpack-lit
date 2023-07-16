import { LitElement } from "lit"
import { property } from "lit/decorators.js";

type Constructor<T> = new (...args: any[]) => T;

export declare class ElementVisibleInterface {
  isVisible: boolean;
}

interface MixinOptions {
  removeOnceVisible?: boolean
}

export const ElementVisible = <T extends Constructor<LitElement>>(superClass: T, options?: MixinOptions) => {
  class ElementVisibleMixin extends superClass {
    _observer!: IntersectionObserver

    @property({ type: Boolean })
    isVisible = false

    removeOnceVisible = false

    connectedCallback(): void {
      super.connectedCallback();

      if (options?.removeOnceVisible) {
        this.removeOnceVisible = true
      }

      if (!this.isVisible) {
        this._observer = new IntersectionObserver(this.handleVisiblityChange.bind(this), {
          threshold: 0.1
        })

        this._observer.observe(this)
      }
    }

    disconnectedCallback(): void {
      super.disconnectedCallback()

      if (this._observer) {
        this._observer.disconnect()
      }
    }

    handleVisiblityChange(e: IntersectionObserverEntry[]) {
      if (e[0].isIntersecting) {
        this.isVisible = true

        if (this.removeOnceVisible) {
          this._observer.disconnect()
        }
      }
    }
  }


  return ElementVisibleMixin as Constructor<ElementVisibleInterface> & T;
}
