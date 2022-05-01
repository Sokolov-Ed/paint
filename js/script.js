let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let colorSelectors = $("#content__color-selectors");
let paintBrushSize, color = "black", isDrawCircle = true;

function sizePic(value) {
	paintBrushSize = value;
}

for(let i = 0; i < colorSelectors.children().length; i++){
	colorSelectors.children()[i].style.backgroundColor = colorSelectors.children()[i].id;
}

$('.circle_type').mousedown(e => {
	switchBrushType(true);
});

$('.square_type').mousedown(e => {
	switchBrushType(false);
});

function switchBrushType(setDrawCircle){
	isDrawCircle = setDrawCircle;
	if(setDrawCircle){
		$('.circle_type').addClass('selector_active');
		$('.square_type').removeClass('selector_active');
	}
	else{
		$('.square_type').addClass('selector_active');
		$('.circle_type').removeClass('selector_active');
	}
}

colorSelectors.mousedown(e => {
	if(e.target.closest('Li')){
		color = e.target.id;
		$('.circle_type').css('background-color', color);
		$('.square_type').css('background-color', color);
		for(let i = 0; i < colorSelectors.children().length; i++){
			if(colorSelectors.children()[i].id === e.target.id)
				$(colorSelectors.children()[i]).addClass('selector_active');
			else
				$(colorSelectors.children()[i]).removeClass('selector_active');
		}
	}
})

function drawCircle(x, y, radius = 10){	
	ctx.beginPath();
	ctx.fillStyle = color && color;
	ctx.arc(x, y, radius, 0, Math.PI * 2, false);
	ctx.fill();
	ctx.closePath();
}

function drawSquare(x, y, size = 10){
	ctx.beginPath();
	ctx.fillStyle = color && color;
	ctx.fillRect(x - (size / 2), y - (size / 2), size, size);
	ctx.fill();
	ctx.closePath();
}

$("#canvas").mousemove((e) => {
	if(e.buttons > 0) {
		if(isDrawCircle)
			drawCircle(e.offsetX, e.offsetY, paintBrushSize);
		else
			drawSquare(e.offsetX, e.offsetY, paintBrushSize);
	};
});
$("#canvas").mousedown((e) => {
	if(isDrawCircle)
		drawCircle(e.offsetX, e.offsetY, paintBrushSize);
	else
		drawSquare(e.offsetX, e.offsetY, paintBrushSize);
});
$("#canvas_clear").mousedown(() => {
	ctx.beginPath();
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, 900, 600);
	ctx.fill();
	ctx.closePath();
});

$("#canvas").on("touchmove", (e) => {
	let rect = e.target.getBoundingClientRect();
	let x = Math.ceil(e.originalEvent.touches[0].clientX - rect.left);
	let y = Math.ceil(e.originalEvent.touches[0].clientY - rect.top);
	if(isDrawCircle)
		drawCircle(x, y, paintBrushSize);
	else
		drawSquare(x, y, paintBrushSize);
});