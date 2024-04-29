import { LitElement, html } from "lit";
import '@material/mwc-button/mwc-button';
import '@material/mwc-list/mwc-list';
import '@material/mwc-textfield/mwc-textfield';
import { v4 } from 'uuid';

import './src/participant-item/participant-item.js';
import './src/raffle-item/raffle-item.js';
import { interchangeGiftsStyles } from './lit-interchange-gifts-styles.js';


class LitInterchangeGifts extends LitElement {
    static get properties() {
        return {
            participantList: { type: Array },
            currentWishList: { type: Array },
            raffleList: { type: Array }
        }
    }

    static styles = interchangeGiftsStyles;

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
        const participant = this._participantInput.value.toUpperCase();
        if(participant !== ''){
            if(this.participantList.some((p) => p.name === participant)) {
                alert('Ya existe un participante con ese nombre');
                return
            }

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
            else return { from: participant.name, to: this.participantList[idx + 1].name }
        });
    }

    _updatingParticipant(id, { detail }) {
        this.participantList = this.participantList.map((participant) => participant.id === id ? detail.updatedParticipant : participant )
    }

    _deletingParticipant(id) {
        this.participantList = this.participantList.filter((participant) => participant.id !== id );
        this.raffleList = [];
    }

    render() {
        return html`
            <div class="main-container">
                <h1>Interchange of Gifts</h1>
                <div class="form-add-participant">
                    <mwc-textfield label="Participant name" id="participant-input"></mwc-textfield>
                    <mwc-button raised @click=${ () => this._addParticipant() }>Add participant</mwc-button>
                </div>
                <div class="participants-container">
                    <mwc-list>
                        ${
                            this.participantList.length > 0 ? this.participantList.map((participant) => 
                                html`
                                    <participant-item 
                                        .participant=${participant} 
                                        @fire-updated-participant=${ e => this._updatingParticipant(participant.id, e) }
                                        @fire-deleted-participant=${ () => this._deletingParticipant(participant.id) }
                                    ></participant-item>
                                `) : html`<p>No hay participantes aun</p>`
                        }
                    </mwc-list>
                </div>
                <div>
                    ${
                        this._raffleStatus ? html`
                            <mwc-button raised @click=${ () => this._fireRaffle() }>Raffle</mwc-button>
                            ${
                                this.raffleList.length > 0 ? this.raffleList.map((raffle) => html`
                                    <raffle-item .raffle=${ raffle }></raffle-item>
                                `) : ''
                            }
                        ` : html`<p>Para realizar el sorteo necesitas al menos 3 participantes y que cada uno tenga al menos un elemento en su lista de deseos</p>`
                    }
                </div>
            </div>
        `;
    }
}

customElements.define('lit-interchange-gifts', LitInterchangeGifts);
