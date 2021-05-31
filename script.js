let runBtn = document.getElementById("runcode");
let codearea = document.getElementById("codepart");
let outputarea = document.getElementById("outputarea");
runcode.addEventListener("click",sendCodeToRun)
function sendCodeToRun() {
  // Sending xhr request to the server
  cursor = codearea.selectionEnd;
  let xhr = new XMLHttpRequest();
  xhr.open("POST","shell.php",true);
  code = codearea.value;
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send("code="+code);
  // xhr.onload = function() {
  //   console.log(xhr.responseText)
  //   outputarea.innerText = xhr.responseText;
  //   codearea.focus();
  //   codearea.selectionStart = cursor;
  //   codearea.selectionEnd = cursor;
  //
  // }
  xhr.onreadystatechange = function() {
    // console.log(xhr.readyState)
    if(this.readyState == 4) {
      if(this.status == 200) {
        runBtn.innerText = "Run Code";
        console.log(xhr.responseText)
           outputarea.textContent = xhr.responseText;
           codearea.focus();
           codearea.selectionStart = cursor;
           codearea.selectionEnd = cursor;
      }else{
        runBtn.inerText = "Failed..";
      }
    }else{
      runBtn.innerText = "Interpreting..";
    }
  }
}
codearea.addEventListener("keydown",event=>{
  if(event.key === "Tab") {
    event.preventDefault();
    var start = codearea.selectionStart;
    var end = codearea.selectionEnd;
    codearea.value = codearea.value.substring(0, start) + "\t" + codearea.value.substring(end);
    codearea.selectionStart = codearea.selectionEnd = start + 1;
    console.log(start,end)
  }
})
// Putting the postion of cursor in corrent position
window.onload = function() {
  codearea.selectionStart = 101;
  codearea.selectionEnd = 101;
}
document.body.addEventListener("keydown",event=>{
  if(event.key == "F10") {
    event.preventDefault();
    sendCodeToRun();
  }
})
