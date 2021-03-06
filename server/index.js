require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const synapse = require("./client");
const client = synapse.client;


const app = express();
app.use(bodyParser.json());


app.use(express.static(__dirname + '/../react-client/dist'));


//get all users
app.get('/getallusers', (req, res) => {
    console.log(req.query);
    client
      .getAllUsers(req.query)
      .then(response => {
        res.send(response.data);
      })
      .catch(err => {
        console.log("GETALL USER ERROR", client);
        res.status(500).json("get all user error");
      });
  }

)

//get one user
app.post('/getuser', (req, res) => {
    const userID = req.body.userID;
    const fullDehydrate = true;
    console.log(userID, 'user ID')
    client
      .getUser(userID, fullDehydrate)
      .then(response => {
        console.log("GETONE SUCCESS", response)
        res.json(response);
      })
      .catch(err => {
        console.log("GETONE USER ERROR");
        res.status(500).json("get user error");
      });
  }

)

//add new user
app.post('/newuser', (req, res) => {
    console.log(req.body);
    const info = {
      logins: [
        {
          email: req.body.email
        }
      ],
      phone_numbers: [req.body.phoneNumber],
      legal_names: [req.body.name],
      documents: [
        {
            email: req.body.email,
            phone_number: req.body.phoneNumber,
            ip: '::1',
            name: req.body.name,
            alias: req.body.name,
            entity_type: 'M',
            entity_scope: 'Arts & Entertainment',
            day: 2,
            month: 5,
            year: 1989,
            address_street: '944 Market St.',
            address_city: 'SF',
            address_subdivision: 'CA',
            address_postal_code: '94102',
            address_country_code: 'US',
            virtual_docs: [
              {
                document_value: '2222',
                document_type: 'SSN'
              }
            ],
            physical_docs: [
              {
                document_value: 'data:image/gif;base64,SUQs==',
                document_type: 'GOVT_ID'
              }
            ],
            social_docs: [
              {
                document_value: 'https://www.facebook.com/valid',
                document_type: 'FACEBOOK'
              }
            ]
          }
      ],
      extra: {
        supp_id: "122eddfgbeafrfvbbb",
        cip_tag: 1,
        is_business: false
      }
    };
    client
      .createUser(info)
      .then(response => {
        res.json(response);
      })
      .catch(err => {
        console.log("Create User Error: ", err);
        res.status(500).json("create user error");
      });
  }

)


//create bank account

app.post('/createbank', (req, res) => {
  client
    .getUser(req.body._id)
      .then((user) => {
        user
          .createNode({
            type: 'DEPOSIT-US',
            info: {
              nickname: 'Test Checking',
              balance: {
                amount: 100000
              }
            }
          })
          .then(({ data }) => {
            res.send(data);
          })
          .catch(err => console.log("CREATEBANK ERROR", err));
      })
      .catch((err) => {
        console.log('getUser Error', err)
      }) 
})


//find all bank accounts 

app.post('/getBankAccounts', (req, res) => {
  client
    .getUser(req.body._id)
    .then((user) => {
      user
        .getAllUserNodes()
        .then(({ data }) => {
          res.send(data);
        })
        .catch(err => {
          console.log('error from get bank accounts', err)
        })
    })
    .catch(err => {
      console.log('error from getbank account getNode', err)
    })
})

//transfer amount 
app.post('/transferFunds', (req, res) => {
  console.log(req.body)
  client
    .getUser(req.body.userID)
      .then((user) => {
        user
          .createTransaction(req.body.fromID, {
            to: {
              type: 'ACH-US',
              id: req.body.toID
            },
            amount: {
              amount: req.body.amount,
              currency: 'USD'
            },
            extra: {
              ip: '127.0.0.1',
              note: 'Test transaction'
            }
          })
          .then(({ data }) => {
            res.send(data);
          })
          .catch((err) => {
            console.log('error from transfer funds', err)
          })
      })
      .catch((err) => {
        console.log('err from getuser transfer funds', err)
      })
})


let port = process.env.port || 8000;
  
app.listen(port, function() {
  console.log(`listening on port ${port}!`);
});
