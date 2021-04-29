const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const name = process.argv[3]

const number = process.argv[4]

const url =
  `mongodb+srv://galx:${password}@cluster0.mvavr.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
  id: Number,
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: name,
  number: number
})


if (process.argv[3] && process.argv[4] !== undefined) {
  person.save().then(result => {
    console.log(`added ${name} number ${number} to the phonebook`)
    mongoose.connection.close()
  })
}

else if (process.argv[3] && process.argv[4] === undefined) {
  console.log('phonebook:')
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
}