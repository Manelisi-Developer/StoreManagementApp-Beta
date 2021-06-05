// ################### THEMES ###################

// dark theme
function dark()
{
  var theme; // declare variable


  theme = document.getElementById("theme-link")
  // change attribute
  theme.setAttribute("href", "script/CSS/ui/css-dark.css")
}


// light theme
function light()
{
  var theme; // declare variable


  theme = document.getElementById("theme-link")
  // change attribute
  theme.setAttribute("href", "script/CSS/ui/css-light.css")
}

// ################### THEMES ###################







// ################### NOTIFICATION ###################
function notification(apn_Title, apn_Article)
{
	var btn, ctn_hidden, title, article, audio; // declare variable

  ctn_hidden = document.getElementById("notification-handler");
	btn = document.getElementById("notification-button");
	title = document.getElementById("notification-title");
	article = document.getElementById("notification-article");
  audio = document.getElementById("error-audio");

	if (ctn_hidden.style.display !== "block")
	{
		ctn_hidden.style.display = "block";
		title.innerHTML = apn_Title;
		article.innerHTML = apn_Article;
    // focus on button
    setInterval(function focus_on_button() {btn.focus()})
	}
	else if (canvas.style.display == "block")
	{
		title.innerHTML = apn_Title;
		article.innerHTML = apn_Article;
	}
};



// hide notification container
function hide_notification()
{
  var ctn_hidden; // declare variable

  ctn_hidden = document.getElementById("notification-handler")

  ctn_hidden.style.display = "none";
};
// ################### NOTIFICATION ###################








// ################### CONTEXT MENU ###################
function show_hide(id, display, link_id)
{
  var canvas, element; //declare variable

  canvas = document.getElementById(id);
  element = document.getElementById(link_id);

  if (canvas.style.display != display)
  {
    canvas.style.display = display;
    // focus on element
    if (element != null)
    {
      element.focus()
    }
  }
  else
  {
    canvas.style.display = "none";
  }
}
// ################### CONTEXT MENU ###################






// ################### CONTEXT MENU ###################


// ################### CONTEXT MENU ###################






// ################### LOADING ###################

function loading_notification(apn_text)
{
  var container, title; //declare variable

  container = document.getElementById("process-load-container");
  title = document.getElementById("load-title");


  title.innerHTML = apn_text

  setInterval(load_display)
  function load_display()
  {
    if (title.innerHTML !== "")
    {
      container.style.display = "block";
      clearInterval(load_display);
    }
    else
    {
      container.style.display = "none";
      title.innerHTML = "";
      clearInterval(load_display);
    }
  }
}

// ################### LOADING ###################






// ################### PROCESS NOFICATION ###################
function process_notification(process_data, apn_title)
{
  var canvas, error, opacity, timer, bottom, text, auto; // declare variable

  canvas = document.getElementById("process-notification-container")
  error = document.getElementById("process-notification")
  title = document.getElementById("process-title")



  // clear text first
  text = ""
  text = process_data


  // declaration
  timer = 0;

  // insert information
  error.innerHTML = text
  title.innerHTML = apn_title


  if (error.innerHTML == "undefined" || error.innerHTML == "")
  {
    error.innerHTML = ""
    title.innerHTML = ""
    // dont display if not in good condition
    canvas.style.display = "none";
  }
  else if (error.innerHTML !== "undefined" || error.innerHTML !== "")
  {
    // display canvas
    auto = setInterval(frame);
    // show process notification
    canvas.style.display = "flex";
  };


  // animation
  function frame()
  {

    if (timer == 950)
    {
      // function at the end
      clearInterval(auto);
      canvas.style.display = "none";
      text = ""
    } 
    else 
    {
      // timer
      timer++;
    };
    
  };

};
// ################### PROCESS NOFICATION ###################







// ################### CREATE NOTIFICATION LIST ###################
var list_counter = 1
function create_notification_list(title, text) 
{
  var container, n_parent, process_n_canvas;

  container = document.getElementById("notification-list-container")
  process_n_canvas = document.getElementById("process-notification-container")


  // createElement
  n_parent = document.createElement("ind-notification");
  // appendChild
  container.appendChild(n_parent);
  // innerHTML
  n_parent.innerHTML = "<div class='notification-alert'><h5 class='notification-alert-title'>"+title+"</h5>   <h5 class='notification-list-text'>"+text+"</h5></div>";


  // increment list count
  list_counter++
}
// ################### CREATE NOTIFICATION LIST ###################







// ################### ANIMATION ###################

// _______________FADE OUT_______________

function fadeOut(id)
{
  var opacity, canvas, auto;

  canvas = document.getElementById(id)

  // declaration
  opacity = 25;

  // animation
  auto = setInterval(animeOut, 5);
  function animeOut()
  {
    if (opacity == 0)
    {
      // End
      clearInterval(auto);
      canvas.style.display = "none";
      canvas.style.opacity = "100%";
    }
    else
    {
      // animate
      opacity--;
      canvas.style.opacity = opacity+"%";
    };
    };
};

// _______________FADE OUT_______________

// ################### ANIMATION ###################







function notification_flash(id)
{
   var brightness, canvas, auto;

   canvas = document.getElementById(id)

   // declaration
   brightness = 35;

   // animation
   auto = setInterval(anime, 5);
   function anime()
   {
       if (brightness == 0)
       {
         // End
         clearInterval(auto);
         canvas.style.display = "none";
         canvas.style.opacity = "100%";
       }
       else
       {
         // animate
         brightness--;
         canvas.style.opacity = opacity+"%";
       };
   };
}






// ################### SLIDE-LEFT ANIMATION ###################

function slideLeft(id)
{
  var opacity, canvas, auto, direction;

  canvas = document.getElementById(id)

  // declaration
  opacity = 35;
  direction = 0;

  // animation
  auto = setInterval(anime, 5);
  function anime()
  {
    if (opacity == 0)
    {
      // End
      clearInterval(auto);
      canvas.style.display = "none";
      canvas.style.marginLeft = "none";
      canvas.style.opacity = "100%";
    }
    else
    {
      // animate
      opacity--;
      direction--;
      canvas.style.opacity = opacity+"%";
      canvas.style.marginLeft = direction+"px";
    };
    };
};

// ################### SLIDE-LEFT ANIMATION ###################