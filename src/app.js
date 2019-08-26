import 'dotenv/config';
import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import mysql from 'mysql';

import {router} from './router';
import con from './api/config/dbconnection';


const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use(logger('dev'));

app.use('/api',router);

app.get('/', (req, res) => {
    return res.json({
        msg: 'Welcome to harvester backend'
    });
});


// con.connect(function(err) {
//     if (err) throw err;
//     con.query("SELECT * FROM mock_data", function (err, result, fields) {
//       if (err) throw err;
//       console.log(result);
//     });
//   });


// con.query("SELECT * FROM mock_data", function (err, result) {
//           if (err) throw err;
//           console.log(result);
//         });
// console.log('Example node program');

// console.log(`Port: ${process.env.PORT}`);

app.listen(process.env.PORT, () => {
    console.log(`Server is running at PORT ${process.env.PORT}`);
});