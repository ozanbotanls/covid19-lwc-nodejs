import { LightningElement } from 'lwc';
export default class NavBar extends LightningElement {
    navItems = ['World', 'Country List'];

    handleNavItemClick(event) {
        this.selectedItem = event.currentTarget.dataset.item;
        //this.styleNavItem(this.currentNavItem, this.selectedItem);
        event.preventDefault();
        this.dispatchEvent(
            new CustomEvent('categorychange', {
                detail: this.selectedItem
            })
        );
    }
}
