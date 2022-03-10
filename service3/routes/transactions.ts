import { Router } from 'express';
import { AnyError, Db, Document } from 'mongodb';
import conn from './../db/conn'

export const route: Router = Router();

const Collection = "transactions" as string;

let store: Transaction [] = [];

route.get('/', (_req, _res) => {
    _res.status(200).send(store);
});

route.post('/', (_req, _res) => {
    let db = conn.getDb() as Db;
    console.log(_req.body);
    
    let data: Transaction = {
        id: _req.body.id,
        amount: _req.body.amount,
        category: _req.body.category,
        date: _req.body.date
    }

    store.push(data);
    db.collection(Collection)
    .insertOne(data, (err, result) => {
        if(!err) return _res.status(201).send(result);
        return _res.status(500).send(err);
    });

});

route.put('/:id', (_req, _res) => {
    _res.send(`Updating Transactions ${_req.params.id}`);
});

route.delete('/:id', (_req, _res) => {
    _res.send(`Deleting Transaction ${_req.params.id}`);
});




interface Transaction {
    id: Number,
    amount: Number,
    category: String,
    date: Date
}