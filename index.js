const express=require('express');
const path=require('path');
const port=process.env.port || 3000;

const db=require('./config/mongoose');
const Contact=require('./models/contact');

const app=express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

//middleware1
// app.use(function(req, res, next) {
//     req.myName = 'Priyanshu';
//     //console.log('middleware1 called');
//     next();
// });

//middleware2

// app.use(function(req, res, next) {
//     console.log('my name from MW2',req.myName);
//     //console.log('middleware2 called');
//     next();
// });

// var contactList=[
//     {
//         name:"abc",
//         phone:"0000000000"
//     },
//     {
//         name:"def",
//         phone:"1111111111"
//     },
//     {
//         name:"ghi",
//         phone:"2222222222"
//     }
// ]


app.get('/',function(req, res){
    //console.log('from the route',req.myName);

    Contact.find({},function(err, contacts){
        if(err){
            console.log('Error in fetching contacts from db');
            return;
        }

        return res.render('home',{
            title:"Contacts List",
            contact_list:contacts
        });
    });

});

app.get('/practice',function(req,res){
    return res.render('practice',{
        title:"Let's play"
    });
});

app.post('/create-contact',function(req,res){
    // contactList.push({
    //     name:req.body.name,
    //     phone:req.body.phone
    // });
    //contactList.push(req.body);

    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    },function(err,newContact){
        if(err){console.log('error in creating a conatct');
        return;}

        console.log('**********',newContact);
        return res.redirect('back');
    });

});

//for deleting a contact
app.get('/delete-contact', function(req, res){
    //get the id from query in the url

    let id = req.query.id;

    //find the contact in the database using id and delete
    Contact.findByIdAndDelete(id,function(err){
        if(err){ 
            console.log('error in deleting an object from database');
            return;
        }
    return res.redirect('back');

    });

});

app.listen(port,function(err){
    if(err){ console.log('Error in running the server',err); }
    console.log('My express server in running on port',port);
});
