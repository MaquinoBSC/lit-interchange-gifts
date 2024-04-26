import { LitElement, html } from "lit";
import '@material/mwc-button/mwc-button';
import '@material/mwc-textfield/mwc-textfield';

class WishList extends LitElement {
    static get properties() {
        return {
            list: { type: Array }
        }
    }

    constructor() {
        super();
        this.list = [];
    }

    get _wishInput() {
        return this.shadowRoot.getElementById('wish-input');
    }

    _addWish() {
        const wish = this._wishInput.value;
        this.dispatchEvent(new CustomEvent('fire_new_wish', {
            buble: true,
            composed: true,
            detail: { wish }
        }));
        this._wishInput.value = '';
    }

    render() {
        return html`
            <div>
                <mwc-textfield lable="Wish name" id="wish-input"></mwc-textfield>
                <mwc-button @click=${ () => this._addWish() }>Add wish</mwc-button>
            </div>>
        `;
    }
}

customElements.define('wish-list', WishList);