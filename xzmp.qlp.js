var config = {
  apiKey: "AIzaSyBvpEeN4pjvdYJLiyPRez_RizvBPW-6n9Q",
  authDomain: "rqsxvmw.firebaseapp.com",
  databaseURL: "https://rqsxvmw.firebaseio.com",
  projectId: "rqsxvmw",
  storageBucket: "rqsxvmw.appspot.com",
  messagingSenderId: "493617998768"
};
firebase.initializeApp(config);

var p1, p2, person;
var db = firebase.database();
var $mc = $("#mainContainer");

db.ref("looked").push({t:moment().format("dddd, MMM Do, h:mm a")});

db.ref("spw").on("child_added", function(snapshot) {
  p1 = snapshot.val().p1;
  p2 = snapshot.val().p2;  
});

$("#loginfrm").on("submit", function() {  
  if($("#mainpassword").val() === p1) loginp(1);
  if($("#mainpassword").val() === p2) loginp(2);
  if($("#mainpassword").val() === "empty") db.ref("msg").remove();  

  $("#mainpassword").val('');
  return false;
});

$("#txtsend").on("click", function() { 
  console.log("sending"); 
  sendMsg($("#maintxt").val());
  $("#maintxt").val('');
  return false;
});

function loginp(p){
  person = p;

  db.ref("pwl").push({per:p, t:moment().format("dddd, MMM Do, h:mm a")});
 
  db.ref("msg").orderByChild("ts").on("child_added", function(snapshot) {
    console.log(snapshot.val());
    console.log(snapshot.getRef());
    buildMsg(snapshot);
  });
}

function buildMsg(snap){
  var msg = snap.val();
  var $div_msg = $("<div class='row'>");
  var $p_msg = $("<p style='font: 14px arial, sans-serif'>");
  //var $b_msg = $('<button type="button" class="btn btn-primary btn-sm float-left">').html("done").attr("msg", );
  //$b_msg.on("click", function(){
    //snap.getRef().setValue(null);
  //});

  if(person === msg.p) {
    $p_msg.html("your msg on: (" + msg.t + ")");
    $mc.prepend($div_msg.append($p_msg));
  }

  if(person !== msg.p) {
    $p_msg.html(msg.m + " (" + msg.t + ")");
    $mc.prepend($div_msg.append($p_msg));
  }
}

function sendMsg(msg){
  db.ref("msg").push({
    p: person,
    m: msg,
    t: moment().format("dddd, MMM Do, h:mm a"),
    ts: firebase.database.ServerValue.TIMESTAMP
  });
}

// db.ref("msg").remove();



//console.log(now)


//
// $postmsg.on("click", function() {
//   db.ref("chat").push(
//     {
//       username: $user.val().trim(), 
//       message: $msg.val().trim()
//     });
//   $msg.value = "";
// });

//$signIn.on("click", function(){});

