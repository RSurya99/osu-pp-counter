let socket = new ReconnectingWebSocket("ws://127.0.0.1:24050/ws");

let bg = document.getElementById("bg");
let title = document.getElementById("title");
let diff = document.getElementById("diff");
let name = document.getElementById("name");

socket.onopen = () => console.log("Successfully Connected");

socket.onclose = event => {
  console.log("Socket Closed Connection: ", event);
  socket.send("Client Closed!");
};

socket.onerror = error => console.log("Socket Error: ", error);

let pp = new CountUp('pp', 0, 0, 0, .5, { useEasing: true, useGrouping: true, separator: " ", decimal: "." });
let h100 = new CountUp('h100', 0, 0, 0, .5, { useEasing: true, useGrouping: true, separator: " ", decimal: "." });
let h50 = new CountUp('h50', 0, 0, 0, .5, { useEasing: true, useGrouping: true, separator: " ", decimal: "." });
let h0 = new CountUp('h0', 0, 0, 0, .5, { useEasing: true, useGrouping: true, separator: " ", decimal: "." });

let tempState;
let tempImg;
let tempTitle;
let tempDiff;
let tempName;

socket.onmessage = event => {
    let data = JSON.parse(event.data), menu = data.menu, play = data.gameplay;
    console.log(play.name);
    if (tempState !== data.menu.bm.path.full) {
      tempState = data.menu.bm.path.full
      bg.setAttribute('src', `http://127.0.0.1:24050/Songs/${data.menu.bm.path.full}?a=${Math.random(10000)}`)
    }
    if(tempTitle !== data.menu.bm.metadata.artist + ' - ' + data.menu.bm.metadata.title){
        tempTitle = data.menu.bm.metadata.artist + ' - ' + data.menu.bm.metadata.title;
        title.innerHTML = tempTitle;
		
		if(title.getBoundingClientRect().width >= 300) {
			title.classList.add("over");
		} else {
			title.classList.remove("over");
		}
    }
    if(tempDiff !== '[' + data.menu.bm.metadata.difficulty + ']'){
          tempDiff = '[' + data.menu.bm.metadata.difficulty + ']';
          diff.innerHTML = tempDiff;
    }
    if(play.name != tempName){
        tempName = play.name;
        name.innerHTML= play.name;
    }
    pp.update(play.pp.current);
    h100.update(play.hits[100]);
    h50.update(play.hits[50]);
    h0.update(play.hits[0]);
};