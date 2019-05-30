"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LinkModel_1 = require("./LinkModel");
var model = new Map();
exports.SectionModel = model;
var encoder = new LinkModel_1.LinkModel('Encode', 'Encode');
var decoder = new LinkModel_1.LinkModel('Decode', 'Decode');
model.set('TCString', [encoder, decoder]);
