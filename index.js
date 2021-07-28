console.log("JavaScript File Attached!");

let myLeads = [];                 //array
const input = document.getElementById('input');

const ul = document.getElementById('ul');

const inputBtn = document.getElementById('inputBtn');

const tabBtn = document.getElementById('tabBtn');
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));          
if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}



tabBtn.addEventListener('click', () => {
    //Grab the URL of the current tab using chrome api
    chrome.tabs.query({
        active: true,               //current tab
        currentWindow: true         
    },
        function (tabs) {
            myLeads.push(tabs[0].url);
            localStorage.setItem("myLeads", JSON.stringify(myLeads));
            render(myLeads);

        })
})



function render(leads) {
    let listItems = "";
    for (let i = 0; i < leads.length; i++) {
        // console.log(leads[i]);
        // listItems+="<li><a target='_blank' href='" + leads[i] + "'>"+leads[i]+"</a></li>";        //innerHTML se hum tag lga skte h DOM mei javaScript ki help se
        //OR

        listItems += `<li>
                        <a target='_blank' href='${leads[i]}'>
                        ${leads[i]}
                        </a>
                    </li>
                        `;

        // OR
        // const li=document.createElement("li");
        // li.textContent=leads[i];
        // ul.append(li);
    }
    ul.innerHTML = listItems;
}

let deleteBtn = document.getElementById('deleteBtn');
deleteBtn.addEventListener('dblclick', () => {
    console.log("Double Click Button!");
    localStorage.clear();
    myLeads = [];
    render(myLeads);
});


inputBtn.addEventListener('click', () => {
    // console.log('Input Button Clicked!');
    myLeads.push(input.value);                      
    // console.log(myLeads);
    input.value = "";                    

    localStorage.setItem("myLeads", JSON.stringify(myLeads));    
    render(myLeads);
});




