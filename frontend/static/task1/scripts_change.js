let canvas1=document.querySelector("#webGl1");
let canvas2=document.querySelector("#webGl2");
let switcher=document.querySelector(".switched select");
let active=canvas1;
switcher.addEventListener("input",()=>{
    if(switcher.value=="2"){
        canvas1.style.display="none";
        canvas2.style.display="flex";
        active=canvas2;
    }else{
        canvas1.style.display="flex";
        canvas2.style.display="none";
        active=canvas1;
    }
});
let horizontal=document.querySelector(".sizeWrapper .horizontal");
let vertical=document.querySelector(".sizeWrapper .vertical");

let activeSize=active.getBoundingClientRect();
let vwR=(activeSize.width/document.body.clientWidth)*100;
let vhR=(activeSize.height/document.body.clientHeight)*100;

horizontal.value=vwR;
vertical.value=vhR;
horizontal.addEventListener("input",()=>{
    active.style.width=horizontal.value+"vw";
});
vertical.addEventListener("input",()=>{
    active.style.height=vertical.value+"vh";
});