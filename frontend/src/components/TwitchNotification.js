import { css, html, LitElement } from 'lit-element';

export default class TwitchNotification extends LitElement {

    static get styles() {
        return css`
            @keyframes slide-in {
                from { transform: translate(0, -20px); opacity: 0; }
            }

            :host {
                display: block;
                position: absolute;
                top: -50px;
                left: 50%;
                width: 100%;
                transform: translateX(-50%);
                z-index: 100000;
            }

            a {
                color: #fff;
                opacity: 0.5;
                text-decoration: none;
            }

            .notification-banner {
                width: auto;
                padding: 10px 10px 10px 20px;
                background: rebeccapurple;
                border-radius: 5px;
                max-width: 900px;
                overflow: hidden;
                text-overflow: ellipsis;
                box-shadow: 1px 2px 12px rgba(0, 0, 0, 0.25);
            }

            .container {
                animation: slide-in .5s ease;
                max-width: 1100px;
                margin: auto;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            link-button {
                margin: 0px 0px 0px 20px;
                --padding: 7px 14px;
                --background: #eee;
            }

            .label {

            }

            .title {
                opacity: 0.5;
            }
        `;
    }

    constructor() {
        super();

        this.stream = null;

        const url = "https://twitch-live-status.luckydye.repl.co/live/luckydye";
        fetch(url).then(res => {
            if(!res.ok) {
                console.error("Error fetching live status");
            }
            return res.json();
        }).then(data => {
            if(data[0] != null) {
                this.stream = data[0];
                console.log('Live!');
                this.update();
            }
        })
    }

    render() {
        if(this.stream) {
            return html`
                <div class="container">
                    <div class="notification-banner">
                        <span class="label">Hey! Im live on Twitch, come hang out!</span>
                        <span class="title">${this.stream.title}</span>

                        <link-button href="http://twitch.tv/${this.stream.user_login}">Open Stream</link-button>
                    </div>
                </div>
            `;
        }

        return html`
            <div></div>
        `;
    }
}

customElements.define('twitch-notification', TwitchNotification);