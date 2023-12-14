let myLeads = [];
let oldLeads = [];
const inputEl = document.getElementById("input-el");
const saveBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const leadsFromLocal = JSON.parse(localStorage.getItem("myLead"));
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("save-tab");
//console.log(leadsFromLocal);
//localStorage.clear();
tabBtn.addEventListener("click", function () {

    chrome.tabs.query({active : true, currentwindow : true}, function (tabs){
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads" , JSON.stringify(myLeads));
        render(myLeads);
    })
})

saveBtn.addEventListener("click", function () {

    myLeads.push(inputEl.value);
    inputEl.value = "";
    localStorage.setItem("myLead",JSON.stringify(myLeads));
    render(myLeads);
})

const render = (leads) => {
    let listitem = " ";
    for (let i = 0; i < leads.length; i++) {
        //listitem += "<li><a target='_blank' href='" + myLeads[i] + "'>" + myLeads[i] + "</a></li>";
        listitem += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listitem;
}

if ( leadsFromLocal) {

    myLeads = leadsFromLocal;
    render(myLeads);
}

deleteBtn.addEventListener("dblclick", function (){
    localStorage.clear();
    myLeads = [];
    render(myLeads);
})



// for ( let i = 0; i < myLeads.length; i++) {
//     //ulEl.innerHTML += "<li>"+ myLeads[i] + "</li>";
//     let li = document.createElement("li");
//     li.textContent += myLeads[i];
//     ulEl.append(li);
// }

// const save = () => {
//     console.log("Button Clicked!")
// }
