
const ARC_SEGMENTS = 200;

class Handler{
  constructor(){
    this.render=this.render.bind(this);
    this.scene=new THREE.Scene();
    this.point=new THREE.Vector3();
    this.camera=new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );
    this.renderer = "";
    this.controls="";
    this.positions=[];
    this.data={};
    this.geometry = new THREE.BufferGeometry();
    this.cubes=new THREE.BoxBufferGeometry( 3, 3, 3 );
    this.curve="";
  }
  async start(){
    this.camera.position.set( 0, 250, 1000 );
    this.scene.background = new THREE.Color( 0xf0f0f0 );
    this.scene.add(this.camera);

    let canvas = document.querySelector("#webGl2");
    let context = canvas.getContext('webgl2');
    this.renderer = new THREE.WebGLRenderer( { canvas: canvas, context: context } );
    this.renderer.setSize( window.innerWidth, window.innerHeight );

    let grid = new THREE.GridHelper( 3000, 100 ,0x444444,"red");
    grid.position.y = 0;
    grid.position.x = 0;
    grid.position.z = 0;
    grid.material.opacity = 0.25;
    grid.material.transparent = true;
    this.scene.add( grid );

    let grid2 = new THREE.GridHelper( 3000, 100,0x444444,"blue" );
    grid2.position.y = 0;
    grid2.position.x = 0;
    grid2.position.z = 0;
    grid2.material.opacity = 0.25;
    grid2.material.transparent = true;
    grid2.rotation.z = Math.PI / 2;
    this.scene.add( grid2 );

    let grid3 = new THREE.GridHelper( 3000, 100,0x444444,"black" );
    grid3.position.y = 0;
    grid3.position.x = 0;
    grid3.position.z = 0;
    grid3.material.opacity = 0.25;
    grid3.material.transparent = true;
    grid3.rotation.x = Math.PI / 2;
    this.scene.add( grid3 );
    

    this.controls = new THREE.OrbitControls( this.camera, canvas );
    this.controls.target.set(0, 5, 0);
    this.controls.update();
    await this.fetchData();
    for ( let k in this.data ) {
      let data=this.data[k];
      if (data.X!=-1){
        console.log(data);
        let object= this.newObject(data.X,data.Y,data.Z);
        this.positions.push(object.position);
      }
    }
    //not much information about trayectory becomes very ugly, uncomment below to see
   /* this.geometry.addAttribute( 'position', new THREE.BufferAttribute( new Float32Array( ARC_SEGMENTS * 3 ), 3 ) );
    
    this.curve = new THREE.CatmullRomCurve3( this.positions );
    this.curve.curveType = 'centripetal';
    this.curve.mesh = new THREE.Line( this.geometry.clone(), new THREE.LineBasicMaterial( {
      color: "blue",
    } ) );
    this.scene.add( this.curve.mesh);

    this.updateSplineOutline();*/
    requestAnimationFrame(this.render);
  }
  newObject(x,y,z){
      let material = new THREE.MeshBasicMaterial( { color: Math.random() * 0xffffff } );
      let object = new THREE.Mesh( this.cubes, material );
      object.position.x = x;
      object.position.y = y;
      object.position.z = z;
      object.scale.set(4,4,4);
      this.scene.add( object );
      return object
  }
  updateSplineOutline() {
    let spline = this.curve;
    let splineMesh = spline.mesh;
    let position = splineMesh.geometry.attributes.position;
    for ( let i = 0; i < ARC_SEGMENTS; i ++ ) {
      let t = i / ( ARC_SEGMENTS - 1 );
      spline.getPoint( t, this.point );
      position.setXYZ( i, this.point.x, this.point.y, this.point.z );
    }
    position.needsUpdate = true;
  }
 async fetchData(){
    await fetch("",{method:"POST"})
    .then((resp)=>{
        return resp.json()
    })
    .then((me)=>{
      this.data=me;
    })
  }
  render() {
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

let handler =new Handler();
handler.start();
