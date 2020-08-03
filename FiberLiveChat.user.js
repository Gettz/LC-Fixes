// ==UserScript==
// @name         LC Fixes
// @version      3.9.2
// @description  Modify LC to better serve Google Fiber
// @author       Tom L
// @match        *://my.livechatinc.com/*
// @grant        GM_addStyle
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.js
// @updateURL    https://raw.githubusercontent.com/Gettz/LC-Fixes/master/FiberLiveChat.user.js
// @downloadURL  https://raw.githubusercontent.com/Gettz/LC-Fixes/master/FiberLiveChat.user.js
// ==/UserScript==

//var infoPanel = document.createElement ('div');
//infoPanel.innerHTML = '<span>Modified LC, contact <a href="mailto:thomas.leary@telenetwork.com?Subject=UserScript'+
//    ' Error" target="_top">Tom L</a> to report issues</span>';

//infoPanel.setAttribute ('id', 'myContainer');
//document.body.appendChild (infoPanel);

var observer = new MutationObserver(function(mutations, observer) {
    // fired when a mutation occurs
    $("div.drag-and-drop-mask").remove();
    $("div.css-1aq9ty8.css-zgpj410").remove();
    $("div.lc-4nhddd.extks10").remove();
    $("div.widget-global-fufk4zfvl1v").remove();
});

// define what element should be observed by the observer
// and what types of mutations trigger the callback
observer.observe(document, {
    subtree: true,
    attributes: true,
    childList: true,
    characterData: true,
    attributeOldValue: true,
    characterDataOldValue: true
});

// Creates Buttons
var csatNode = document.createElement ('div');
csatNode.innerHTML = '<button id="myButton" type="button"> Dispute </button>';
csatNode.setAttribute ('id', 'myBContainer');
document.body.appendChild(csatNode);

var divGroup = document.createElement('div');
divGroup.setAttribute('class','btn-group')
divGroup.innerHTML = '<button id="myButton2" type="button"> T2 Assist </button>' +
    '<button id="myButton3" type="button"> AUS/KC OC/SAT </button>' +
    '<button id="myButton4" type="button"> ATL/HSV BNA </button>' +
    '<button id="myButton5" type="button"> CLT/SLC RDU </button>';
document.body.appendChild(divGroup);

$("#myButton").click(function(event){
   if(event.shiftKey) {
       integration();
   }
   else {
       openForm();
   }
});
$("#myButton2").click(function(event){
    openLC(7);
});

$("#myButton3").click(function(event){
    openLC(10);
});

$("#myButton4").click(function(event){
    openLC(9);
});

$("#myButton5").click(function(event){
    openLC(17);
});
// collects chatID and opens csat Dispute form in new window if on correct page
function openForm () {
    var myURL = (window.location.href).split('?')[0]
    var chatID = myURL.substring(myURL.length - 10);
    if (chatID.startsWith("Q") == true) {
//        GM_setClipboard (chatID);
        window.open('https://docs.google.com/forms/d/e/1FAIpQLScYyaSSAmiVmnkT5pVUAl' +
                    'B-5_L7lV6Bu3UzClYWUBr5Zv8wYA/viewform?entry.1193564413=' + chatID,'targetWindow','left=1000px'+
                    'toolbar=no, location=no,status=no,menubar=no,scrollbars=yes,resizable=yes'
                    + ',width=450px,height=900px');return false;
    }
    else {
        alert("No chat ID found!");
    }
}

function integration() {
    var myURL = (window.location.href).split('?')[0]
    var chatID = myURL.substring(myURL.length - 10);
    var classCount = document.getElementsByClassName('css-1nmshg5').length;
    var email = document.getElementsByClassName('css-1nmshg5')[classCount - 1].innerHTML
    if (email == null) {
        email = ''
    }
    else {
        if (chatID.startsWith("Q") == true) {
            window.open('https://fiber-customer-support.corp.google.com/fiber/InboundContact?channel=Chat&chat_id=' + chatID +
                        '&email=' + email, '_blank');return false;
        }
        else {
            alert("No chat ID found!");
        }
    }
}

function openLC(gid) {
    window.open('https://secure.livechatinc.com/licence/7251891/v2/open_chat.cgi?groups='+gid,'targetWindow',
                'top=330px,toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=525px,height=675px');return false;
}

GM_addStyle ( `
    #myContainer {
        position:               absolute;
        top:                    .5%;
        right:                  .1%;
        font-size:              14.5px;
        background:             aliceblue;
        border:                 1px outset black;
        margin:                 5px;
        opacity:                0.9;
        z-index:                1100;
        padding:                5px 5px;
    }
    #myBContainer {
        position:               absolute;
        bottom:                 .1%;
        right:                  7%;
        font-size:              16px;
        padding:                5px 5px;
        z-index:                1200;

    }
    #myButton{
        display:inline-block;
        padding:0.3em 1.2em;
        margin:0 0.3em 0.3em 0;
        border-radius:2em;
        box-sizing: border-box;
        text-decoration:none;
        font-family:'Roboto',sans-serif;
        font-weight:300;
        color:#FFFFFF;
        background-color:#4eb5f1;
        text-align:center;
        transition: all 0.2s;
    }
    #myButton:hover{
        background-color:#4095c6;
    }
    @media all and (max-width:30em){
    #mybutton{
        display:block;
        margin:0.2em auto;
    }
}
    .btn-group {
        position:               absolute;
        bottom:                 30%;
        left:                   .1%;
        z-index:                999999;
}
.btn-group button {
  background-color: #4CAF50;
  border: 1px solid green;
  color: white;
  padding: 5px 1px;
  cursor: pointer;
  width: 63px;
  display: block; /* Make the buttons appear below each other */
}

.btn-group button:not(:last-child) {
  border-bottom: none; /* Prevent double borders */
}

/* Add a background color on hover */
.btn-group button:hover {
  background-color: #3e8e41;
}
    #myContainer p {
        color:                  red;
        background:             white;
    }
` );
