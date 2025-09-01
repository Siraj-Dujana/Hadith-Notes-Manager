const express=require("express")
const app=express()
const mongoose=require("mongoose")
const hadith=require("./model/schema.js");
const path = require("path");
var methodOverride = require('method-override')
app.use(methodOverride('_method'))

main()
.then(()=> console.log("Successfull connection"))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/hadithDB');
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}


let port=3000
app.listen(port,()=>{
    console.log(`Listening to ${port} port`)
})

app.use(express.urlencoded({extended:true}))
app.set(path.join(__dirname,'views'))
app.set('view engine','ejs')
app.use(express.static(path.join(__dirname,'public')))



let msg_hadith;

app.get('/hadith',async(req,res)=>{
    let read_hadith=await hadith.find()
    msg_hadith="All Hadiths"
    res.render('hadith.ejs',{read_hadith,msg_hadith})
})

app.post('/hadith',async(req,res)=>{
    let {hadith_text,source,topic}=req.body
    
    await hadith.insertOne({
        hadith_text:hadith_text,
        source:source,
        topic:topic
    })
    res.redirect('/hadith')
})

app.get('/hadith/:id',async(req,res)=>{
    let {id}=req.params
    let read_hadith=await hadith.findOne({_id:id})
    res.render("edit_hadith.ejs",{hadith:read_hadith})
})

app.put('/hadith/:id',async(req,res)=>{
    let {hadith_text,source,topic}=req.body
    let {id}=req.params
    await hadith.updateOne(
        {_id:id},
        {
        hadith_text:hadith_text,
        source:source,
        topic:topic
        }
    )
    res.redirect("/hadith")
})

app.delete('/hadith/:id',async(req,res)=>{
    let {id}=req.params
    await hadith.deleteOne(
        {_id:id},
    )
    res.redirect("/hadith")
})

app.post('/hadith/search', async(req,res)=>{
    let {topic}=req.body;
    console.log(topic)
   let data = await hadith.find({
    topic: { $regex: topic, $options: "i" }
});
    msg_hadith="Searched Hdith"
    res.render('hadith.ejs',{msg_hadith,read_hadith: data})

})


