
var msgToSend = document.getElementById('message-content');
var chatContent = document.getElementById('chat-content');
var firstLoad = true;


fetch_messages();
setInterval(function() {
    fetch_messages()
}, 8000);

function render_messages(msg) {
    var box = document.createElement('DIV');
    box.classList.add('message');

    if (msg.student_id == '15307') {
        box.classList.add('message-own');
    }

    box.innerHTML = msg.nick + "<br>Dice: " + msg.text;
    document.getElementById('chat-content').appendChild(box);
}

function fetch_messages() {
    fetch('http://34.210.35.174:7000')
    .then(function(res) {
        return res.json();
    })
    .then(function(res) {
        var temp = chatContent.scrollTop;
        chatContent.innerHTML = "";

        res.forEach((el) => {
            render_messages(el);
        })

        chatContent.scrollTop = temp;

        if (firstLoad) {
            chatContent.scrollTop = chatContent.scrollHeight;
            firstLoad = false;
        }

    })
    .catch(function(error) {
        console.log(error);
    });
}

 form.onsubmit = function(e) {
 	e.preventDefault();

     var xml = new XMLHttpRequest();
 	var message = msgToSend.value;
     var query = "student_id=15307&nick=Jenny&text=" + message;

 	xml.open('POST', 'http://34.210.35.174:7000', true);
 	xml.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
 	xml.onreadystatechange = function() {
 	    if(xml.readyState == 4 && xml.status == 200) {
 	        msgToSend.value = "";
 	        fetch_messages();
 	    }
 	}
 	xml.send(query);
 }
