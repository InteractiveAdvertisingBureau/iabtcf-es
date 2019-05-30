import {LinkModel} from './LinkModel';

const model: Map<string, Array<LinkModel>> = new Map();

const encoder:LinkModel = new LinkModel('Encode', 'Encode');
const decoder:LinkModel = new LinkModel('Decode', 'Decode');

model.set('TCString', [encoder, decoder]);

export {model as SectionModel};
