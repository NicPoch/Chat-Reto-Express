var express = require('express');
var router = express.Router();
const MessageValidator=require("../validators/messageValidators");
const Message = require("../models/Message");
const { clients } = require('../lib/wslib');

const validator= new MessageValidator();

/* GET users listing. */
router.get('/', (req, res)=>{
  Message.findAll().then((ans)=>{
    res.status(200).send(ans);
  });
});
/**
 * GET by timestamp
 */
 router.get('/:ts', (req, res)=> {
   Message.findByPk(req.params.ts).then((ans)=>{
     (ans) ? res.status(200).send(ans) : res.status(400).send("Such message doesn´t exist.");
   });
 });
/**
 * POST
 */
router.post('/',(req,res)=>{
  const body = req.body;
  body.ts=Date.parse(body.ts);
  const {error} = validator.createValidator(body);
  if(error)
  {
    return res.status(400).send(error.details[0]);
  }
  Message.create({message:body.message,author:body.author,ts:body.ts}).then((ans)=>{
    res.send(ans);
    broadcast();
  });
});
/**
 * PUT
 */
router.put("/:ts",(req,res)=>{
  const body = req.body;
  const {error} =  validator.updateValidator(body);
  if(error)
  {
    return res.status(400).send(error.details[0]);
  }
  
  Message.update(body,{where:{ts:req.params.ts}}).then((ans)=>{
    if(ans[0]===0) return res.status(400).send("Error");
    res.sendStatus(200);
    broadcast();
   });
});
/**
 * DELETE
 */
router.delete("/:ts",(req,res)=>{
  Message.destroy({where:{ts:req.params.ts}}).then((ans)=>{
    if(ans===0) return res.status(400).send("Such message doesn´t exist");
    res.sendStatus(200);
    broadcast();
  });
});
/**
 * Broadcast
 */
const broadcast =()=>{
  clients.forEach((client) => {
    Message.findAll().then((messages)=>{
      client.send(JSON.stringify(messages));
    });
  });
};
module.exports = router;