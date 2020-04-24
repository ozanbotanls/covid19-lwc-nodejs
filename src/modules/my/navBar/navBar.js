import { LightningElement } from 'lwc';
export default class NavBar extends LightningElement {
    navItems = ['World', 'Country List'];
    currentNavItem = 'Country List';
    renderedCallback() {
        if (this._isRendered) return;
        this._isRendered = true;
        this.template
            .querySelector(`a[data-item="${this.currentNavItem}"]`)
            .parentNode.classList.add('active');
    }

    handleNavItemClick(event) {
        this.selectedItem = event.currentTarget.dataset.item;
        this.styleNavItem(this.currentNavItem, this.selectedItem);
        this.currentNavItem = this.selectedItem;
        event.preventDefault();
        this.dispatchEvent(
            new CustomEvent('categorychange', {
                detail: this.selectedItem
            })
        );
    }

    styleNavItem(itemOld, itemNew) {
        const tabOld = this.template.querySelector(`a[data-item="${itemOld}"]`)
            .parentNode;
        const tabNew = this.template.querySelector(`a[data-item="${itemNew}"]`)
            .parentNode;
        tabOld.classList.remove('active');
        tabNew.classList.add('active');
    }
}
