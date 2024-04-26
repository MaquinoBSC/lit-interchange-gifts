import { LitElement, html } from "lit";
import '@material/mwc-button/mwc-button';
import '@material/mwc-list/mwc-list';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-textfield/mwc-textfield';
import { v4 } from 'uuid';

import './wish-list.js'


class LitInterchangeGifts extends LitElement {
    static get properties() {
        return {
            participantList: { type: Array },
            wishList: { type: Array },
            currentWishList: { type: Array },
        }
    }

    constructor() {
        super();
        this.participantList = [];
        this.wishList = [];
        this.currentWishList = '';
    }

    get _participantInput() {
        return this.shadowRoot.getElementById('participant-input');
    }

    _addParticipant() {
        const participant = this._participantInput.value;
        if(participant !== ''){
            this.participantList.push({ name: participant, wishList: [], id: v4() });
            this._participantInput.value = '';
            this.requestUpdate();
        }
    }

    _deleteParticipant(id) {
        this.participantList = this.participantList.filter(participant => participant.id !== id);
    }

    _addToWishList({ detail }) {
        this.wishList = [ ...this.wishList, detail.wish ];
        this.currentWishList = '';
    }

    render() {
        return html`
            <div>
                <h1>Intercambio de regalos</h1>
                <div>
                    <mwc-textfield label="Participant name" id="participant-input"></mwc-textfield>
                    <mwc-button raised @click=${ () => this._addParticipant() }>Add participant</mwc-button>
                </div>
                <div>
                    <mwc-list>
                        ${
                            this.participantList.length > 0 ? this.participantList.map(({ name, id }) => html`
                                <mwc-list-item>${ name }</mwc-list-item>
                                <mwc-button outlined @click=${ () => this.currentWishList = id }>WishList</mwc-button>
                                <mwc-button outlined @click=${ () => this._deleteParticipant(id) }>Delete</mwc-button>
                                <p>Wish List: <span>${ this.wishList.join(',') }</span></p>
                                
                                ${ this.currentWishList === id ? html`
                                    <wish-list @fire_new_wish=${ (e) => this._addToWishList(e) }></wish-list>
                                ` : '' }
                            `) : html`<p>No hay participantes aun</p>`
                        }
                    </mwc-list>
                </div>
            </div>
        `;
    }
}

customElements.define('lit-interchange-gifts', LitInterchangeGifts);
