import { LitElement, html } from "lit";
import '@material/mwc-button/mwc-button';
import '@material/mwc-list/mwc-list';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-textfield/mwc-textfield';
import { v4 } from 'uuid';


class LitInterchangeGifts extends LitElement {
    static get properties() {
        return {
            participantList: { type: Array }
        }
    }

    constructor() {
        super();
        this.participantList = [];
    }

    get _participantInput() {
        return this.shadowRoot.getElementById('participant-input');
    }

    _addParticipant() {
        const participant = this._participantInput.value;
        if(participant !== ''){
            this.participantList.push({ name: participant, id: v4() });
            this._participantInput.value = '';
            this.requestUpdate();
        }
    }

    _deleteParticipant(id) {
        this.participantList = this.participantList.filter(participant => participant.id !== id);
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
                                <mwc-button outlined>WishList</mwc-button>
                                <mwc-button outlined @click=${ () => this._deleteParticipant(id) }>Delete</mwc-button>
                            `) : html`<p>No hay participantes aun</p>`
                        }
                    </mwc-list>
                </div>
            </div>
        `;
    }
}

customElements.define('lit-interchange-gifts', LitInterchangeGifts);
