import Address from '../models/address.js';
import * as addressService from '../services/address-service.js';
import * as listController from './list-controller.js';

function State() {

    this.address = new Address();

    this.btnSalvar = null;
    this.btnLimpar = null;

    this.inputCep = null;
    this.inputLogradouro = null;
    this.inputNumero = null;
    this.inputCidade = null;

    this.errorCep = null;
    this.errorNumero = null;
}

const state = new State();

export function init() {

    const inputs = document.querySelectorAll('input');

    const inputList = {

        cep: inputs[0],
        logradouro: inputs[1],
        numero: inputs[2],
        cidade: inputs[3],
        bairro: inputs[4]

    }

    state.inputCep = inputList.cep;
    state.inputLogradouro = inputList.logradouro;
    state.inputNumero = inputList.numero;
    state.inputCidade = inputList.cidade;
    state.inputBairro = inputList.bairro;

    state.btnSalvar = document.getElementById('salvar-btn');
    state.btnLimpar = document.getElementById('limpar-btn');

    state.errorCep = document.querySelector('[data-error="cep"]');
    state.errorNumero = document.querySelector('[data-error="numero"]');

    state.inputCep.addEventListener('change', handleInputCepChange);
    state.inputCep.addEventListener('keyup', handleInputForm);

    state.inputNumero.addEventListener('change', handleInputForm);
    state.inputNumero.addEventListener('keyup', handleInputNumberKeyUp);

    state.btnLimpar.addEventListener('click', handleBtnClearForm);

    state.btnSalvar.addEventListener('click', handleBtnSaveClick);

    console.log(state)

}

async function handleBtnSaveClick(event) {

    event.preventDefault();
    const errors = await checkForErrors();

    if (errors.length === 0) {
    listController.addCard(state.address);
    document.getElementById('modal-status').innerHTML = "Cadastro inserido com sucesso!"
    clearForm();
    } else {
        document.getElementById('modal-status').innerHTML = errors.join('<br>');
    }

}

async function checkForErrors() {

    const inputs = document.querySelectorAll('input');

    let errors = [];

    inputs.forEach(input => {

        if (input.value === '') {

            errors.push(`Campo ${input.name.toUpperCase()} deve ser preenchido!`);
            input.style.border = '3px solid red'

        } else {
            input.style.border = 'initial';
        }

    })

    return errors;

}

function handleInputNumberKeyUp(event) {

    state.address.numero = event.target.value;

}

async function handleInputCepChange(event) {

    const cep = event.target.value;

    const errorMsg = document.querySelector(`[data-error="cep"]`);

    if (cep.length > 7) {

        try {

            const endereco = await addressService.findByCep(cep);

            state.inputLogradouro.value = endereco.logradouro;
            state.inputCidade.value = endereco.cidade;
            state.inputBairro.value = endereco.bairro;

            state.address = endereco;

            errorMsg.style.display = 'none';

        } catch (error) {

            errorMsg.innerHTML = error;
            errorMsg.style.display = 'block';

        }

    } else {

        errorMsg.innerHTML = "CEP deve possuir 8 dígitos!"
        errorMsg.style.display = 'block';

    }

}

function handleInputForm(event) {

    const field = event.target.getAttribute('name');

    const errorMsg = document.querySelector(`[data-error="${field}"]`);

    const display = event.target.value === '' ? 'block' : 'none'

    errorMsg.style.display = display;

}

function handleBtnClearForm(event) {

    event.preventDefault();
    clearForm();

}

function clearForm() {

    const inputs = document.querySelectorAll('input');

    console.log(inputs)

    inputs.forEach(input => {

        input.value = '';
        input.style.border = 'initial';

    })

    state.address = new Address();

    inputs[0].focus();

    document.querySelector('[data-error="cep"]').style.display = 'none';
    document.querySelector('[data-error="numero"]').style.display = 'none';

}