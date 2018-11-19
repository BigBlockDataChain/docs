/**
 *
 */
function setup(){
	var canvas = createCanvas(200,200);
	background(0);
	//canvas.drop(gotFile);
	//dropzone = select('#dropzone');
	//dropzone.dragOver(highlight);
	//dropzone.dragLeave(unhighlighted);
	//dropzone.drop(gotFile, unhighlighted);
	canvas.drop(gotImage);
}
/*function gotFile(file){
	createP(file.name + "" +file.size);
	var img = createImg(file.data);
	img.size(100,100);
}*/
/*function highlight(){
	dropzone.style('background-color','#ccc');
}
function unhighlighted(){
	dropzone.style('background-color','#fff');
}*/
function gotImage(file){
	createP(file.name + " " + file.size);
	var img = createImg(file.data);
	img.size(800,800);
	image(img, 15, 15, 170, 170);
}
//function gotTxt(file){}
