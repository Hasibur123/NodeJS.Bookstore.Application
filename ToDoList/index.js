// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');

// // Create Express app
// const app = express();

// // MongoDB connection
// mongoose.connect('mongodb://localhost:27017/todolist', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });
// const db = mongoose.connection;

// // Check MongoDB connection
// db.once('open', () => {
//     console.log('Connected to MongoDB');
// });

// // Check for MongoDB connection errors
// db.on('error', (err) => {
//     console.error('MongoDB connection error:', err);
// });

// // Define a schema for the data
// const todoSchema = new mongoose.Schema({
//     title: String,
//     description: String,
// });

// // Create a model based on the schema
// const Todo = mongoose.model('Todo', todoSchema);

// // Middleware to parse JSON requests
// app.use(bodyParser.json());

// // Create a new todo item
// app.post('/todos', (req, res) => {
//     const { title, description } = req.body;
//     const todo = new Todo({
//         title,
//         description,
//     });
//     todo.save((err) => {
//         if (err) {
//             console.error('Error creating todo:', err);
//             res.status(500).json({ error: 'Failed to create todo' });
//         } else {
//             res.status(201).json({ message: 'Todo created successfully' });
//         }
//     });
// });

// // Get all todo items
// app.get('/todos', (req, res) => {
//     Todo.find({}, (err, todos) => {
//         if (err) {
//             console.error('Error retrieving todos:', err);
//             res.status(500).json({ error: 'Failed to retrieve todos' });
//         } else {
//             res.json(todos);
//         }
//     });
// });

// // Get a single todo item by ID
// app.get('/todos/:id', (req, res) => {
//     const todoId = req.params.id;
//     Todo.findById(todoId, (err, todo) => {
//         if (err) {
//             console.error('Error retrieving todo:', err);
//             res.status(500).json({ error: 'Failed to retrieve todo' });
//         } else if (!todo) {
//             res.status(404).json({ error: 'Todo not found' });
//         } else {
//             res.json(todo);
//         }
//     });
// });

// // Update a todo item by ID
// app.put('/todos/:id', (req, res) => {
//     const todoId = req.params.id;
//     const { title, description } = req.body;
//     Todo.findByIdAndUpdate(
//         todoId,
//         { title, description },
//         { new: true },
//         (err, todo) => {
//             if (err) {
//                 console.error('Error updating todo:', err);
//                 res.status(500).json({ error: 'Failed to update todo' });
//             } else if (!todo) {
//                 res.status(404).json({ error: 'Todo not found' });
//             } else {
//                 res.json({ message: 'Todo updated successfully' });
//             }
//         }
//     );
// });

// // Delete a todo item by ID
// app.delete('/todos/:id', (req, res) => {
//     const todoId = req.params.id;
//     Todo.findByIdAndRemove(todoId, (err, todo) => {
//         if (err) {
//             console.error('Error deleting todo:', err);
//             res.status(500).json({ error: 'Failed to delete todo' });
//         } else if (!todo) {
//             res.status(404).json({ error: 'Todo not found' });
//         } else {
//             res.json({ message: 'Todo deleted successfully' });
//         }
//     });
// });

// // Start the server
// const port = 3000;
// app.listen(port, () => {
//     console.log(`Server is listening on port ${port}`);
// });


const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Create Express app
const app = express();

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/mydatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;

// Check MongoDB connection
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Check for MongoDB connection errors
db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

// Define a schema for the data
const todoSchema = new mongoose.Schema({
    title: String,
    description: String,
});

// Create a model based on the schema
const Todo = mongoose.model('Todo', todoSchema);

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Create a new todo item
app.post('/todos', async (req, res) => {
    try {
        const { title, description } = req.body;
        const todo = new Todo({
            title,
            description,
        });
        await todo.save();
        res.status(201).json({ message: 'Todo created successfully' });
    } catch (err) {
        console.error('Error creating todo:', err);
        res.status(500).json({ error: 'Failed to create todo' });
    }
});

// Get all todo items
app.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.find({});
        res.json(todos);
    } catch (err) {
        console.error('Error retrieving todos:', err);
        res.status(500).json({ error: 'Failed to retrieve todos' });
    }
});

// Get a single todo item by ID
app.get('/todos/:id', async (req, res) => {
    try {
        const todoId = req.params.id;
        const todo = await Todo.findById(todoId);
        if (!todo) {
            res.status(404).json({ error: 'Todo not found' });
        } else {
            res.json(todo);
        }
    } catch (err) {
        console.error('Error retrieving todo:', err);
        res.status(500).json({ error: 'Failed to retrieve todo' });
    }
});

// Update a todo item by ID
app.put('/todos/:id', async (req, res) => {
    try {
        const todoId = req.params.id;
        const { title, description } = req.body;
        const updatedTodo = await Todo.findByIdAndUpdate(
            todoId,
            { title, description },
            { new: true }
        );
        if (!updatedTodo) {
            res.status(404).json({ error: 'Todo not found' });
        } else {
            res.json({ message: 'Todo updated successfully' });
        }
    } catch (err) {
        console.error('Error updating todo:', err);
        res.status(500).json({ error: 'Failed to update todo' });
    }
});

// Delete a todo item by ID
app.delete('/todos/:id', async (req, res) => {
    try {
        const todoId = req.params.id;
        const deletedTodo = await Todo.findByIdAndRemove(todoId);
        if (!deletedTodo) {
            res.status(404).json({ error: 'Todo not found' });
        } else {
            res.json({ message: 'Todo deleted successfully' });
        }
    } catch (err) {
        console.error('Error deleting todo:', err);
        res.status(500).json({ error: 'Failed to delete todo' });
    }
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
