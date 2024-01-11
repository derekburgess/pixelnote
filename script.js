// RegExp
var alphaNumExp = /^[0-9a-zA-Z\s,\S]+$/;

// Find mouse X-cord
function mouseX(e) {
  if (!e) e = window.event;
    if (e.clientX) return e.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
      else return 0;
}

// Find mouse Y-cord
function mouseY(e) {
  if (!e) e = window.event;
    if (e.clientY) return e.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
      else return 0;
}

// Create follower Div on click
function floatingInput() {
  var createInputDiv = document.createElement('div');
  var anchorGetId = document.getElementById('begin');
  // OnClick Event Listener for Mouse Follower
  //anchorGetId.addEventListener('click', function() {
    createInputDiv.id = 'floatingInput';
    createInputDiv.innerHTML = '<form name="floatingForm"><input type="text" size="20" name="formInput" id="userInput" onKeyDown="textCounter(document.floatingForm.formInput,document.floatingForm.remLen,140)"onKeyUp="textCounter(document.floatingForm.formInput,document.floatingForm.remLen,140)"><input readonly type="text" name="remLen" size="3" maxlength="3" value="140" id="counter"></form><div id="help"><p>push tab for focus</p><p>click n drag notes</p></div>';
    document.body.appendChild(createInputDiv);
    document.floatingForm.formInput.focus();
  //}, true);	
}

function textCounter(field,cntfield,maxlimit) {
	if (field.value.length > maxlimit) // if too long...trim it!
		field.value = field.value.substring(0, maxlimit);
			// otherwise, update 'characters left' counter
			else
		cntfield.value = maxlimit - field.value.length;
}

// Div follow mouse
function followMouse(e) {
  if (document.getElementById) {
    var offX = 15;
    var offY = 15;
    var obj = document.getElementById('floatingInput');
    obj.visibility = 'visible';
    obj.style.left = (parseInt(mouseX(e)) + offX) + 'px';
    obj.style.top = (parseInt(mouseY(e)) + offY) + 'px';
  }
}

// Parse input into div on return
function handleInput(e) {
  if (e.keyCode == 13) { 
    e.preventDefault();
    if (userInput.value.match(alphaNumExp)) return chatBubble();
    else userInputClear
  }
}

// Create Bubble Div on return
function chatBubble() {
  var offY = 50;
  var createBubbleDiv = document.createElement('div');
  var inputGetId = document.getElementById('floatingInput');
  var userInput = window.floatingForm.formInput.value;
  var userInputClear = window.floatingForm.formInput.value ='';
  var time = getTime();
  createBubbleDiv.className = 'bubble';
  createBubbleDiv.innerHTML = '<p><strong>' + time + ':</strong><br>  ' + userInput + '</p>';
  document.body.appendChild(createBubbleDiv);
  createBubbleDiv.style.left = (parseInt(inputGetId.style.left)) + 'px';
  createBubbleDiv.style.top = (parseInt(inputGetId.style.top)) + offY + 'px';
  //setTimeout(function(){if(bubble)return fade(bubble);},5000);
}

var dragobject={
	z: 0, x: 0, y: 0, offsetx : null, offsety : null, targetobj : null, dragapproved : 0,
	
	initialize:function(){
		document.onmousedown=this.drag
		document.onmouseup=function(){this.dragapproved=0}
		},
	
	drag:function(e){
		var evtobj=window.event? window.event : e
		this.targetobj=window.event? event.srcElement : e.target
		if (this.targetobj.className=="bubble"){
			this.dragapproved=1
			if (isNaN(parseInt(this.targetobj.style.left))){this.targetobj.style.left=0}
			if (isNaN(parseInt(this.targetobj.style.top))){this.targetobj.style.top=0}
			this.offsetx=parseInt(this.targetobj.style.left)
			this.offsety=parseInt(this.targetobj.style.top)
			this.x=evtobj.clientX
			this.y=evtobj.clientY
				if (evtobj.preventDefault)
					evtobj.preventDefault()
					document.onmousemove=dragobject.moveit
				}	
	},

	moveit:function(e){
		var evtobj=window.event? window.event : e
		if (this.dragapproved==1){
			this.targetobj.style.left=this.offsetx+evtobj.clientX-this.x+"px"
			this.targetobj.style.top=this.offsety+evtobj.clientY-this.y+"px"
		return false
		}
	}
}

// Time code
function getTime()
{
   var now    = new Date();
   var hour   = now.getHours();
   var minute = now.getMinutes();
   var second = now.getSeconds();
   var ap = "AM";
   if (hour   > 11) { ap = "PM";             }
   if (hour   > 12) { hour = hour - 12;      }
   if (hour   == 0) { hour = 12;             }
   if (hour   < 10) { hour   = "0" + hour;   }
   if (minute < 10) { minute = "0" + minute; }
   if (second < 10) { second = "0" + second; }
   var timeString = hour +
                    ':' +
                    minute +
                    ':' +
                    second +
                    " " +
                    ap;
   return timeString;
}


//if(document.getElementsByClassName()){
//alert('getElementsByClassName supported by this browser');
//}

window.onload = floatingInput;
window.onmousemove = followMouse;
window.onkeydown = handleInput;
window.onkeypress = handleInput;
dragobject.initialize()