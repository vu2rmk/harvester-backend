import express from 'express';
import productController from './api/controllers/product.controller';
import customerInfoController from './api/controllers/customerInfo.controller';


export const router = express.Router();

router.get('/products',productController.findAll);

router.get('/customerinfo',customerInfoController.getAllCustomerInfo);
router.get('/customerinfo/:id',customerInfoController.findOneCustomerInfo);
router.post('/customerinfo',customerInfoController.createCustomerInfo);
router.put('/customerinfo/:id',customerInfoController.updateCustomerInfo);
router.delete('/customerinfo/:id',customerInfoController.deleteCustomerInfo);
