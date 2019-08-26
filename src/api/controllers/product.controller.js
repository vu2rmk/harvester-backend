const products = [
  { _id: '1123', item: 'Am Prod', qty: 1, date: new Date() },
  { _id: '1124', item: 'Am Prod 1', qty: 2, date: new Date() },
  { _id: '1125', item: 'Am Prod 2', qty: 3, date: new Date() }
];

export default {

    findAll(req, res, next){

        return res.json(products);
    }
}