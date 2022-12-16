import * as requestService from './request-service.js';
import Address from '../models/address.js';

export async function findByCep(cep) {

    const url = `https://viacep.com.br/ws/${cep}/json/`;
    const result = await requestService.getJson(url);

    const address = new Address(result.cep, result.logradouro, result.complemento, result.localidade, result.bairro, result.uf);
    return address;

}