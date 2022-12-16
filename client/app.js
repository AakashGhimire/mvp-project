const displayCustomer = document.getElementById("displayCustomer");
const customer_div = document.getElementById("customer-div-id");

displayCustomer.addEventListener("click", ()=>{
    console.log("Customer button is clicked");

    const p = document.createElement("p");
    const table = document.createElement("table");
    const tr = document.createElement("tr");
    const th = document.createElement("th");
    const td = document.createElement("td");
    
    fetch("/api/customer")
    .then((res)=>res.json())
    .then((data)=>{
        console.log(data);
    
    let id = data[0["id"]];
    let firstName = data[0["firstname"]];
    let lastName = data[0["lastname"]];
    let phone = data[0["phone"]];

    customer_div.append(p);
    p.append(table);
    table.append(tr);
    tr.append(th);
    
    th.innerHTML = id;
    th.innerHTML = firstName;
    th.innerHTML = lastName;
    th.innerHTML = phone;



    

    for(let i = 0; i<=data.length; i++){
        for(let key in data[i]){
            p.append(data[i][key]);
            console.log("");
        }
    }
    
        
    
        
    });

});


fetch("/api/employee")
    .then((res)=>res.json())
    .then((data)=>{
        console.log(data);
        //res.body(data);
    });

fetch("/api/vehicle")
    .then((res)=>res.json())
    .then((data)=>{
        console.log(data);
        //res.body(data);
    });

fetch("/api/sales")
    .then((res)=>res.json())
    .then((data)=>{
        console.log(data);
        //res.body(data);
    })