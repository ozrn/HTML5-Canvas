const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d'); // context is where we draw. It can be either 2D or 3D
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.strokeStyle = '#BADA55'; // start color
ctx.lineJoin = 'round'; // when a line meet with another line, it will be round
ctx.lineCap = 'round'; // the end of the line will be round too
ctx.lineWidth = 100;


let isDrawing = false; // it allows only when thr cursor is down!
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

function draw(e) {
  if (!isDrawing) return; // stop the fn from running when they are not moused down
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  ctx.beginPath();

  ctx.moveTo(lastX, lastY); // start from

  ctx.lineTo(e.offsetX, e.offsetY); // go to
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];

  hue++;
  if (hue >= 360) {
    hue = 0;
  }
  if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
    direction = !direction; // flip the direction
  }

  if (direction) {
    ctx.lineWidth++;
  } else {
    ctx.lineWidth--;
  }

}

canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY]; // destructuring an array
});


canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);
