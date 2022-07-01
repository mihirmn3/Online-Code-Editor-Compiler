function update(obj_txt) {
  obj_txt = document.getElementById("editing");
  let text = obj_txt.value;
  let result_element = document.querySelector("#highlighting-content");
  // Handle final newlines
  if (text[text.length - 1] == "\n") {
    text += " ";
  }
  // Update code
  result_element.innerHTML = text
    .replace(new RegExp("&", "g"), "&amp;")
    .replace(new RegExp("<", "g"), "&lt;"); /* Global RegExp */
  // Syntax Highlight
  Prism.highlightElement(result_element);
  obj_rownr =
    obj_txt.parentElement.parentElement.getElementsByTagName("textarea")[0];
  cntline = count_lines(obj_txt.value);
  if (cntline == 0) cntline = 1;
  tmp_arr = obj_rownr.value.split("\n");
  cntline_old = parseInt(tmp_arr[tmp_arr.length - 1], 10);
  // if there was a change in line count
  if (cntline != cntline_old) {
    obj_rownr.value = "1";
    obj_rownr.cols = cntline.toString().length; // new width of txt_rownr
    for (let i = 2; i <= cntline; i++) {
      obj_rownr.value += "\n" + i.toString();
    }
    sync_scroll(obj_txt);
  }
  selectionchanged(obj_txt);
}
function count_lines(str) {
  let x = str.split("\n");
  return x.length;
}
function sync_scroll(obj_txt) {
  /* Scroll result to scroll coords of event - sync with textarea */
  let result_element = document.querySelector("#highlighting");
  // Get and set x and y
  result_element.scrollTop = obj_txt.scrollTop;
  result_element.scrollLeft = obj_txt.scrollLeft;

  obj_rownr =
    obj_txt.parentElement.parentElement.getElementsByTagName("textarea")[0];
  obj_rownr.scrollTop = obj_txt.scrollTop;
}

function selectionchanged(obj) {
  var substr = obj.value.substring(0, obj.selectionStart).split("\n");
  var row = substr.length;
  var col = substr[substr.length - 1].length;
  var tmpstr =
    "Current position: (" + row.toString() + "," + col.toString() + ")";
  // if selection spans over
  if (obj.selectionStart != obj.selectionEnd) {
    substr = obj.value
      .substring(obj.selectionStart, obj.selectionEnd)
      .split("\n");
    row += substr.length - 1;
    col += substr[substr.length - 1].length;
    tmpstr += " - (" + row.toString() + "," + col.toString() + ")";
    tmpstr +=
      " (" +
      obj.value.substring(obj.selectionStart, obj.selectionEnd).length +
      " Selected)";
  }
  document.getElementById("sel_in").value = tmpstr;
}

function keyup(obj, e) {
  if (e.keyCode >= 33 && e.keyCode <= 40)
    // arrows ; home ; end ; page up/down
    selectionchanged(obj, e.keyCode);
}

function check_tab(element, event) {
  let code = element.value;
  if (event.key == "Tab") {
    /* Tab key pressed */
    event.preventDefault(); // stop normal
    let before_tab = code.slice(0, element.selectionStart); // text before tab
    let after_tab = code.slice(element.selectionEnd, element.value.length); // text after tab
    let cursor_pos = element.selectionStart + 1; // where cursor moves after tab - moving forward by 1 char to after tab
    element.value = before_tab + "\t" + after_tab; // add tab char
    // move cursor
    element.selectionStart = cursor_pos;
    element.selectionEnd = cursor_pos;
    update(element.value); // Update text to include indent
  }
}

function transfer() {
  let text = document.getElementById("editing").value;
  let codetext = document.getElementById("codetext");
  codetext.value = text;

  let text1 = document.getElementById("input-text").value;
  let inputtext = document.getElementById("inputtext");
  inputtext.value = text1;
}

function transfer2() {
  let text = document.getElementById("editing").value;
  let codetext = document.getElementById("code");
  codetext.value = text;
}





