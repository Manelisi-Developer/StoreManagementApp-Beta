// ########################## APPLICATION ########################## //

"use strict";



const remote = require("electron").remote;



// _____________________WINDOW_____________________ //

// exit
function quit_window()
{
  remote.getCurrentWindow().close();
};



// maximize and restore
function maximize_restore_window()
{
  if (window.innerWidth != screen.width)
  {
  	remote.getCurrentWindow().maximize();
  }
  else if (window.innerWidth == screen.width)
  {
  	remote.getCurrentWindow().restore();
  }
};



// minimize
function minimize_window()
{
  remote.getCurrentWindow().minimize();
};

// _____________________WINDOW_____________________ //



// scale to window width and height

// fire when load
window.addEventListener('load', scale_window_to_fit);
// fire when resize
window.addEventListener('resize', scale_window_to_fit);
// function to fire
function scale_window_to_fit()
{
	var workboard, profile_container, tasks, status, y, x; // declare variable

  workboard = document.getElementById("workboard-canvas");
	tasks = document.getElementById("product-canvas");
	status = document.getElementById("status-container");

		y = innerHeight;
		x = innerWidth;

  workboard.style.height = y-178+'px';
	tasks.style.height = y-168+'px';
	status.style.height = y-823+'px';
}



// show tooltip
function show_tooltip(text)
{
  var canvas // declare variable
  canvas = document.getElementById("tooltip-auto")

  canvas.innerHTML = text;
  canvas.style.display = "flex";
}



// hide tooltip
function hide_tooltip()
{
  var canvas; // declare variable
  canvas = document.getElementById("tooltip-auto")

  canvas.style.display = "none";
};



// check if tooltip is visible
setInterval(check_if_tooltip_is_visible);
function check_if_tooltip_is_visible()
{
  var tooltip, overview, label; // declare variable

  tooltip = document.getElementById("tooltip-auto")
  overview = document.getElementById("overview");

  if (tooltip.style.display == "flex")
  {
    overview.style.display = "none";
  }
  else if (tooltip.style.display == "none")
  {
    // label
    label = document.getElementById("product-input-label");

    if (label.value.length >= 30)
    {
      overview.style.display = "block";
    };
  };
};



// write document to storage file
function auto_save_document()
{
  var panel_one, panel_two; // declare variable

  panel_one = document.getElementById("product-canvas")
  panel_two = document.getElementsByTagName("pagination-and-workboard-group")
}

// ########################## APPLICATION ########################## //

















// ########################## MAIN MENU ########################## //



// ########################## MAIN MENU ########################## //



















// ########################## PRODUCT ########################## //

"use strict";


var selected = "";
var focused_product = ""

// confirmation panel variable
var confirmation_label = ""
var confirmation_price = 0

// money type
var currency = "R"

// convert to a Dollar.
// you devide the rand with the dollar worth of rands

// convert to a rand
// you multiply the converted dollar with 1 dollar worth of rands


// products lists
var products_list = []

// element insert positions
var element_position = "first";



// create product block
function add_product()
{
  var product_canvas, product_name, product_price, parent_Element, element_after; // declare variable

  product_canvas = document.getElementById("product-canvas");
  product_name = document.getElementById("product-input-label");
  product_price = document.getElementById("product-input-price");

  // store text
  store_input_text()

  // load notification
  loading_notification("Creating product...");

  if (product_name.value == "" || product_price.value == "")
  {
    // show notification
    notification("Oops!","You need both 'Name' & 'Price' to generate a product. <font class='nfc_comment'>Note: You can also create a folder to Archive your products.<a class='nfc_link' onclick='create_folder()' onclick='hide_notification()'> click here </a></font>")

    // blur
    product_price.blur();
    product_name.blur();
  }
  else if (isNaN(product_price.value))
  {
    // clear value
    product_price.value = null;
    // blur
    product_price.blur()
    notification("Warning!","You can only use numbers for product's price. <font class='nfc_comment'>Note: Use period to decimalize your price.</font>")
  }
  else
  {
    // create new element
    parent_Element = document.createElement("task");

    // appent element
    product_canvas.appendChild(parent_Element);

    // append text into parent element
    parent_Element.innerHTML = "<a href='#' class='products' id=\""+product_name.value+"\""+""+"  lang=\" - "+currency+product_price.value+' [ enter : sell product ]'+"\""+""+"  onfocus='selected_Element_ID(this.id)' onblur='empty_selected()' onkeyup='enter_function(event)' draggable='true' onmouseover='show_tooltip(this.id+lang)' onmouseleave='hide_tooltip()'> <h5 class='products-label' id=\""+product_name.value+'-label'+"\""+""+">"+product_name.value+"</h5> <hr id='Y-seperator' style='margin: 0px 10px 0px 0px;'> <deal-brief-canvas>    <h5 id='product-currency-symbol' class='w3-text-green'>"+currency+"</h5>   <h5 class='products-price w3-text-green' type='number' id=\""+'price-'+product_name.value+"\""+""+'-price'+">"+product_price.value+"</h5>  </deal-brief-canvas> </a>";

    // set ID for product parent element
    parent_Element.setAttribute("id", product_name.value);

    // insert product before firstchild
    if (element_position == "first")
    {
      product_canvas.insertBefore(parent_Element, product_canvas.firstChild)
    }
    else if (element_position == "last")
    {
      product_canvas.insertBefore(parent_Element, product_canvas.lastChild)
    }
    else if (element_position == "before selected")
    {
      element_after = document.getElementById(selected)
      product_canvas.insertBefore(parent_Element, element_after)
    }
    else if (element_position == "after selected")
    {
      element_after = document.getElementById(selected)
      product_canvas.insertBefore(parent_Element, element_after)
    }
    else
    {
      product_canvas.insertBefore(parent_Element, product_canvas.firstChild)
    }

    // add to product's name list
    created_products_name = product_name.value

    // clear store text
    restore = "";

    // focus
    product_name.focus()
  };

  // clear values
  product_name.value = "";
  product_price.value = null;

  // load notification hide
  loading_notification("");
};


// empty selected onblur
function empty_selected()
{
  selected = ""
}





// ####################### CONTEXT MENU #######################

function clear_name_input()
{
  var product_name;

  product_name = document.getElementById("product-input-label");

  if ( product_name.value != "" )
  {
    product_name.value = "";
  }
  else
  {
    process_notification("Product name input is already empty","Oops!")
  }
};

// ####################### CONTEXT MENU #######################






// ______________ SEARCH AND COMPARE PRODUCT'S NAMES ______________

var created_products_name = "";

function check_if_product_name_dont_exist()
{
  var product_name;

  product_name = document.getElementById("product-input-label");
}

function find_all_created_product_names()
{
  var product;
}

// ______________ SEARCH AND COMPARE PRODUCT'S NAMES ______________






// set .00 unit for product input price
// setInterval(set_unit_for_input_price)
// function set_unit_for_input_price()
// {
//   var inp, length, unit;

//   inp = document.getElementById("product-input-price");
//   length = inp.value.length;
//   unit = .00;

//   if (inp.value.includes(unit))
//   {
//     null
//   }
//   else
//   {
//     console.log(inp[length])
//   }
// }




// _____________reusing currency_____________

setInterval(auto_load_currency)
function auto_load_currency()
{
  var product_symbol, income_symbol;

  product_symbol = document.getElementById("product-currency-symbol");

  if (product_symbol.innerHTML != null)
  {
      if (product_symbol.innerHTML != currency)
    {
      product_symbol.innerHTML = currency;
    }
      else
    {
      clearInterval(auto_load_currency)
    }
  }
}

// _____________reusing currency_____________




// delete product
function delete_product()
{
  var canvas, sel; // declare variable

  canvas = document.getElementById("product-canvas")
  sel = document.getElementById(selected)

  if (canvas.innerHTML != "")
  {
    // remove element
    canvas.removeChild(sel);
    // clear selected
    selected = ""
  };
};



// product options
function delete_all_product()
{
  var canvas; //declare variable

  canvas = document.getElementById("product-canvas");

  if (canvas.innerHTML != "")
  {
    canvas.innerHTML = "";
  }
  else
  {
    notification("Notice!","Container is already empty.")
  };

  // clear selected
  selected = "";
  folder_counter = 0
}



// insert elements in which position
function first()
{
  element_position = "first"
};

function last()
{
  element_position = "last"
};

function before_selected()
{
  element_position = "before selected"
};

function after_selected()
{
  element_position = "first"
};



// auto check if price is not a number
function check_if_price_is_NaN()
{
  var product_price; // declare variable

  product_price = document.getElementById("product-input-price");

  if (isNaN(product_price.value))
  {
    // clear value
    product_price.value = "";
    // blur
    product_price.blur()
    notification("Numbers required!","You can only use numbers for product's price. <font class='nfc_comment'>Note: Use period to decimalize your price.</font>")
  };
};





// ________________________MAIN MENU________________________ //

// store input text
var restore = "";

// store text if it's available
function store_input_text()
{
  var product_name; // declare variable

  product_name = document.getElementById("product-input-label");

	// load notification
	loading_notification("Storing text...");

  if (product_name !== "")
  {
    restore = product_name.value;
    // start searching
    setInterval(check_if_restore_is_empty)
  }
  else
  {
  	// error
  	notification("Warning!","There was an error storing input data.");
  }
}



// restore text if it's available in restore
function restore_input_text()
{
  var product_name, clipboard; // declare variable

  product_name = document.getElementById("product-input-label");
  clipboard = document.getElementById("restore");

  if (restore !== "")
  {
    clipboard.style.display = "block";
    product_name.value = restore;
    restore = "";
  }
  else
  {
    clipboard.style.display = "none";
  }
}



setInterval(check_if_restore_is_empty)
function check_if_restore_is_empty()
{
  var clipboard; // declare variable

  clipboard = document.getElementById("restore");

  if (restore !== "")
  {
    clipboard.style.display = "block";
    // load notification hide
	loading_notification("");
  }
  else
  {
    clipboard.style.display = "none";
  }
  clearInterval(check_if_restore_is_empty)
}

// ________________________MAIN MENU________________________ //







var folder_counter = 0;
var history_counter = folder_counter;
// create products folder
function create_folder()
{
  var canvas, folder, folder_after; //declare variable

  canvas = document.getElementById("product-canvas");

	// load notification
	loading_notification("Creating new folder...");

  // create element
  folder = document.createElement("folder");
  // append element
  canvas.appendChild(folder);
  // increment folder counter
  folder_counter++;
  // innerHTML
  folder.innerHTML = "<div id=\""+folder_counter+"\""+""+" class='folder' onmousedown='find_folder_id(this.id)'> <input class='folder-title' contenteditable='true' maxlength='25' value='Folder "+folder_counter+"'></input> </div>";
  // set id for parent element folder
  folder.setAttribute("id","parent-folder-"+folder_counter);
  // insert before
  if (selected !== "")
    {
      folder_after = document.getElementById(selected)
      canvas.insertBefore(folder, folder_after)
    }
  // history
  history_counter++

  	// load notification hide
	loading_notification("");
};



// find folder id for selected
function find_folder_id(id)
{
  var folder, folderID; // declare variable

  folder = document.getElementById(id);
  folderID = folder.getAttribute("id");

  folder_counter = folderID-1;

  selected = "parent-folder-"+folderID;

  if (folder_counter == folderID-1)
  {
    folder_counter = history_counter;
  }
};



// BIND key to functions
function pressed_Key(event)
{
  var key // declare variable
  key = event.keyCode;

  // bind enter button
  if (key == 13)
  {
    add_product()
  }
};



// products_enter function
function enter_function(event)
{
  var key // declare variable
  key = event.keyCode;

  // bind enter button
  if (key == 13)
  {
    show_confirmation_canvas();
    append_selected_product_information_for_confirmation();
  }
};


// NOTICE!
// product name is undefined in history list when deleted


// find id of the selected product
function selected_Element_ID(id)
{
  var product_name, product_nameID, product_price, product_priceID; // declare variable

  product_name = document.getElementById(id);
  product_nameID = product_name.getAttribute("id");

  // set selected id
  selected = product_nameID;
  focused_product = product_nameID;

  product_price = document.getElementById("price-"+selected);
  product_priceID = product_price.innerHTML;

  selected_price = product_priceID
  // get id for stable purchase
  selected_Element_id_for_purchase(selected,selected_price)
};



// clear selected product
window.onclick = e => {
  var id // declare variable

  id = e.target.id;
  if (id == "product-canvas")
  {
    selected = "";
  }
  else if (id == "workboard-canvas")
  {
    selected = "";
  }
  else if (id == "status-container")
  {
    selected = "";
  }
  else if (id == "mainmenu-canvas")
  {
    selected = "";
  }
};



// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~which element was clicked~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
// window.onclick = e => {
//     console.log(e.target.id);  // to get the element tag product_name.alone
// }
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~which element was clicked~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //



// display overview
function task_Hint_Show()
{
  var overview, product_name, product_price, tooltip; // declare variable

  overview = document.getElementById("overview");
  product_name = document.getElementById("product-input-label");
  product_price = document.getElementById("product-input-price");
  tooltip = document.getElementById("tooltip-auto")

  if (product_name.value.length >= 30)
  {
    overview.style.display = "block";
	// load notification
	loading_notification("Overview running...");
  }
  else
  {
    overview.style.display = "none";
    overview.innerHTML = "";
	// load notification hide
	loading_notification("");
  };
  // show notification if mouseover input while typing
  if (product_name.value.length >= 30 && tooltip.style.display != "none")
  {
  	product_name.value = "The text you write here appears in the overview feature as shown above product name input."
  	product_name.blur()
    notification("Warning!","Don't hover over any element to view breadcrump. <font class='nfc_comment'><span class='nfc_link'> click here </span> to disable this notification.</font>")
  };
};



// is product's input empty or not
setInterval(is_Tasks_Input_Empty)
function is_Tasks_Input_Empty()
{
  var overview, product_name, product_price; // declare variable

  overview = document.getElementById("overview");
  product_name = document.getElementById("product-input-label");
  product_price = document.getElementById("product-input-price");

  if (product_name.value != "")
  {
    overview.innerHTML = product_name.value+" : "+currency+product_price.value;
  }
  else
  {
    overview.innerHTML = ""
  }
};



// is product's canvas empty or not
setInterval(is_product_canvas_Empty)
function is_product_canvas_Empty()
{
  var btnStable, delete_button, tasks_status, percent; // declare variable

  btnStable = document.getElementById("sell-product-stable");
  delete_button = document.getElementById("task-delete-btn");
  tasks_status = document.getElementsByClassName("tasks-status");

  if (selected == "")
  {
    percent = "20%"
    // delete button
    delete_button.style.opacity = percent;
    delete_button.setAttribute("onmousedown", null);
    // stable button
    btnStable.style.opacity = percent;
    btnStable.setAttribute("onmousedown", null);
  }
  else
  {
    // delete button
    delete_button.style.opacity = "100%";
    delete_button.setAttribute("onmousedown", "delete_product()");
    // stable button
    btnStable.style.opacity = "100%";
    btnStable.setAttribute("onmousedown", "show_confirmation_canvas(),append_selected_product_information_for_confirmation()");
  };
};



// append product information for purchase panel
function append_selected_product_information_for_confirmation()
{
  find_product_label_and_price(focused_product,confirmation_label);
};

// ########################## PRODUCT ########################## //



















// ########################## TRACK ########################## //

"use strict";


var selected_label = ""
var selected_price = 0
var comment = ""
// for deleting block
var selected_block = ""
// original
var original_price = 0;
// total
var total = 0;



// ...................append product profile...................
function find_product_label_and_price(productName,productPrice,currency)
{
    var confirm_label, confirm_price; // declare variable

    confirm_label = document.getElementById("confirmation-label")
    confirm_price = document.getElementById("confirmation-price")

	// load notification
	loading_notification("Creating product's name & price...");

    if(selected_label != "" && selected_price != 0)
    {
        confirm_label.innerHTML = selected_label;
        confirm_price.innerHTML = selected_price;

		// load notification hide
		loading_notification("");
    }
    else
    {
        confirm_label.innerHTML = "Error loading label!";
        confirm_price.innerHTML = "Error loading price!";
    }
};



// ...................find selected product...................
function selected_Element_id_for_purchase(clicked_id)
{
  var label, labelID, price, priceID; // declare variable

  label = document.getElementById(clicked_id);
  labelID = label.getAttribute("id");

  selected_label = labelID;

  price = document.getElementById("price-"+selected);
  priceID = price.innerHTML;

  selected_price = priceID
  // original
  original_price = priceID
};



// ..............display stable purchase confirmation canvas..............
function show_confirmation_canvas()
{
    var canvas, element, page1, page2, page3, page4 // declare variable

    page1 = document.getElementById("workboard-stable-canvas");
    page2 = document.getElementById("workboard-fickle-canvas");
    page3 = document.getElementById("workboard-team-canvas");
    page4 = document.getElementById("workboard-trash-canvas");

    canvas = document.getElementById("income-confirmation-container")
    element = document.getElementById("sell-confirmation-button")

    // wait until price is set correctly
    var price_scantime = setInterval(scan_if_selected_price_is_set)
    function scan_if_selected_price_is_set()
    {
    	// load notification
    	loading_notification("Creating product's price...");

        if ( original_price == selected_price)
        {
          // show income page
            page1.style.display = "block";
            page2.style.display = "none";
            page3.style.display = "none";
            page4.style.display = "none";

            // show sell canvas
            canvas.style.display = "block";

            // focus on Confirm button
            if (element != null)
            {
              element.focus()
            }
            clearInterval(price_scantime);


            // load notification hide
            loading_notification("");
        }
        else
        {
        	// load nofication hide
            loading_notification("");
            // hide sell canvas
            canvas.style.display = "none";
        }
    }
};


function hide_confirmation_canvas()
{
    var canvas, comment, confirm_comment; // declare variable

    canvas = document.getElementById("income-confirmation-container")
    confirm_comment = document.getElementById("confirmation-comment")

    canvas.style.display = "none";
    confirm_comment.value = "";
};



// unlock or lock current price
var price_key_state = "Unlock"

setInterval(key_button_auto_inner_text)
function key_button_auto_inner_text()
{
    var key_button //declare variable

    key_button = document.getElementById("price_key_button")

    key_button.innerHTML = price_key_state;
}



function unlock_lock_price()
{
    var price_to_change, key_button //declare variable

    price_to_change = document.getElementById("confirmation-price")
    key_button = document.getElementById("price_key_button")

    if (price_key_state == "Unlock")
    {
        price_key_state = "Lock";
        // unlock price
        price_to_change.setAttribute("contenteditable", "true");
        price_to_change.style.cursor = "text";
        key_button.setAttribute("lang", "Lock price for stable price ( recommended )");
    }
    else
    {
        price_key_state = "Unlock";
        // lock price
        price_to_change.setAttribute("contenteditable", "False");
        price_to_change.style.cursor = "context-menu";
        key_button.setAttribute("lang", "Unlock price for custom price");
    }

    // set inner text
    key_button.innerHTML = price_key_state;
}



// current price
setInterval(modify_current_price)
function modify_current_price()
{
    var price, confirmation_price; //declare variable

    price = document.getElementById("stable-purchase-price");
    confirmation_price = document.getElementById("confirmation-price");

    if (isNaN(confirmation_price.innerHTML))
    {
        notification("Warning!","You can only use numbers for product's price.")
        confirmation_price.innerHTML = selected_price;
    }
};



setInterval(confirmation_is_current_price)
function confirmation_is_current_price()
{
    var price, confirmation_price; //declare variable

    price = document.getElementById("confirmation-price");

    original_price = price.innerHTML;
}



setInterval(auto_confirmation_price_color)
function auto_confirmation_price_color()
{
    var price, title; //declare variable

    price = document.getElementById("confirmation-price");
    title = document.getElementById("confirmation-price-title");

    if (price.innerHTML != selected_price)
    {
        title.innerHTML = "Price Org. "+currency+selected_price;
        price_state = "Org. "+currency+selected_price;
    }
    else
    {
        title.innerHTML = "Price";
        price_state = "";
    }
};




// price amount color
var cl = ""
// is price changed
var price_state = ""



// ............................. track income .............................
var block_counter = 0

function stable()
{
    var page1, page2, page3, page4, confirm_comment, product_Parent, result, price_to_change; // declare variable

    page1 = document.getElementById("workboard-stable-canvas");
    page2 = document.getElementById("workboard-fickle-canvas");
    page3 = document.getElementById("workboard-team-canvas");
    page4 = document.getElementById("workboard-trash-canvas");
    confirm_comment = document.getElementById("confirmation-comment")

    // check if confirmation comment is empty
    if (confirm_comment.value == "")
    {
        confirm_comment.value = "There is no note for this payment...";
    }

	// load notification
	loading_notification("Selling product...");

    // create new element
    product_Parent = document.createElement("stable-deal");
    // stable page append element
    page1.appendChild(product_Parent);
    // insert text into element
    product_Parent.innerHTML = "<div id=\"stable-"+selected_label+"\""+""+" class='stable-block'> <main-group> <h5 id='stable-purchase-label' class='stable-purchase-label'>"+selected_label+"</h5>     <h5 id='product-currency-symbol' class='w3-text-green' style='margin: 0px -24px 0px 10px;'>"+currency+"</h5>     <h5 style=\"color:"+cl+"\""+""+" id='stable-purchase-price' class='stable-purchase-price w3-text-green'>"+original_price+"</h5> </main-group>        <main-second-group>   <h5 class='stable-purchase-time'>31 December, 13:47</h5> <img class='income-product-detail-button' src='source/icon/icon_comment.png' onmousedown='show_hide_comment(this.name)' name=\"stable-comment-"+selected_label+block_counter+"\""+""+" onmouseover='show_tooltip(this.lang)'' onmouseleave='hide_tooltip()' lang='Toogle comment'>   <hr id='Y-seperator' style='margin: 0px 0px 0px 3px;'>   <h5 id='price-state-title'>"+price_state+"</h5></main-second-group>       <main-third-group> <h5 class='stable-purchase-comment' id=\"stable-comment-"+selected_label+block_counter+"\""+""+">"+confirm_comment.value+"  <div class='comment-text-manipulation'><h5 class='comment-text-manipulation-button'>Line 4,Word 23</h5></div>  </h5> </main-third-group>    </div>";
    // increment block counter
    block_counter++;
    // set ID for product parent element
    product_Parent.setAttribute("id", "income-"+selected_label+"-"+original_price+"-"+block_counter);
    product_Parent.setAttribute("oncontextmenu", "selected_stable_block_ID(this.id),show_hide('income-context-menu', 'block','income-context-menu')");
    product_Parent.setAttribute("onfocus", "selected_stable_block_ID(this.id)");
    product_Parent.setAttribute("name", selected_label);
    product_Parent.setAttribute("price", original_price);
    // insert product before firstchild
    page1.insertBefore(product_Parent, page1.firstChild);
    // lock price
    price_key_state = "Unlock";
    price_to_change = document.getElementById("confirmation-price")
    price_to_change.setAttribute("contenteditable", "False");
    price_to_change.style.cursor = "context-menu";
    // hide confirmation panel after selling stable
    hide_confirmation_canvas();

    // display income track page and hide other pages
    page1.style.display = "block";
    page2.style.display = "none";
    page3.style.display = "none";
    page4.style.display = "none";

  	// load notification hide
  	loading_notification("");
};



// show and hide stable purchase comment
function show_hide_comment(id)
{
    var comment; //declare variable

    comment = document.getElementById(id);

    if (comment.style.display != "flex")
    {
        comment.style.display = "flex";
    }
    else
    {
        comment.style.display = "none";
    }
}



var selected_block_name = ""
var selected_block_price = ""

function delete_stable_block()
{
    var block, canvas, disapproved_element, element_after; // declare variable

    block = document.getElementById(selected_block)
    canvas = document.getElementById("workboard-stable-canvas")

    // create element
    disapproved_element = document.createElement("disapproved-parent")
    // append created element
    canvas.appendChild(disapproved_element);
    // innerHTML
    disapproved_element.innerHTML = "<disapproved class='disapproved-income-block'> Disapproved <span class='disapproved-product-title'>"+selected_block_name+"</span> and  <span class='disapproved-product-price'>"+currency+selected_block_price+"</span> is removed from your Total </disapproved>"
    // append position
    element_after = document.getElementById(selected_block)
    canvas.insertBefore(disapproved_element, element_after)
    // remove child
    canvas.removeChild(block);
};

// event position context menu
setInterval(income_contextmenu_position)
function income_contextmenu_position(event)
{
  var context, x, y;

  context = document.getElementById("income-context-menu");

  // x = mouse.clientX;
  // y = mouse.clientY;

  if ( context.style.display == 'block')
  {
    context.style.top = y+"px";
    context.style.left = x+"px";
  }
  else
  {
    null;
  }
}



// find id of the selected product
function selected_stable_block_ID(id)
{
  var block, blockID, blockNAME, blockPRICE; // declare variable

  block = document.getElementById(id);
  blockID = block.getAttribute("id");
  blockNAME = block.getAttribute("name");
  blockPRICE = block.getAttribute("price");

  // set selected id
  selected_block = blockID;
  selected_block_name = blockNAME;
  selected_block_price = blockPRICE;
};

// ########################## TRACK ########################## //



































// ########################## DETAIL STATUS CONTEXTMENU ########################## //
function toogle_zar_dollar()
{
  var usd, zar, btn;

  usd = "$";
  zar = "R";
  btn = document.getElementById("currency-toogle");

  if (currency == "R")
  {
    currency = "$";
    btn.innerHTML = "Currency [ USD ]";
  }
  else if (currency == "$")
  {
    currency = "R";
    btn.innerHTML = "Currency [ ZAR ]";
  }
}
// ########################## DETAIL STATUS CONTEXTMENU ########################## //



















// ########################## PAGES ########################## //

// __________PAGE 1 child__________

"use strict";


function delete_stable(parentID)
{
	var elem // declare variable

	elem = document.getElementById("parent-stable-"+parentID)

	elem.style.display = "none"
}

// __________PAGE 1 child__________





// __________PAGE TEAM PROFILE child__________

function create_profile_canvas()
{
	var parent_canvas, container, user_name, user_lastname, user_birth, user_id, user_position; //declare variable

  user_name = document.getElementById("profile-user-name");
  user_lastname = document.getElementById("profile-user-lastname");
  user_birth = document.getElementById("profile-user-birth");
  user_id = document.getElementById("profile-user-id");
  user_position = document.getElementById("profile-user-position");

  // team profile container
	container = document.getElementById("contacts-containter");

	if ( user_name.value == "" | user_lastname == "" )
  {
    console.log("Name and Lastname required");
  }
  else if (user_birth == "")
  {
    console.log("Date of birth should be numbers");
  }
  else if (user_id.value == "")
  {
    console.log("Id number not available")
  }
  else if (user_position.value == "")
  {
    console.log("position not available")
  }
  else
  {
    parent_canvas = document.createElement("parent-profile");
    container.appendChild(parent_canvas);
    // innerHTML
    parent_canvas.innerHTML = "<div id='profile-block'><h5 class='user-name'>"+user_name.value+"</h5><h5 class='user-lastname'>"+user_lastname.value+"</h5><h5 class='user-birth'>"+user_birth.value+"</h5><h5 class='user-id'>"+user_id.value+"</h5><h5 class='user-position'>"+user_position.value+"</h5></div>";

    // create list notification
    create_notification_list("New Profile", " '"+user_name.value+" - "+user_lastname.value+"' ", user_position.value);
  }
}

// __________PAGE TEAM PROFILE child__________

// ########################## PAGES ########################## //


















// ########################## STATUS ########################## //




// count products amount
setInterval(count_Products)
function count_Products()
{
  var parent1, parent2, parent3_disapproved, parent4_folder, num, num2, income_cnt, product_cnt; // declare variable

  parent1 = document.getElementsByTagName("task");
  parent2 = document.getElementsByTagName("stable-deal");
  parent3_disapproved = document.getElementsByTagName("disapproved-parent");
  parent4_folder = document.getElementsByTagName("folder");
  
  income_cnt = document.getElementById("income-amount")
  product_cnt = document.getElementById("products-amount")

  // length number
  num = parent4_folder.length+' Product '+parent1.length+' - '+' Folder'
  num2 = parent3_disapproved.length+' Approved '+parent2.length+' - '+' Disapproved'

  if (income_cnt.innerHTML == num2 && product_cnt.innerHTML == num)
  {
    clearInterval(count_Products)
  }
  else
  {
    product_cnt.innerHTML = num
    income_cnt.innerHTML = num2
    setInterval(count_Products)
  }
};




// ________list notification________

function clear_list_notification()
{
	var container;

	container = document.getElementById("notification-list-container")

	if (container.innerHTML !== "")
	{
		container.innerHTML = "";
		console.log(container.innerHTML)
	}
	else
	{
		notification("Notice!","Notification container is already empty.")
	}
}


// ________list notification________

// ########################## STATUS ########################## //