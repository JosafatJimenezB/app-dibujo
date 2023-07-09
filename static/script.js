const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const colorPicker = document.getElementById("colorPicker");

let isDrawing = false;

function resizeCanvas() {
  canvas.width = canvas.offsetWidth * window.devicePixelRatio;
  canvas.height = canvas.offsetHeight * window.devicePixelRatio;

  context.scale(window.devicePixelRatio, window.devicePixelRatio);

  draw();
}

function startDrawing(e) {
  isDrawing = true;
  draw(e);
}

function stopDrawing() {
  isDrawing = false;
  context.beginPath();
}

function draw(e) {
  if (!isDrawing) return;
  context.lineWidth = 5;
  context.lineCap = "round";
  context.strokeStyle = colorPicker.value;
  context.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
  context.stroke();
}

function clearCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function saveImage() {
  const imageData = canvas.toDataURL();
  fetch("/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "imageData=" + encodeURIComponent(imageData),
  }).then((response) => {
    if (response.ok) {
      document.getElementById("downloadJPG").href = "/download/drawing.jpg";
      document.getElementById("downloadPNG").href = "/download/drawing.png";
      document.getElementById("downloadJPG").style.display = "inline-block";
      document.getElementById("downloadPNG").style.display = "inline-block";
    }
  });
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseout", stopDrawing);
