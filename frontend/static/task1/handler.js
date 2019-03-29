class Handler{
	constructor(){
      this.render=this.render.bind(this);
      this.scene=new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(45, 2, 0.1, 10000);
      this.renderer="";
      this.controls="";
      this.obj="";
      this.directionalLight=new THREE.DirectionalLight(0xFFFFFF, 1);//color, intensity;
  }
  startWebGl1(obj){
      this.scene.background = new THREE.Color('#BBDEFB');
      let canvas = document.querySelector("#webGl1");
      this.renderer = new THREE.WebGLRenderer({canvas:canvas});
      this.obj=obj;
      this.continue();
  }
  startWebGl2(obj){
    this.scene.background = new THREE.Color('#BBDEFB');
    let canvas = document.querySelector("#webGl2");
    let context = canvas.getContext('webgl2');
    this.renderer = new THREE.WebGLRenderer( { canvas: canvas, context: context } );
    this.obj=obj;
    this.continue();
  }
  continue(){
    this.camera.position.set(0, 10, 20);

    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    this.controls.target.set(0, 5, 0);
    this.controls.zoomSpeed = 2;
    this.controls.update();
  
    this.directionalLight.position.set(0, 10, 0);
    this.directionalLight.target.position.set(-5, 0, 0);
    this.scene.add(this.directionalLight);
    this.scene.add(this.directionalLight.target);

    let objLoader=new THREE.OBJLoader2().parse(this.obj);
    this.scene.add(objLoader);

    let loader = new THREE.FontLoader();
    
    loader.load( "/static/three.js-dev/examples/fonts/gentilis_bold.typeface.json",  ( font ) =>{
      this.addText("Hi :D",font);
    } );
    requestAnimationFrame(this.render);
  }
  addText(text,font){
    let textGeo = new THREE.TextGeometry( text, {
      font: font,
      size: 70,
      height: 20,
      curveSegments: 4,
      bevelThickness: 2,
      bevelSize: 1.5,
      bevelEnabled: true
    } );
    textGeo.computeBoundingBox();
    textGeo.computeVertexNormals();

    let materials = [
      new THREE.MeshPhongMaterial( { color: "#F48FB1"} ), // front
      new THREE.MeshPhongMaterial( { color: "#F48FB1" } ) // side
    ];
    textGeo = new THREE.BufferGeometry().fromGeometry( textGeo );
    let textMesh = new THREE.Mesh( textGeo, materials );
    textMesh.position.y = 200;
    textMesh.position.z = 0;
    textMesh.rotation.y = Math.PI/2;
    this.scene.add(textMesh);
  }
  render(){
    const canvas = this.renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      this.renderer.setSize(width, height, false);
      const canvas = this.renderer.domElement;
      this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
      this.camera.updateProjectionMatrix();
    }
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.render);
  }
}

let handler1=new Handler();
let handler2=new Handler();

fetch("",{method:"POST"})
    .then((resp)=>{
        return resp.text()
    })
    .then((obj)=>{
      handler1.startWebGl1(obj);
      handler2.startWebGl2(obj);
})