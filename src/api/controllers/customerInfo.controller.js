import connection from '../config/dbconnection';
import customerInfoModel from '../models/customerInfo.model';

export default {

    getAllCustomerInfo(req, res, next){

        connection.query("Select * from customerinfo", (err, results) => {

            if (err){
                console.log("error: ", err);
                return res.json({error: "this is an error."});
            }

            res.json(results);
        });   
    },

    createCustomerInfo(req, res){
        // const {custcode, custname, address1, address2, phone, mobile, email} = req.body;
        const customerInfo = req.body;

        connection.query('Insert into customerinfo set ?', customerInfo, (err, results) => {

            if (err){
                console.log("error: ", err);
                return res.json({error: "this is an error in insert."});
            }

            return res.json(results);
        });

    },

    findOneCustomerInfo(req, res){
        const {id} = req.params;

        connection.query('Select * from customerinfo where id = ?', id, (err, result) => {

            if (err){
                console.log("error: ", err);
                return res.json({error: "this is an error in Find one."});
            }

            return res.json(result);
        });
    },

    updateCustomerInfo(req, res){

        const {id} = req.params;
        const customerInfo = req.body;

        customerInfo.id = id;

        connection.query('Update customerinfo set custcode = ? , custname = ? , address1 = ? , address2 = ? , phone = ? , mobile = ?, email = ? where id = ?',
        [customerInfo.custcode, customerInfo.custname, customerInfo.address1, customerInfo.address2, customerInfo.phone, customerInfo.mobile, customerInfo.email, id],
        (err, result) => {
            if (err){
                console.log("error: ", err);
                return res.json({error: "this is an error in Update."});
            }

            return res.json(result);
        });
    },

    deleteCustomerInfo(req, res){
        
        const {id} = req.params;

        connection.query('Delete from customerinfo where id = ?', id, (err, result) => {

            if (err){
                console.log("error: ", err);
                return res.json({error: "this is an error in Delete."});
            }

            return res.json(result);
        })

    }
}