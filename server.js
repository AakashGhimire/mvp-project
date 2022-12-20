import express from "express";
import nodemon from "nodemon";
import postgres from "postgres";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = 3000;

//const sql = postgres({database:"dealership"});
const sql = postgres(process.env.DATABASE_URL);

app.use(express.json());
app.use(express.static("client"));

/************************************************** Get Customers **************************************************/
app.get("/api/customer", (req, res)=>{
    sql `select * from customer order by id`
    .then((result)=>{
        res.json(result);
    })
})

/************************************************** Get Employees **************************************************/
app.get("/api/employee", (req, res)=>{
    sql `select * from employee order by id`
    .then((result)=>{
        res.json(result);
    })
})

/************************************************** Get Vehicles **************************************************/
app.get("/api/vehicle", (req, res)=>{
    sql `select * from vehicle order by id`
    .then((result)=>{
        res.json(result);
    })
})

/************************************************** Get Sales **************************************************/
app.get("/api/sales", (req, res)=>{

    sql `select
        sales.id,
        concat(customer.firstName,' ', customer.lastName) as Customer_Name,
        concat(employee.firstName,' ', employee.lastName) as Employee_Name,
        vehicle.make, vehicle.model, vehicle.year, vehicle.price
        FROM customer 
        JOIN sales
        ON sales.customer_id = customer.id
        JOIN employee
        ON employee.id = sales.employee_id
        JOIN vehicle
        ON vehicle.id = sales.vehicle_id
        where vehicle.sold = 'true'
        order by sales.id
        `
    .then((result)=>{
        res.json(result);
    })
})

/************************************************** Add Customer **************************************************/
app.post("/api/customer", (req, res)=>{
    const {first_name, last_name, phone} = req.body;
    console.log("Request body is ",req.body);
    sql `INSERT INTO customer ${sql(req.body)} RETURNING *`
    //sql `INSERT INTO customer (firstname, lastname, phone) values (${first_name}, ${last_name}, ${phone}) RETURNING *`
    .then((results)=>{
        res.json(results[0]);
    // .catch((error)=>{
    //     console.log("Error ",error);
    //     res.json(error);
    })
})

/************************************************** Add Employee **************************************************/
app.post("/api/employee", (req, res)=>{
    sql `INSERT INTO employee ${sql(req.body)} RETURNING *`
    .then((results)=>{
        res.json(results[0]);
    });
});

/************************************************** Add Vehicle **************************************************/
app.post("/api/vehicle", (req, res)=>{
    sql `INSERT INTO vehicle ${sql(req.body)} RETURNING *`
    .then((results)=>{
        //console.log("From api ",req.body);
        res.json(results[0]);
    });
});

/************************************************** Purchase Vehicle - Update Sales table **************************************************/
app.post("/api/sales", (req, res)=>{
    const {employee_id, customer_id, vehicle_id} = req.body;
    console.log("Vehicle ID that is sold - ", vehicle_id);
    sql`UPDATE vehicle set sold = 'true' where id = ${vehicle_id}`
    .then((results)=>{
        //console.log("results of updating vehicle table ",results[0]);
    })

    sql `INSERT INTO sales ${sql(req.body)} RETURNING *`
    .then((results)=>{
        res.json(results[0]);
    });

    // app.get("/api/sales", (req, res)=>{
    //     sql `select * from sales`
    //     .then((result)=>{
    //         res.json(result);
    //     })
    // })
    
});

/************************************************** Update Customer's Info **************************************************/
app.patch("/api/customer/:id", (req, res)=>{
    const id = req.params.id;
    const {first_name, last_name, phone} = req.body;
    sql `
        Update customer 
        set
        firstname = COALESCE(${first_name || null}, firstname),
        lastname = COALESCE(${last_name || null}, lastname),
        phone = COALESCE(${phone || null}, phone)
        WHERE id = ${id} RETURNING *
        `
    .then((results)=>{
        res.json(results[0]);
    });
})

/************************************************** Update Employee's Info **************************************************/
app.patch("/api/employee/:id", (req, res)=>{
    const id = req.params.id;
    const {first_name, last_name, phone} = req.body;
    sql `
        Update employee 
        set
        firstname = COALESCE(${first_name || null}, firstname),
        lastname = COALESCE(${last_name || null}, lastname),
        phone = COALESCE(${phone || null}, phone)
        WHERE id = ${id} RETURNING *
        `
    .then((results)=>{
        res.json(results[0]);
    });
})

/************************************************** Update Vehicles's Info **************************************************/
app.patch("/api/vehicle/:id", (req, res)=>{
    const id = req.params.id;
    const {make, model, year} = req.body;
    sql `
        Update vehicle 
        set
        make = COALESCE(${make || null}, make),
        model = COALESCE(${model || null}, model),
        year = COALESCE(${year || null}, year)
        WHERE id = ${id} RETURNING *
        `
    .then((results)=>{
        res.json(results[0]);
    });
})

/************************************************** Update Sales Info **************************************************/
app.patch("/api/sales/:id", (req, res)=>{
    const id = req.params.id;
    const {employee_id, customer_id, vehicle_id, price} = req.body;
    sql`
        Update sales
        set
        employee_id = COALESCE(${employee_id || null}, employee_id),
        customer_id = COALESCE(${customer_id || null}, customer_id),
        vehicle_id = COALESCE(${vehicle_id || null}, vehicle_id),
        price = COALESCE(${price}, price)
        where id = ${id} returning *
        `
    .then((results)=>{
        res.json(results[0]);
    });
})

/************************************************** Delete Customer's Info **************************************************/
app.delete("/api/customer/:id", (req, res)=>{
    const id = req.params.id;
    sql `DELETE FROM customer WHERE id = ${id} RETURNING *`
    .then((results)=>{
        res.json(results[0]);
    });
})

/************************************************** Delete Vehicles's Info **************************************************/

app.listen(port);