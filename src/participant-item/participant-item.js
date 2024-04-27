import { LitElement, html } from "lit";
import '@material/mwc-button/mwc-button';
import '@material/mwc-list/mwc-list-item';


class ParticipantItem extends LitElement {
    static get properties() {
        return {
            participant: { type: Object },
            isWishForm: { type: Boolean }
        }
    }

    constructor() {
        super();
        this.participant = {};
        this.isWishForm = false;
    }

    get _wishInput() {
        return this.shadowRoot.getElementById('wish-input');
    }

    _addWish() {
        const wish = this._wishInput.value;

        if(wish !== '') {
            this.participant = { ...this.participant, 'wishList': [ ...this.participant.wishList, wish ]};
            this._wishInput.value = '';
            this.isWishForm = false;
            this._dispatcherEvent('fire-updated-participant', { 'updatedParticipant': this.participant });
        }
    }

    _deleteParticipant(id) {
        this._dispatcherEvent('fire-deleted-participant', { });
    }

    _dispatcherEvent(eventName, data) {
        this.dispatchEvent(new CustomEvent(eventName, {
            bubbles: true,
            composed: true,
            detail: data
        }));
    }

    render() {
        return html`
            <div>
                <mwc-list-item>${ this.participant.name }</mwc-list-item>
                <mwc-button outlined @click=${ () => this.isWishForm = true }>WishList</mwc-button>
                <mwc-button outlined @click=${ () => this._deleteParticipant(this.participant.id) }>Delete</mwc-button>
                <p>Wish List: <span>${ this.participant.wishList.join(', ') }</span></p>
                
                ${ this.isWishForm ? html`
                    <mwc-textfield lable="Wish name" id="wish-input"></mwc-textfield>
                    <mwc-button @click=${ () => this._addWish() }>Add wish</mwc-button>
                ` : '' }
            </div>
        `;
    }
}

customElements.define('participant-item', ParticipantItem);
