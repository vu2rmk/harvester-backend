import express from 'express';
import passport from 'passport';
import productController from './api/controllers/product.controller';
import customerInfoController from './api/controllers/customerInfo.controller';
import { userRouter } from './api/user';


export const router = express.Router();

router.get('/products',productController.findAll);

// router.get('/customerinfo',customerInfoController.getAllCustomerInfo);
// router.get('/customerinfo/:id',customerInfoController.findOneCustomerInfo);
// router.post('/customerinfo',customerInfoController.createCustomerInfo);
// router.put('/customerinfo/:id',customerInfoController.updateCustomerInfo);
// router.delete('/customerinfo/:id',customerInfoController.deleteCustomerInfo);

router.route('/customerinfo')
.post(passport.authenticate('jwt', {session:false}), customerInfoController.createCustomerInfo)
.get(passport.authenticate('jwt', {session:false}),customerInfoController.getAllCustomerInfo);

router.route('/customerinfo/:id')
.get(passport.authenticate('jwt', {session:false}),customerInfoController.findOneCustomerInfo)
.put(passport.authenticate('jwt', {session:false}),customerInfoController.updateCustomerInfo)
.delete(passport.authenticate('jwt', {session:false}),customerInfoController.deleteCustomerInfo);

/// user related routes
router.use('/users',userRouter);

