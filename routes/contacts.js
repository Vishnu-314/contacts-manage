const express = require('express');
const Contact = require('../models/contacts');
const router = express.Router();

//api to add contact
router.post('/POST/v1/contacts',
    
    async (req, res) => {
       const {firstName,lastName,email,phone}=req.body;
       const missing=[];
        try {
            if(!firstName){
                return res.status(400).json({"error": "Missing required field(s): firstname"
            })
            }
            if(!lastName){
                return res.status(400).json({"error": "Missing required field(s): lastName"
            })
            }
            if(!email){
                return res.status(400).json({"error": "Missing required field(s): email"
            })
            }
            if(!phone){
                return res.status(400).json({"error": "Missing required field(s): phone"
            })
            }
            
            const newContact = new Contact({firstName,lastName,email,phone})
            const savedcontact=await newContact.save();
            res.status(201).json({
               savedcontact
            })
        }catch(err){
            res.status(500).send('internal error')
        }
})

//to view all contacts
router.get('/GET/v1/contacts',async(req,res)=>{
    try{
        const allContacts=await Contact.find();
        res.json(allContacts)
    }catch{
        res.status(500).send('internal error')
    }
})


//to get a particular contact
router.get('/GET/v1/contacts/:id',async(req,res)=>{
    try{
        const oneContact=await Contact.findById(req.params.id);
        if(!oneContact){
            return res.status(400).json({message: "There is no contact with that id"
        });
        }
        res.json(oneContact)
    }catch(err){
        res.status(500).send('internal error')
    }
})

//to delete
router.delete('/DELETE/v1/contacts/:id',async(req,res)=>{
    try{
        const deleteContact=await Contact.findByIdAndDelete(req.params.id);
        if(!deleteContact){
            return res.status(400).json({message: "There is no contact with that id"
        });
        }
        res.json({msg:'contact deleted successfully'})
    }catch(err){
        res.status(500).send('internal error')
    }
})

//to edit
router.put('/PUT/v1/contacts/:id',async(req,res)=>{
    try{
        const contactToEdit=await Contact.findById(req.params.id,req.body,{new:true});
        res.json(contactToEdit)
    }catch(err){
        res.status(500).send('internal error')
    }
})

//update partilly
router.patch('/PATCH/v1/contacts/:id',async(req,res)=>{
    try{
        const uContact=await Contact.findByIdAndUpdate(
            ree.params.id,
            {$set:req.body},
            {new:true}
        );
        if(!uContact){
            return res.status(400).json({message: "There is no contact with that id"})
        }
        res.json(uContact)
    }catch(err){
        res.status(500).send('internal error')
    }
})

module.exports=router;