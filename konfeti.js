// Basit konfeti efekti (canvas ile)
function konfetiPatlat() {
    if (document.getElementById('konfeti-canvas')) return;
    const canvas = document.createElement('canvas');
    canvas.id = 'konfeti-canvas';
    canvas.style.position = 'fixed';
    canvas.style.left = '0';
    canvas.style.top = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9999';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    const konfeti = [];
    const renkler = ['#f59e42','#2563eb','#60a5fa','#fbbf24','#e63946','#43aa8b','#ffd166','#8338ec'];
    for(let i=0;i<120;i++){
        konfeti.push({
            x: Math.random()*canvas.width,
            y: Math.random()*-canvas.height,
            r: Math.random()*7+4,
            d: Math.random()*canvas.height/2+canvas.height/2,
            color: renkler[Math.floor(Math.random()*renkler.length)],
            tilt: Math.random()*10-5,
            tiltAngle: Math.random()*Math.PI*2,
            speed: Math.random()*2+2
        });
    }
    let frame=0;
    function draw(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        konfeti.forEach(k=>{
            ctx.beginPath();
            ctx.ellipse(k.x,k.y,k.r,k.r/2,k.tiltAngle,0,2*Math.PI);
            ctx.fillStyle=k.color;
            ctx.fill();
        });
    }
    function update(){
        konfeti.forEach(k=>{
            k.y+=k.speed;
            k.x+=Math.sin(frame/10+k.tilt)*2;
            k.tiltAngle+=0.05;
            if(k.y>canvas.height){
                k.y=Math.random()*-40;
                k.x=Math.random()*canvas.width;
            }
        });
        frame++;
    }
    let interval = setInterval(()=>{
        draw();
        update();
    },16);
    setTimeout(()=>{
        clearInterval(interval);
        canvas.remove();
    },3500);
}
