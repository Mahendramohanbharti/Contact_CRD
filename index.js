const { urlencoded } = require('express');
const express=require('express')
const path=require('path');

const port =8000;

const db=require('./config/mongoose')
const Contact=require('./models/contact')

const app=express()

app.set('view engine','ejs');

app.set('views',path.join(__dirname,'views'));

app.use(express.urlencoded());

app.use(express.static('assest'));

//middleware 1

// app.use(function(req,res,next){
//     req.myname="Mahendra"
//     next();
// });

//middleware 2

// app.use(function(req,res,next){
//     console.log("my name from mw2",req.myname)
//     next();
// })

contactlist=[
    {
        name:"Mahendra",
        phone:"323242412"
    },
    {
        name:"Mohan",
        phone:"328328743"

    },
    {
        name:"Bharti",
        phone:"873281973"
    }
]

app.get('/',function(req,res){

    Contact.find({},function(err,contacts){
        if(err){
            console.log('Error in fetching the data from db');
            return;
        }
        return res.render('home',{
            title:"Contact List",
            contact_list:contacts
        });

    })
    
    
})



app.get('/play',function(req,res){
    return res.render('play',{
        title: "Let's Play with Ejs"
    })
})

app.post('/create-contact',function(req,res){
    // contactlist.push({
    //     name:req.body.name,
    //     phone:req.body.phone
    // })

    // contactlist.push(req.body)

    Contact.create({
        name:req.body.name,
        phone:req.body.phone
    },function(err,newContact){
        if (err){console.log('SomeThing wrong in Creating Contact');
    return;}

        console.log('******',newContact);
        return res.redirect('back')
    })

    
})


// deleting the contact
app.get('/delete-contact',function(req,res){
    
    let id =req.query.id;

    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log('Error in deleting the contact');
        }

        return res.redirect('back')

    })

    // let contactIndex=contactlist.findIndex(contact => contact.phone==phone);

    // if(contactIndex!=-1){
    //     contactlist.splice(contactIndex,1);
    // }
    
    // return res.redirect('back')
})

app.listen(port,function(err){
    if(err){console.log('Error running on the port',err);
    }

    console.log('Yup!!  Server running on port: ',port);
})