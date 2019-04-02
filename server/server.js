const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE);

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());

// Models
const { User } = require('./models/user');
const { Brand } = require('./models/brand');
const { Type } = require('./models/type');
const { Model } = require('./models/model');

// Middlewares
const { auth } = require('./middleware/auth');
const { admin } = require('./middleware/admin');

//===================
// Model
//===================

app.post('/api/product/shop', (req, res) => {
  let order = req.body.order ? req.body.orde: 'desc';
  let sortBy = req.body.sortBy ? req.body.sortBy: '_id';
  let limit = req.body.limit ? parseInt(req.body.limit): 100;
  let skip = parseInt(req.body.skip);
  let findArgs = {};

  for(let key in req.body.filters){
    if(req.body.filters[key].length > 0){
      if(key === 'price'){
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1]
        }
      } else {
        findArs[key] = req.body.filters[key]
      }
    }
  }

  Product.
  find(findArgs).
  populate('brand').
  populate('type').
  sort([[sortBy, order]]).
  skip(skip).
  limit(limit).
  exec((err, models) => {
    if(err) return res.status(400).send(err);
    res.status(200).json({
      size: models.length,
      models
    })
  })
})

app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");

    next();
});


app.get('/api/product/models', (req, res)=>{
  let order = req.query.order ? req.query.order : 'asc';
  let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
  let limit = req.query.limit ? parseInt(req.query.limit) : 100;

  Model.
  find().
  populate('brand').
  populate('type').
  sort([[sortBy, order]]).
  limit(limit).
  exec((err, models)=>{
    if(err) return res.status(400).send(err);
    res.send(models);
  })
})


app.get('/api/product/models_by_id', (req, res)=>{
  let type = req.query.type;
  let items = req.query.id;

  if(type === "array"){
    let ids = req.query.id.split(',');
    items = [];
    items = ids.map(item => {
      return mongoose.Types.ObjectId(item)
    })
  }

  Model.
  find({ '_id':{$in: items}}).
  populate('brand').
  populate('type').
  exec((err,docs)=>{
    return res.status(200).send(docs)
  })
});

app.post('/api/product/model', auth, admin, (req, res)=>{
  const model = new Model(req.body);

  model.save((err,doc)=>{
    if(err) return res.json({success: false, err});
    res.status(200).json({
      success: true,
      model: doc
    })
  })
})


//===================
// TYPE
//===================

app.post('/api/product/type', auth, admin, (req, res)=>{
  const type = new Type(req.body);

  type.save((err,doc)=>{
    if(err) return res.json({success: false, err});
    res.status(200).json({
      success: true,
      type: doc
    })
  })
});

app.get('/api/product/types', (req, res)=>{
  Type.find({}, (err,types)=>{
    if(err) return res.status(400).send(err);
    res.status(200).send(types)
  })
})

//===================
// BRAND
//===================

app.post('/api/product/brand', auth, admin, (req, res)=>{
  const brand = new Brand(req.body);

  brand.save((err,doc)=>{
    if(err) return res.json({success: false, err})
    res.status(200).json({
      success: true,
      brand: doc
    })
  })
})

app.get('/api/product/brands', (req, res)=>{
  Brand.find({}, (err, brands)=>{
    if(err) return res.status(400).send(err);
    res.status(200).send(brands)
  })
})


//===================
// USERS
//===================

app.get('/api/users/auth', auth, (req, res)=>{

  res.status(200).json({
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    cart: req.user.cart,
    history: req.user.history
  })
})

app.post('/api/users/register', (req, res)=>{
  const user = new User(req.body);

  user.save((err, doc) => {
    if(err) return res.json({success:false, err});
    res.status(200).json({
      success: true
    })
  })
});

app.post('/api/users/login', (req, res)=>{

  User.findOne({'email': req.body.email}, (err,user)=>{
    if(!user) return res.json({loginSuccess: false, message: 'Email not found'});

    user.comparePassword(req.body.password, (err, matched)=>{
      if(!matched) return res.json({loginSuccess: false, message: 'Wrong password'});

      user.generateToken((err,user) =>{
        if(err) return res.status(400).send(err);
        res.cookie('x_auth', user.token).status(200).json({
          loginSuccess: true
        })
      })
    })
  })
});

app.get('/api/users/logout', auth, (req, res)=>{
  User.findOneAndUpdate(
    { _id:req.user._id },
    { token: '' },
    (err,doc)=>{
      if(err) return res.json({success: false, err});
      return res.status(200).send({
        success: true
      })
    }
  )
});

const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`Server Running at ${port}`)
});
