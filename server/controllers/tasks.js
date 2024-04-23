const PEOPLE = require('../models/person');
require("dotenv").config();

// Get function for all people
const readPeople = async(req,res) => {
    try {
        console.log(PEOPLE)
        await PEOPLE.find({}).then((x) => {res.json({x});});
    } catch (error) {
        console.log(error);
    }
}


// Post function for creating people
const createPeople = async(req,res) => {
    try {
        userId = await PEOPLE.find({});
        const { name } = req.body; 
        // const { age } =req.body;
        // const { email } = req.body;
        const { password } = req.body;
        console.log(password)
        await PEOPLE.create({name: name, password: password, id: userId.length+1});
        let answer = await PEOPLE.find({})
        res.json(answer);
     } catch (error) {
         console.log(error);
     }
}

module.exports = {createPeople, readPeople}