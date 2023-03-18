let myLeads = []

let ulEl = document.getElementById("ul-el")
const inputEl = document.getElementById("input-el")

const inputBtn = document.getElementById("input-btn")
const deleteBtn = document.getElementById("delete-btn")
const addTab = document.getElementById("addtab-btn")

valueFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))



if (valueFromLocalStorage){
    myLeads = valueFromLocalStorage
    render(myLeads)
}



addTab.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
   
})



//this is a function created to manipulate arrays

function render(leads){
    let listItems = ""
    for (i=0; i < leads.length; i++) {
        listItems += "<li><a target = '_blank' href = ' "+leads[i]+"'  >" + leads[i] + "</a></li>"                 
    }
    ulEl.innerHTML=listItems
    }




inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value= ""

    // this is because localStorage deos not support arrays and JSON.stringify converts arrays to strings
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
   
})
/* //inner html infuses whatever is given to it in corrosponding HTML file */

deleteBtn.addEventListener("dblclick",  function(){
    localStorage.clear()
    myLeads = []
    render(myLeads)
})


