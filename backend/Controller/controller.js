// create controller-implement CRUP-functionality

const express = require("express");
const router = express.Router();
const db = require("../Database/db");
const bodyParser = require("body-parser");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended:true
}))

//get
/*router.get("/tasks",(req,res)=>{
    const sql = `select * from "ToDoListSchema"."Tasks"`;
    db.query(sql,(err,result)=>{
        if(err) throw res.json(err);
        return res.status(200).json(result.rows);
        console.log("todo list is working");
    })
})*/

router.get("/tasks", async (req, res) => {
    console.log('GET /tasks called');
    try {
        const sql = `SELECT * FROM "ToDoListSchema"."Tasks"`;
        const result = await db.query(sql);
        console.log('Query successful, rows:', result.rows.length);
        return res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error in GET /tasks:', err.message);
        console.error('Full error:', err);
        return res.status(500).json({ error: err.message });
    }
});

//getById

router.get("/tasks/:id", (req, res) => {
    const sql = `SELECT * FROM "ToDoListSchema"."Tasks" WHERE task_id = $1`;
    
    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.rows.length === 0) return res.status(404).json({ message: "Task not found" });
        return res.status(200).json(result.rows[0]);
    });
});

//post

router.post("/tasks", (req, res) => {
    const { title, description, status, priority, due_date } = req.body;
    
    const completedAt = status === 'Completed' ? new Date() : null;
    
    const sql = `
        INSERT INTO "ToDoListSchema"."Tasks" 
        (title, description, status, priority, due_date, created_at, updated_at, completed_at) 
        VALUES ($1, $2, $3, $4, $5, NOW(), NOW(), $6) 
        RETURNING *
    `;
    
    db.query(sql, [title, description, status, priority, due_date, completedAt], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err.message });
        }
        
        return res.status(200).json(result.rows[0]);
    });
});

router.put("/tasks/:id", (req, res) => {
    const task_id = Number(req.params.id);
    const { title, description, status, priority, due_date } = req.body;
    
    console.log('Updating task:', task_id, 'with status:', status);
    
    const completedAt = status === 'Completed' ? new Date() : null;
    
    const sql = `
        UPDATE "ToDoListSchema"."Tasks" 
        SET title=$1, description=$2, status=$3, priority=$4, due_date=$5, updated_at=NOW(), completed_at=$7
        WHERE task_id=$6
        RETURNING *
    `;
    
    db.query(sql, [title, description, status, priority, due_date, task_id, completedAt], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: err.message });
        }
        
        if (result.rows.length === 0) {
            return res.status(404).json({ message: `Task with ID ${task_id} not found` });
        }
        
        const task = result.rows[0];
        console.log('Task updated, completed_at:', task.completed_at);
        
        return res.status(200).json(task);
    });
});
router.delete("/tasks/:id", (req, res) => {
    const task_id = Number(req.params.id);
    
    const sql = `DELETE FROM "ToDoListSchema"."Tasks" WHERE task_id=$1`;
    
    db.query(sql, [task_id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err.message });
        }
        
        if (result.rowCount === 0) {
            return res.status(404).json({ message: `Task with ID ${task_id} not found` });
        }
        
        return res.status(200).json({ 
            message: `Task deleted successfully`,
            task_id: task_id 
        });
    });
});
module.exports=router;