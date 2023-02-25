const { request } = require('express')
const express = require('express')
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()
const app = express()
let PORT = process.env.PORT || 2000

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'To-Do-List'

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
        const lebron = db.collection('list-items')


        app.get('/', (req,res) => {
            const cursor = db.collection('list-items').find().toArray()
            .then(results => {
                console.log(results)
                res.render('index.ejs', {list: results})
            })
            .catch(err => console.error(err))
        })

        app.post('/list', (req,res) => {
            console.log(req.body)
            console.log('LEEEEETTTTTSSSSS FFFFUUUUUCCCCKKKKING GOOOOOO')
            db.collection('list-items').insertOne({taskItem: req.body.task, dueDate: req.body.date})
                    .then(result => {
                        console.log(result)
                        res.redirect('/')
                    })
                    .catch(err => console.error(err))
        })

        app.put('/editSave', (req,res) => {
            console.log(req.body)
            db.collection('list-items').updateOne({taskItem: req.body.taskLists, dueDate: req.body.dueDateS}, {
                $set: {
                    taskItem: req.body.update
                }
            }, {
                sort: {_id: -1},
                upsert: false
            })
            .then(result => {
                console.log('updated task')
                res.json('task changed')
            })
            .catch(error => console.error(error))
        })

        app.delete('/deleteEdit', (req, res) => {
            db.collection('list-items').deleteOne({taskItem: req.body.taskLists})
            .then(result => {
                console.log('Task Deleted')
                res.json('Task Deleted')
            })
            .catch(error => console.error(error))
        
        })
    })

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})
