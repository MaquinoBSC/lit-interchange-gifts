import { LitElement, html } from "lit";
import '@material/mwc-button/mwc-button';

import { participantStyles } from './participant-item-styles.js';


class ParticipantItem extends LitElement {
    static get properties() {
        return {
            participant: { type: Object },
            isWishForm: { type: Boolean }
        }
    }

    static styles = participantStyles;

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

    _deleteParticipant() {
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
            <div class="participant-container">
                <div class="view-participant">
                    <p>
                        <span>Name: </span>
                        ${ this.participant.name }
                    </p>
                    <p>
                        <span>Wish List:</span>
                        ${ this.participant.wishList.join(', ') }
                    </p>
                </div>
                <div class="view-participant mwc-container">
                    <mwc-button 
                        outlined @click=${ () => this.isWishForm = true }
                    >wishlist: </mwc-button>
                    <mwc-button 
                        outlined 
                        @click=${ () => this._deleteParticipant() }
                    >delete</mwc-button>
                </div>
                
                
                ${ this.isWishForm ? html`
                    <div class="view-participant mwc-container">
                        <mwc-textfield label="Wish name" id="wish-input"></mwc-textfield>
                        <mwc-button raised @click=${ () => this._addWish() }>add</mwc-button>
                    </div>
                ` : '' }
            </div>
        `;
    }
}

customElements.define('participant-item', ParticipantItem);
