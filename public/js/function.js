function test(data){
	console.log('scrollFunction Fired');
  var scroller = document.getElementsByClassName('famous-group');

  stylesman = window.getComputedStyle(scroller[0], null);

  tr = stylesman.getPropertyValue("-webkit-transform").replace('matrix(1, 0, 0, 1, 0,','').replace(')','');

  var distanceTop = -(parseInt(tr));

  var sections = document.getElementsByClassName('section'); 
  
	sections[3].style.backgroundPosition="50% "+distanceTop+"px";
	sections[4].style.backgroundPosition="50% "+(-(window.innerHeight)+distanceTop)+"px";

  if(distanceTop >= window.innerHeight){
    sections[3].style.backgroundPosition="50% "+window.innerHeight+"px";
		sections[4].style.backgroundPosition="50% "+distanceTop-window.innerHeight+"px";
	}
};