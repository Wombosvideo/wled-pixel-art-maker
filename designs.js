var input_rows;
var input_cols;
var input_color = "#000000";

function makeGrid() {
  var table = document.getElementById("pixel_canvas");
  table.innerHTML = "";
  while(table.rows.length > 0)
    table.deleteRow(0);
  input_rows = document.getElementById("input_height").value;
  input_cols = document.getElementById("input_width").value;
  for (var i = 0; i < input_rows; i++) {
    var row_elem = table.insertRow(i);
    row_elem.setAttribute("class", "row");
    for (var j = 0; j < input_cols; j++) {
      var cell= row_elem.insertCell(j);
      cell.addEventListener('click', function(evt) {
        evt.target.style.backgroundColor = document.getElementById("colorPicker").value;
        this.style.borderColor="#9ecaed";
        this.style.boxShadow="0 0 10px #9ecaed";
      });
    }
  }
  return false;
}

// Generate WLED JSON code for the current grid
function generateWLED() {
  const rgba2hex = (rgba) => `${rgba.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.{0,1}\d*))?\)$/).slice(1).map((n, i) => (i === 3 ? Math.round(parseFloat(n) * 255) : parseFloat(n)).toString(16).padStart(2, '0').replace('NaN', '')).join('')}`
  var table = document.getElementById("pixel_canvas");
  var output = `{"on":true,"bri":100,"seg":{"i":[`;
  for (var i = 0; i < input_rows; i++) {
    for (var j = 0; j < input_cols; j++) {
      var cell = table.rows[i].cells[j];
      var color = cell.style.backgroundColor;
      if (color == "") {
        color = "rgb(0, 0, 0)";
      }
      color = rgba2hex(color);
      output += `''${color}''`;
      if (i != input_rows - 1 || j != input_cols - 1) {
        output += ",";
      }
    }
  }
  output += `]}}`;
  document.getElementById("wled_json").innerHTML = output;
}

document.getElementById("sizePicker").addEventListener("submit", function(evt) {
  evt.preventDefault();
  makeGrid();
});

document.getElementById("generate_wled").addEventListener("click", function(evt) {
  evt.preventDefault();
  generateWLED();
});
