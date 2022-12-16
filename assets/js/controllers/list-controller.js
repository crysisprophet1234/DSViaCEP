function State() {
    this.listSection = null;
}

const state = new State();

export function init() {
    state.listSection = document.querySelector("#list-section");
}

export function addCard(address) {
    const card = createCard(address);
    state.listSection.appendChild(card);
}

function createCard(address) {

    const div = document.createElement('div');
    div.classList.add('list-black-card');

    const h3 = document.createElement('h3');
    h3.classList.add('estado');
    h3.innerText = `${address.cidade}, ${address.uf}`;

    const p1 = document.createElement('p');
    p1.classList.add('logradouro')
    p1.innerText = `${address.logradouro}, ${address.numero}`;

    const p2 = document.createElement('p');
    p2.classList.add('cep')
    p2.innerText = address.cep;

    const elements = [h3, p1, p2];

    elements.forEach(element => {

        div.appendChild(element);

    })

    return div;

}





//<div class="list-black-card">
//  <h3 id="estado">Estado</h3>
//  <p id="logradouro">Logradouro, número</p>
//  <p id="cep">CEP</p>
//</div>