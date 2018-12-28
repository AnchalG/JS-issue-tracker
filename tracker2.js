
function statusDDL(newList){
    let dropdownList=document.createElement("select");
    dropdownList.setAttribute("class","label label-danger");
    dropdownList.appendChild(new Option("Active","Active"));
    dropdownList.appendChild(new Option("In Progress","In Progress"));
    dropdownList.appendChild(new Option("Resolved","Resolved"));
    dropdownList.appendChild(new Option("Blocked","Blocked"));
    newList.appendChild(dropdownList);
    newList.appendChild(document.createElement('br'));
}

function descriptionF(newList,description){
    var descriptionTxtBox=document.createElement("h2");
    descriptionTxtBox.setAttribute('id','descriptionEditable');
    descriptionTxtBox.setAttribute("contenteditable","true");
    // console.log(descriptionTxtBox);
    // console.log(descriptionTxtBox);
     descriptionTxtBox.textContent=description;
    newList.appendChild(descriptionTxtBox);
   // newList.appendChild(document.createElement('br'));
}

function assignedF(newList,assigned){
    var div=document.createElement('div');
    div.setAttribute('class','col-xs-3');
    var span=document.createElement('span');
    span.setAttribute('class','glyphicon glyphicon-user');
    div.appendChild(span);
    var assignedTxt= document.createElement('label');
    assignedTxt.setAttribute('contenteditable','true');
    assignedTxt.textContent=assigned;
    div.append("    ");
    //assignedTxt.value=assigned;
    div.appendChild(assignedTxt);
    newList.appendChild(div);
}

function severityF(newList,severity){
    var div=document.createElement('div');
    div.setAttribute('class','col-xs-3');
    var span=document.createElement('span');
    span.setAttribute('class','glyphicon glyphicon-fire');
    div.appendChild(span);
    let severityDDL=document.createElement('label');
    severityDDL.setAttribute('contenteditable','true');
    severityDDL.textContent=severity;
    div.append("    ");
    // dropdownList.setAttribute("class","label label-danger");
    // severityDDL.appendChild(new Option("Low","Low"));
    // severityDDL.appendChild(new Option("Medium","Medium"));
    // severityDDL.appendChild(new Option("High","High"));
    div.appendChild(severityDDL);
    newList.appendChild(div);
    newList.appendChild(document.createElement('br'));
    newList.appendChild(document.createElement('br'));
  
}

function getData(){
    var fetchedData;
    var xhr=new XMLHttpRequest();
    xhr.open('GET',"HELLO.json",false);
    xhr.onloadend=function(){
        if (this.readyState == 4 && this.status == 200) {
        fetchedData=JSON.parse(xhr.responseText);
       getDataInFunction(fetchedData);
    }}
        xhr.send();
};

function getDataInFunction(data){

globalThing=data;
}


// let AllIssueBtn=document.getElementById('allIssues');
// if(AllIssueBtn !=null){
window.addEventListener('load',function(e){
    e.preventDefault();
    let issueListTrackerDiv=document.getElementById("issueListTracker");
    getData();
console.log(globalThing);
var key,value;
for(var i in globalThing)
{
    let newList=document.createElement("div");
    newList.setAttribute("class","well well-sm col-xs-7");
    
  key=i;
  value=globalThing[i];
  statusDDL(newList);
    
    descriptionF(newList,value.description);
    assignedF(newList,value.assigned);
    severityF(newList,value.severity);  
    issueListTrackerDiv.appendChild(newList);
   
}
    //  saveBtn(newList);
   // issueListTrackerDiv.appendChild(newList);
});
// }
