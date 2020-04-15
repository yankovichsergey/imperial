import {
    Injectable
} from '@angular/core';

@Injectable()
export class PopupsDialogService {

    private lazyTimers: Array<any> = [];

    public blockDisable(appendTo: string): void {
        const appendToElement = document.querySelector(appendTo);
        if (appendToElement) {
            let divDisable = appendToElement.querySelector('.block-disable');
            if (!divDisable) {
                divDisable = this.createDivDisable();
                appendToElement.appendChild(divDisable);
            }
        }
    }

    public blockEnable(appendTo: string): void {
        const appendToElement = document.querySelector(appendTo);
        if (appendToElement) {
            const divDisable = appendToElement.querySelector('.block-disable');
            if (divDisable) {
                divDisable.parentNode.removeChild(divDisable);
            }
        }
    }

    public startRelativeLoading(appendTo: string, delay: number = 100, level?: string): void {
        const appendToElement = document.querySelector(appendTo);
        let relativeLoading = document.querySelector(appendTo + ' .relative-loading');
        if (!relativeLoading) {
            relativeLoading = document.createElement('div');
            relativeLoading.classList.add('relative-loading', 'relative-loading-hide');
            if (level) {
                relativeLoading.classList.add(level);
            }

            if (delay === 0) {
                this.showRelativeLoading(appendToElement, relativeLoading);
            } else {
                const lazyTimer = setTimeout(() => {
                    this.showRelativeLoading(appendToElement, relativeLoading);
                }, delay);
                this.addToTimers(appendTo, lazyTimer);
            }
        }
    }

    public breackRelativeLoading(appendTo: string): void {
        this.clearTimers(appendTo);
        const relativeLoading = document.querySelector(appendTo + ' .relative-loading');
        if (relativeLoading) {
            relativeLoading.classList.add('relative-loading-hide');
            setTimeout(() => {
                if (relativeLoading.parentNode) {
                    relativeLoading.parentNode.removeChild(relativeLoading);
                }
            }, 300);
        }
    }


    private showRelativeLoading(appendToElement: Element, relativeLoading: Element): void {
        appendToElement.appendChild(relativeLoading);
        setTimeout(() => {
            relativeLoading.classList.remove('relative-loading-hide');
        });
    }

    private createDivDisable(): HTMLElement {
        const divDisable = document.createElement('div');
        divDisable.classList.add('block-disable');
        return divDisable;
    }

    private addToTimers(appendTo: string, lazyTimer: any): void {
        this.clearTimers(appendTo);
        this.lazyTimers.push({ name: appendTo, timer: lazyTimer });
    }

    private clearTimers(appendTo: string): void {
        this.lazyTimers = this.lazyTimers.filter((it) => {
            if (it.name === appendTo) {
                clearTimeout(it.timer);
                it.timer = null;
            }
            return it.name !== appendTo;
        });

    }
}
