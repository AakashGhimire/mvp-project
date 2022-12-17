const displayCustomer = document.getElementById("displayCustomer");
const customer_div = document.getElementById("customer-div-id");

/************************************************** Customer Button Functionality **************************************************/
var customer_toggled = false;
displayCustomer.addEventListener("click", ()=>{
    if(!customer_toggled){ //runs when toggle is false for the first time
        customer_toggled = true;
        const table = document.getElementById("customer_table"); 
        customer_div.append(table);
        fetch("/api/customer") //fetches customer api
            .then((res)=>res.json())
            .then((data)=>{
                console.log(data);
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
            });
    }   
    else if(customer_toggled){ //runs when toggle is set to true. this will toggle off the customer table
        customer_toggled = false;
        console.log("Toggle is false");
        const table = document.getElementById("customer_table"); 
        customer_div.append(table);
        table.innerHTML = " ";
    }

    
    // displayCustomer.classList.toggle(clear());
    // const table = document.getElementById("customer_table"); 
    // customer_div.append(table);
    // fetch("/api/customer")
    // .then((res)=>res.json())
    // .then((data)=>{
    //     console.log(data);
    // table.innerHTML = `
    //     <thead>
    //         <tr>
    //             <th>ID</th>
    //             <th>First Name</th>
    //             <th>Last Name</th>
    //             <th>Phone</th>
    //         </tr>
    //     </thead>
    // `;
    // for (let key in data){
    //     let id = data[key]["id"];
    //     let firstName = data[key]["firstname"];
    //     let lastName = data[key]["lastname"];
    //     let phone = data[key]["phone"];
    //     table.innerHTML +=`
    //         <tbody id = "customerTB" class="customerTB">
    //             <tr>
    //                 <td>${id}</td>
    //                 <td>${firstName}</td>
    //                 <td>${lastName}</td>
    //                 <td>${phone}</td>
    //                 <td><button id = "deleteBtnId" class = "deleteBtn">Delete</td>
    //             </tr> 
    //         </tbody>
    //     `
    // }
    // });
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