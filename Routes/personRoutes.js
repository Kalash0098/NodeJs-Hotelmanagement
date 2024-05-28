const express = require('express');
const router = express.Router();
const Person = require('./../models/Persons');
const  {jwtAuthMiddleware, generateToken} = require('./../jwt');

//Create
router.post('/signup',async(req,res) => {
    try{
        const data = req.body
        const newPerson = new Person(data);

        const response = await newPerson.save();
        console.log('data saved');
        
        const payload = {
            id: response.id,
            username: response.username
        }
        console.log(JSON.stringify(payload));
        const token = generateToken(payload);
        console.log("Token is :", token);

        res.status(200).json({response: response, token: token});
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
  
});
//create a log in method or 
//method were if token expires to create a new token 
//beacause user can sign up everytime he wants to sign in.
router.post('/login', async(req, res) => {

    try{

        //extract username and password from req body or frontend
        const{username, password} = req.body;

        //check extracted username and pasword exist
        const user = await Person.findOne({username : username});

        //if user does not exist or pass does not match, return error
        if( !user || !(await user.comparePassword(password))){
            return res.status(401).json({error: 'Invalid username or password'});
        }

        //generate tokens
        const payload = {
            id : user.id,
            username: user.username
        }
        const token = generateToken(payload);

        //return toen as response
        res.json({token });
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
})
//Read all person in database
router.get('/',jwtAuthMiddleware,async(req,res) => {
    try{
        const data =await Person.find();
        console.log('data fetched');
        res.status(200).json(data)
    }catch{
      console.log(err);
      res.status(500).json({error: 'Internal server error'});
    }
  })
//Read with types
  router.get('/:workType',async (req,res) => {
    try{
       const workType = req.params.workType;
       if(workType == 'chef' ||workType== 'manager' ||workType == 'waiter' ){
           const response  =await Person.find({work: workType});
           console.log('response fetched');
           res.status(200).json(response);
       }else{
           res.status(404).json({error:"Invalid work type"});
       }
    }catch(err){
     console.log(err);
     res.status(500).json({error: 'Internal server error'});
    } 
   })
//Update
router.put('/:id',async(req,res) => {
    try{
        const personId= req.params.id;
        const updatedPersonData = req.body;
        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true,
            runValidators: true
        })
        if(!response){
            return res.status(404).json({error:'Person not found'});
        }
        console.log('data updated');
        res.status(200).json(response);
    }catch{
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
})
//delete
router.delete('/:id',async (req,res)=>{
    try{
        const personId= req.params.id;
        const response = await Person.findByIdAndDelete(personId);
        if(!response){
            return res.status(404).json({error:'Person not found'});
        }
        console.log('data deleted');
        res.status(200).json({message: 'Person deleted successfully'});
        
    }
    catch{
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
})
module.exports = router;