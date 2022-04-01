const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const { reset } = require('nodemon');
require('dotenv').config();
var mysql = require('mysql');
const { read } = require('fs');
const app = express();
const port = 3000;


app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"",
    database:'groceries'
  });
  con.connect(function(err) {
    if (err) throw err;
    console.log("MySql db Connected!");

    //To fetch all merchants
    app.get('/fetch-merchants/:service', function (req,res,next){
        var{service}=req.params;
        var sql=`SELECT * FROM merchants WHERE service = ?`;
        con.query(sql,[service],function (err,data){
            if(err) {
                console.log(err)
                return;
              };
              if (data.length > 0) {
                res.send({status:200, message:'success',data});    
              } else {    
                res.send({status:404, message:'failed'});
              }
            });
      });
      //to fetch all reviews in db
     app.get('/fetch-reviews', function (req,res,next){//to get all reviews in db
        var{name}=req.body;
        var sql=`SELECT * FROM reviews`;
        con.query(sql,[name],function (err,data){
            if(err) {
                console.log(err)
                return;
              };
              if (data.length > 0) {
                res.send({status:200, message:'success',data});    
              } else {    
                res.send({status:404, message:'failed'});
              }
            });
        
      });
      //to fetch  all workinghours in db
      app.get('/fetch-workinghours/:store_id', function (req,res,next){
        var{store_id}=req.params;
        var sql=`SELECT * FROM workinghours WHERE  store_id= ?`;
        con.query(sql,[store_id],function (err,data){
          if(err) {
              console.log(err)
              return;
            };
            if (data.length > 0) {
              res.send({status:200, message:'success',data});    
            } else {    
              res.send({status:404, message:'failed'});
            }
          });
      }); 

      // to fetch products where the store name is passed as the parameter 
      app.get('/fetch-products/:store', function (req,res,next){
        var{store}=req.params;
        var sql=`SELECT * FROM merchants_menu WHERE store = ?`;
        con.query(sql,[store],function (err,data){
            if(err) {
                console.log(err)
                return;
              };
              if (data.length > 0) {
                res.send({status:200, message:'success',data});    
              } else {    
                res.send({status:404, message:'failed'});
              }
            });
          })
      });
    
     //to fetch store  through store_category such as eatgreen
      app.get('/fetch-store_category/:store', function (req,res,next){//to get all orders in db
        
        var{store}=req.params;
        var sql=`SELECT * FROM store_category WHERE store= ?`;
        con.query(sql,[store],function (err,data){
            if(err) {
                console.log(err)
                return;
              };
              if (data.length > 0) {
                res.send({status:200, message:'success', data});    
              } else {    
                res.send({status:404, message:'failed'});
              }
            });
          });

          app.post('/insert-orders', (req, res) => {
            let object=req.body;
             con.query("insert into orders set ?",[(object)],(error,data)=>{
              if(error){
               console.log(error);
                 res.status(404).send({message:'error'})
                 return;
               }
               res.status(200).send({message:'success'})
             
             });
            
             });

         
             app.get('/fetch-ads/:placement_category', function (req,res,next){//to get all orders in db
              var{placement_category}=req.params;
              var sql=`SELECT * FROM ads WHERE placement_category=?`;
              con.query(sql,[placement_category],function (err,data){
                if(err) {
                  console.log(err)
                  return;
                };
                if (data.length > 0) {
                  res.send({status:200, message:'success', data});    
                } else {    
                  res.send({status:404, message:'failed'});
                }
              });
            }); 
            
//To get the wallet for the certain user
app.get('/getwallet/:username', function (req,res,next){//username is unique 
  var{username}=req.params;

  con.query(`SELECT * FROM wallet WHERE username = ?`,[username],function (err, data){
  if(err) {
    console.log(err)
    return;
  };
  if (data.length > 0) {
    res.send({status:200, message:'success',data});    
  } else {    
    res.send({status:404, message:'failed'});
  }
  });
});

app.listen(port, () => console.log(`Hello safi app listening on port ${port}!`));