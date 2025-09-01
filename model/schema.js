const mongoose = require("mongoose");

const hadithSchema = new mongoose.Schema({
  hadith_text: { type: String, required: true },
  source: { type: String, required: true },
  topic: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Hadith", hadithSchema);


// This Code is Just to Insert the demo data in the Database

// const hadith = mongoose.model("Hadith", hadithSchema);

// main()
// .then(()=> console.log("Successfull connection"))
// .catch(err => console.log(err));

// async function main() {
//   await mongoose.connect('mongodb://127.0.0.1:27017/hadithDB');
//   // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
// }


// const demoHadiths = [
//   {
//     hadith_text: "Actions are judged by intentions, and every person will get what he intended.",
//     source: "Sahih Bukhari",
//     topic: "Intentions",
//   },
//   {
//     hadith_text: "The best among you are those who have the best manners and character.",
//     source: "Sahih Bukhari",
//     topic: "Character",
//   },
//   {
//     hadith_text: "A strong person is not the one who can wrestle, but the one who controls himself when angry.",
//     source: "Sahih Muslim",
//     topic: "Anger",
//   },
// ];

// hadith.insertMany(demoHadiths)