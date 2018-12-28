let globalThing;
    

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
    console.log(descriptionTxtBox);
    console.log(descriptionTxtBox);
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

function saveBtn(newList){
  var SaveButton=document.createElement('button');
  SaveButton.setAttribute("class","btn btn-primary");
  SaveButton.setAttribute("id","closeIssue");
  SaveButton.append("Save");
  newList.appendChild(SaveButton);
 }
 function merge2Object(debug1,y){
    var a= new Object();
    for(var i in y){
        var key = i;
        var val = y[i];
        a[i]=val;
         }
    i++;
    a[i]=debug1;
    return a;
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

function destroyClickedElement(event)
{
    document.body.removeChild(event.target);
}



let submitIssueBtn=document.getElementById("submitIssue");
submitIssueBtn.addEventListener('click',function(e){
    e.preventDefault();
    let description=document.getElementById("Description").value;
    let assigned=document.getElementById('Assigned').value;
    let severity=document.getElementById('severity').value;
    let listTrackerDiv=document.getElementById("listTracker");
    let newList=document.createElement("div");

    newList.setAttribute("class","well well-sm col-xs-7");
    statusDDL(newList);
    descriptionF(newList,description);
     assignedF(newList,assigned);
     severityF(newList,severity);  
     saveBtn(newList);
     listTrackerDiv.appendChild(newList);
});
let sendToFile=document.getElementById("sendToFile");
sendToFile.addEventListener('click',function (){
    let descriptionS=document.getElementById("Description").value;
    let assignedS=document.getElementById("Assigned").value;
    let severityS=document.getElementById('severity').value;
    getData();
    var debug1=(new Object({"description":descriptionS,"assigned":assignedS,"severity":severityS}));
    JSON.stringify(debug1,null,0);//convert object to json
    console.log(globalThing);
    var newObject=merge2Object(debug1,globalThing);
    var textToSaveAsBlob = new Blob([JSON.stringify(newObject, null, 0)], {type : 'application/json'});
    var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
    var fileNameToSaveAs = "HELLO.json";
    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    downloadLink.href = textToSaveAsURL;
    // downloadLink.onclick = destroyClickedElement;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
});
