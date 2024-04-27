import { LitElement, html } from "lit";
import '@material/mwc-button/mwc-button';
import '@material/mwc-list/mwc-list';
import '@material/mwc-textfield/mwc-textfield';
import { v4 } from 'uuid';

import './src/participant-item/participant-item.js';

class LitInterchangeGifts extends LitElement {
    static get properties() {
        return {
            participantList: { type: Array },
            currentWishList: { type: Array },
            raffleList: { type: Array }
        }
    }

    constructor() {
        super();
        this.participantList = [];
        this.currentWishList = '';
        this.raffleList = [];
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

    get _raffleStatus() {
        return (!this.participantList.some((participant) => participant.wishList.length === 0) && this.participantList.length >= 3);
    }

    _fireRaffle() {
        const size = this.participantList.length;
        this.raffleList = this.participantList.map((participant, idx) => {
            if(idx === size - 1) return { from: participant.name, to: this.participantList[0].name }
            else return { form: participant.name, to: this.participantList[idx + 1].name }
        });
    }

    _updatingParticipant(id, { detail }) {
        this.participantList = this.participantList.map((participant) => participant.id === id ? detail.updatedParticipant : participant )
        console.log(this.participantList);
    }

    _deletingParticipant(id) {
        this.participantList = this.participantList.filter((participant) => participant.id !== id );
    }

    render() {
        return html`
            <div>
                <h1>Interchange of Gifts</h1>
                <div>
                    <mwc-textfield label="Participant name" id="participant-input"></mwc-textfield>
                    <mwc-button raised @click=${ () => this._addParticipant() }>Add participant</mwc-button>
                </div>
                <div>
                    <mwc-list>
                        ${
                            this.participantList.length > 0 ? this.participantList.map((participant) => 
                                html`
                                    <participant-item 
                                        .participant=${participant} 
                                        @fire-updated-participant=${ e => this._updatingParticipant(participant.id, e) }
                                        @fire-deleted-participant=${ e => this._deletingParticipant(participant.id) }
                                    ></participant-item>
                                `) : html`<p>No hay participantes aun</p>`
                        }
                    </mwc-list>
                    ${
                        this._raffleStatus ? html`<mwc-button @click=${ () => this._fireRaffle() }>Raffle</mwc-button>` : ''
                    }
                </div>
            </div>
        `;
    }
}

customElements.define('lit-interchange-gifts', LitInterchangeGifts);
