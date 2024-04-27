import { LitElement, html } from "lit";

class RaffleItem extends LitElement {
    static get properties() {
        return {
            raffle: { type: Object }
        }
    }

    constructor() {
        super();
        this.raffle = {};
    }

    render() {
        return html`
           <div>
                <p><span>from: </span> ${ this.raffle.from } <span>to: </span> ${ this.raffle.to }</p>
           </div>
        `;
    }
}

customElements.define('raffle-item', RaffleItem);
