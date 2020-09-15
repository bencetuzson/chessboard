const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const setup = {
    size: 100,
    row: 8,
    column: 8,
    edge: 10,
    border: true,
    regular_board: true
}

let windowSize = {
    width: setup.edge*2+setup.column*setup.size,
    height: setup.edge*2+setup.row*setup.size
}

let cout;

let rowIndex = 0;
let columnIndex = 0;
let rowCode = 0;
let columnCode = 0;

let to = {
    x: setup.edge,
    y: setup.edge
}

let colours = {
    b: "#000000",
    w: "#ffffff"
}

let colour;

canvas.width = windowSize.width+2*setup.edge;
canvas.height = windowSize.height+2*setup.edge;

try{
    const win = nw.Window.get();
    win.resizeTo(windowSize.width, windowSize.height);
} catch(error){}

if (setup.regular_board) {
    colour = {
        0: colours.b,
        1: colours.w
    }
} else {
    colour = {
        0: colours.w,
        1: colours.b
    }
}

ctx.beginPath();
ctx.moveTo(to.x, to.y);

for (let i = 0; i < setup.row; i++) {
    ++rowIndex;
    rowCode = rowIndex % 2;
    for (let i = 0; i < setup.column; i++) {
        ctx.beginPath();
        ++columnIndex;
        columnCode = columnIndex % 2;
        ctx.lineWidth = 0;
        ctx.rect(to.x, to.y, setup.size, setup.size);
        ctx.fillStyle = colourPick(cout = oddeven() % 2);
        ctx.fill();
        console.log(cout);
        console.log(ctx.fillStyle);
        to.x += setup.size;

    }
    to.x = setup.edge;
    to.y += setup.size;
}
if (setup.border) {
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#000000";
    ctx.rect(setup.edge-1, setup.edge-1, setup.column*setup.size+2, setup.row*setup.size+2);
}
ctx.stroke();

function colourPick (result){
    return colour[result];
}

function oddeven() {
    switch (setup.column % 2) {
        case 0:
            return columnCode+rowCode;
        case 1:
            return columnCode;
    }
}
