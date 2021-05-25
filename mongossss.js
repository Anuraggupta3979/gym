const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/anurag', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
//db.once('open', function() {
//console.log("this is anurag")
// });

const kittySchema = new mongoose.Schema({
  name: String
});
kittySchema.methods.speak = function () {
  const greeting = this.name
    ? "Meow name is " + this.name
    : "I don't have a name";
  console.log(greeting);
}
const Kitten = mongoose.model('anurag23', kittySchema);
const anuragkitty = new Kitten({ name: 'anuragkitty gupta' });
const anuragkitty2 = new Kitten({ name: 'anuragkitty2 gupta' });
// console.log(anuragkitty.name); 
// anuragkitty.speak()
anuragkitty.save(function (err, anuragkitty) {
  if (err) return console.error(err);
  anuragkitty.speak();
});
anuragkitty2.save(function (err, k) {
  if (err) return console.error(err);
  k.speak();
});
Kitten.find({name:"anuragkitty gupta"},function (err, kittens) {
  if (err) return console.error(err);
  console.log(kittens);
})