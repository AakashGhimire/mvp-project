const customer_div = document.getElementById("customer-div-id");
const displayCustomer = document.getElementById(`displayCustomer`);
const addCustomer_div = document.getElementById("addCustomer_div");

const displayEmployee = document.getElementById("displayEmployee");
const employee_div = document.getElementById("employee-div-id");
const addEmployee_div = document.getElementById("addEmployee_div");

const displayVehicle = document.getElementById("displayVehicle");
const vehicle_div = document.getElementById("vehicle-div-id");
const addVehicle_div = document.getElementById("addVehicle_div");

const displaySales = document.getElementById("displaySales");
const sales_div = document.getElementById("sales-div-id");

const displayPurchase = document.getElementById("displayPurchaseVehicle");
const purchase_div = document.getElementById("purchaseVehicle-div-id");
const purchase_inner_div = document.getElementById("purchase_div");

/************************************************************ Customer Button Functionality ************************************************************/
var customer_toggled = false;
displayCustomer.addEventListener("click", ()=>{ //Click on Customer button
    if(!customer_toggled){ //runs when toggle is false for the first time
        customer_toggled = true;
        let submit = false;
        customerData(submit);
    }   
    else if(customer_toggled){ //runs when toggle = true, and will toggle off the customer table
        customer_toggled = false;
        const table = document.getElementById("customer_table"); 
        customer_div.append(table);
        addCustomer_div.innerHTML= " ";
        table.innerHTML = " ";
    }
});

//this function creates table header and table rows dynamically when Customer button is clicked
function customerData(submit){
    const table = document.getElementById("customer_table"); 
    customer_div.append(table);
    fetch("/api/customer")
    .then((res)=>res.json())
    .then((data)=>{
        console.log(data);
        table.innerHTML = ` 
            <thead>
                <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Phone</th>
                </tr>
            </thead>
        `;
        //for each element of returned api, it will create table data(rows)
        for (let key in data){
            let id = data[key]["id"];
            let firstName = data[key]["firstname"];
            let lastName = data[key]["lastname"];
            let phone = data[key]["phone"];
            table.innerHTML +=`
                <tbody id = "customerTB" class="customerTB">
                    <tr>
                        <td>${id}</td>
                        <td>${firstName}</td>
                        <td>${lastName}</td>
                        <td>${phone}</td>
                        <td><button id = "deleteBtnId" class = "deleteBtn">Delete</td>
                    </tr> 
                </tbody>
            `
        }
       /************************* Add Customer Button *************************/
       //this function displays customer entry form when Add Customer button is clicked
       function addCustomer(){
        const addCustomerbtn = document.createElement("button");
        addCustomer_div.append(addCustomerbtn)
        addCustomerbtn.innerHTML = "Add Customer";
        addCustomerbtn.addEventListener("click",(event)=>{ //Click on Add Customer button
            //console.log("Add Customer button is clicked");
            const customer_form = document.getElementById("addCustomerForm");
            if(customer_form.hidden === true){
                customer_form.hidden = false;
            } else{
                customer_form.hidden = true;
            }
        });
       }
       //addCustomer function only displays the entry form if submit is false
       if (submit === false){
        //console.log("value of submit",submit);
        addCustomer();
       }
    });
}

 /************************* Submit Customer Info *************************/
 const createCustomer = document.getElementById("addCustomerForm");
 createCustomer.addEventListener("submit", (event)=>{
     //console.log("submit is clicked");
     event.preventDefault();
     const data = new FormData(event.target);
     let firstname = document.getElementById("cust_firstName").value;
     let lastname = document.getElementById("cust_lastName").value;
     let phone = document.getElementById("cust_phone").value;
     const newCustomer = {firstname, lastname, phone}
     //console.log(newCustomer);    
     createCustomer.reset();
     fetch("/api/customer", {
         headers: {
             "Content-Type": "application/json"
         },
         method: "POST",
         body: JSON.stringify(newCustomer)
         //console.log(firstname.value, lastname.value, phone.value);    
     })
     .then((res)=>res.json())
     .then((data)=>{
        submit = true;
        customerData(submit);
     });
 })

/************************************************** Employee Button Functionality **************************************************/
var employee_toggled = false;
displayEmployee.addEventListener("click", ()=>{
    if(!employee_toggled){ //runs when toggle is false for the first time
        employee_toggled = true;
        let submit = false;
        employeeData(submit);     
    }   
    else if(employee_toggled){ //runs when toggle is set to true. this will toggle off the customer table
        employee_toggled = false;
        const table = document.getElementById("employee_table"); 
        employee_div.append(table);
        addEmployee_div.innerHTML= " ";
        table.innerHTML = " ";
    }
});

function employeeData(submit){
    const table = document.getElementById("employee_table"); 
    employee_div.append(table);
    fetch("/api/employee") //fetches customer api
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data);
            // const addEmployeebtn = document.createElement("button");
            // addEmployee_div.append(addEmployeebtn)
            // addEmployeebtn.innerHTML = "Add Employee";
            //creates table headers for the customers table
            table.innerHTML = ` 
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone</th>
                    </tr>
                </thead>
            `;
            //for each element of returned api, it will create table data(rows)
            for (let key in data){
                let id = data[key]["id"];
                let firstName = data[key]["firstname"];
                let lastName = data[key]["lastname"];
                let phone = data[key]["phone"];
                table.innerHTML +=`
                    <tbody id = "employeeTB" class="employeeTB">
                        <tr>
                            <td>${id}</td>
                            <td>${firstName}</td>
                            <td>${lastName}</td>
                            <td>${phone}</td>
                            <td><button id = "deleteBtnId" class = "deleteBtn">Delete</td>
                        </tr> 
                    </tbody>
                `
            }
            /************************* Add Employee Button *************************/
            function addEmployee(){
                const addEmployeebtn = document.createElement("button");
                addEmployee_div.append(addEmployeebtn)
                addEmployeebtn.innerHTML = "Add Employee";
                addEmployeebtn.addEventListener("click",(event)=>{ //Click on Add Employee button
                    //console.log("Add button is clicked");
                    //event.preventDefault();
                    const form = document.getElementById("addEmployeeForm");
                    if(form.hidden === true){
                        form.hidden = false;
                    } else{
                        form.hidden = true;
                    }               
                });
            }
            if (submit === false){
            addEmployee();
            }
        });
}

/************************************************** Submit Employee Info **************************************************/
const createEmployee = document.getElementById("addEmployeeForm");
createEmployee.addEventListener("submit", (event)=>{
    event.preventDefault();
    //console.log("submit is clicked");
    const data = new FormData(event.target);

    let firstname = document.getElementById("employee_firstName").value;
    let lastname = document.getElementById("employee_lastName").value;
    let phone = document.getElementById("employee_phone").value;
    const newEmployee = {firstname, lastname, phone}
    //console.log(newEmployee);    
    createEmployee.reset();
    fetch("/api/employee", {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(newEmployee)
    })
    .then((res)=>res.json())
     .then((data)=>{
        submit = true;
        employeeData(submit);
     });
})

/************************************************** Vehicle Button Functionality **************************************************/
var vehicle_toggled = false;
displayVehicle.addEventListener("click", ()=>{
    if(!vehicle_toggled){ //runs when toggle is false for the first time
        vehicle_toggled = true;
        let submit = false;
        vehicleData(submit);
    }   
    else if(vehicle_toggled){ //runs when toggle is set to true. this will toggle off the customer table
        vehicle_toggled = false;
        const table = document.getElementById("vehicle_table"); 
        vehicle_div.append(table);
        addVehicle_div.innerHTML= " ";
        table.innerHTML = " ";
    }
});

function vehicleData(submit){
    const table = document.getElementById("vehicle_table"); 
    vehicle_div.append(table);
        fetch("/api/vehicle") //fetches customer api
            .then((res)=>res.json())
            .then((data)=>{
                console.log(data);
                //creates table headers for the customers table
                table.innerHTML = ` 
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Make</th>
                            <th>Model</th>
                            <th>Year</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                `;
                //for each element of returned api, it will create table data(rows)
                for (let key in data){
                    let id = data[key]["id"];
                    let make = data[key]["make"];
                    let model = data[key]["model"];
                    let year = data[key]["year"];
                    let price = data[key]["price"];
                    let sold = data[key]["sold"];
                    if (sold === false){
                        table.innerHTML +=`
                        <tbody id = "employeeTB" class="employeeTB">
                            <tr>
                                <td>${id}</td>
                                <td>${make}</td>
                                <td>${model}</td>
                                <td>${year}</td>
                                <td>${price}</td>
                                <td><button id = "deleteBtnId" class = "deleteBtn">Delete</td>
                            </tr> 
                        </tbody>
                    `
                    } 
                }
                /************************* Add Vehicle Button *************************/
               function addVehicle(){
                    const addVehiclebtn = document.createElement("button");
                    addVehicle_div.append(addVehiclebtn)
                    addVehiclebtn.innerHTML = "Add Vehicle";
                    addVehiclebtn.addEventListener("click",(event)=>{ //Click on Add Employee button
                        //console.log("Add vehicle button is clicked");
                        const form = document.getElementById("addVehicleForm");
                        if(form.hidden === true){
                            form.hidden = false;
                        } else{
                            form.hidden = true;
                        }
                    });
               }
               if (submit === false){
                //console.log("value of submit",submit);
                addVehicle();
               }
            });
}

/************************************************** Submit Vehicle Info **************************************************/
const createVehicle = document.getElementById("addVehicleForm");
createVehicle.addEventListener("submit", (event)=>{
    //console.log("submit is clicked");
    event.preventDefault();
    const data = new FormData(event.target);

    let make = document.getElementById("vehicle_make").value;
    let model = document.getElementById("vehicle_model").value;
    let year = document.getElementById("vehicle_year").value;
    let price = document.getElementById("vehicle_price").value;
    let sold = false;
    const newVehicle = {make, model, year, price, sold}
    //console.log(newVehicle);    
    createVehicle.reset();
    fetch("/api/vehicle", {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(newVehicle)
    })
    .then((res)=>res.json())
    .then((data)=>{
       submit = true;
       vehicleData(submit);
    });
})

/************************************************** Sales Button Functionality **************************************************/
var sales_toggled = false;
displaySales.addEventListener("click", ()=>{
    if(!sales_toggled){ //runs when toggle is false for the first time
        sales_toggled = true;
        const table = document.getElementById("sales_table"); 
        sales_div.append(table);
        fetch("/api/sales") //fetches customer api
            .then((res)=>res.json())
            .then((data)=>{
                console.log(data);
                //creates table headers for the customers table
                table.innerHTML = ` 
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Customer Name</th>
                            <th>Employee Name</th>
                            <th>Make</th>
                            <th>Model</th>
                            <th>Year</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                `;
                //for each element of returned api, it will create table data(rows)
                for (let key in data){
                    let id = data[key]["id"];
                    let customer_name = data[key]["customer_name"];
                    let employee_name = data[key]["employee_name"];
                    let make = data[key]["make"];
                    let model = data[key]["model"];
                    let year = data[key]["year"];
                    let price = data[key]["price"];
                    table.innerHTML +=`
                        <tbody id = "employeeTB" class="employeeTB">
                            <tr>
                                <td>${id}</td>
                                <td>${customer_name}</td>
                                <td>${employee_name}</td>
                                <td>${make}</td>
                                <td>${model}</td>
                                <td>${year}</td>
                                <td>${price}</td>
                                <td><button id = "deleteBtnId" class = "deleteBtn">Delete</td>
                            </tr> 
                        </tbody>
                    `
                }
            });
    }   
    else if(sales_toggled){ //runs when toggle is set to true. this will toggle off the customer table
        sales_toggled = false;
        const table = document.getElementById("sales_table"); 
        sales_div.append(table);
        table.innerHTML = " ";
    }
});

/************************************************** Purchase Button Functionality **************************************************/
var purchase_toggled = false;
displayPurchase.addEventListener("click", ()=>{
    const purchaseForm = document.getElementById("purchaseForm");
    if(!purchase_toggled){ //runs when toggle is false for the first time
        purchase_toggled = true;
        purchaseForm.hidden = false;
    }   
    else if(purchase_toggled){ //runs when toggle is set to true. this will toggle off the purchase form
        purchase_toggled = false;
        purchaseForm.hidden = true;
    }
});

const createPurchase = document.getElementById("purchaseForm");
createPurchase.addEventListener("submit", (event)=>{

    //console.log("submit is clicked");
    event.preventDefault();
    const data = new FormData(event.target);

    let employee_id = document.getElementById("employee_id_purchase").value;
    let customer_id = document.getElementById("customer_id_purchase").value;
    let vehicle_id = document.getElementById("vehicle_id_purchase").value;

    const newPurchase = {employee_id, customer_id, vehicle_id}
    //console.log(newPurchase);    
    createPurchase.reset();

    fetch("/api/sales", {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(newPurchase)
    });
})