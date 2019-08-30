import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import passport from 'passport';

import { configureJWTStratergy } from './passport-jwt';

export const setGlobalMiddleware = app => {

  app.use(express.json());
  app.use(express.urlencoded());
  app.use(cors());
  app.use(logger('dev'));

  app.use(passport.initialize());
  configureJWTStratergy();
  
};
