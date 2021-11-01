console.log('KRYPTOBITZ - Server on.')
const fs = require("fs");
const myArgs = process.argv.slice(2); //CMD LINE args. Split by space into Array;
const { createCanvas, loadImage} = require("canvas");
const {layers, width, height, editionNum, BITZSET, totalCARDZ, METANET} = require('./config1.js')

const canvas = createCanvas(width,height)
const ctx = canvas.getContext("2d")

let dateStamp = `00000${Date.now()}`;
const rootPATH = __dirname; //C:\PROJECTS\VSCODE_PROJECTS\KRYPTOBITZ
const edition = (editionNum) ? editionNum : 1; ; //ARG, number of sets of krypto BITZ
// totalCARDZ = (totalCARDZ) ? totalCARDZ : 1; ; //ARG, number of sets of krypto BITZ
let hash = []; //be able to rebuild img from hash.
let metadata = [];
let attributes = [];
let decodedHash = [];

// const edition = (myArgs.length > 0) ? Number(myArgs[0]) : 1; ; //ARG, number of sets of krypto BITZ
// const edition = 1; //number of sets of krypto BITZ
function saveLayer(_canvas, _edition){ //WHERE TO SAVE KRYPTOBIT-.
    // fs.writeFileSync("./output1/newImage.png",_canvas.toBuffer("image/png"))
    const outputPATH = "./output1"
    // fs.writeFileSync(`${outputPATH}/kbz_${dateStamp+_edition}.png`,_canvas.toBuffer("image/png"))
    // fs.writeFileSync(`${outputPATH}/newImage${_edition}.png`,_canvas.toBuffer("image/png"))
    fs.writeFileSync(`${outputPATH}/TESTIMG${_edition}.png`,_canvas.toBuffer("image/png"))
    console.log("IMAGE SAVED to  ",outputPATH)
}


const addMetadata = (_edition) => {
    let dateTime = Date.now(); //13 digit unique id, time stamp US Mountain Time.
    let tempMetadata = {
        hash: hash.join(""),      //layer, element, layer, element numbering.
        decodedHash: decodedHash,
        edition: _edition,
        date: dateTime,
        attributes: attributes,
    }
    metadata.push(tempMetadata);
    attributes = [];//clear data to defaults
    hash = [];
    decodedHash = [];
}
//END of giant LOOP, call METADATA, and loop again. GEN1, GEN2, GEN3 Generations of BITZ.

const addAttributes = (_element, _layer) => { //populate metadata values
    let tempAttr = {
        id: _element.id,
        layer: _layer.name,
        name: _element.name,
        rarity: _element.rarity,
    }
    attributes.push(tempAttr); //for reconstruction
    hash.push(_layer.id); //know what layer for decode
    hash.push(_element.id); //know what layer for decodedHash
    decodedHash.push({[_layer.id]: _element.id}) //how to decode, 1 array to join
}

//Random Layer, render inside image ctx.
function drawLayer(_layer, _edition){ //Add RANDOMNESS-.
    let element = _layer.elements[ Math.floor(Math.random() * _layer.elements.length)     ] //RANDOM PICK a BITSET
    // addMetadata(element, _layer);
    console.log("IMG - ELEMENT: ", element)
    addAttributes(element, _layer)
    console.log('LOAD IMG1:',`${_layer.location}${element.fileName}`)

    loadImage(`${_layer.location}${element.fileName}`)
    .then( (data)=>{
        let image = data;
        ctx.drawImage(image, _layer.position.y, _layer.position.x, _layer.size.width, _layer.size.height)
        addNumberTxt(edition); //works but needs move out
        // addIconIMG(_layer);
        saveLayer(canvas, _edition); //BITSETS converted into KRYPTOBITZ. $KBZ
    }).catch( (e) => { debugger;   })



    // const image = await loadImage(`${rootPATH}\\copyrightNetCinematics\\nxlogo1.png`)
    // const image = await loadImage(`${_layer.location}${element.fileName}`)
    //const image = await loadImage("./assets_set1/kryptobitz_set1_sky4b.jpg")
    // ctx.drawImage(image, _layer.position.y, _layer.position.x, _layer.size.width, _layer.size.height)
    // ctx.drawImage(image, _layer.position.y, _layer.position.x, _layer.size.width, _layer.size.height)
    // ctx.drawImage(image, 0, 0, 1000, 1000)
    // addIconIMG(_layer);
    // const logo = await loadImage(`${rootPATH}\\copyrightNetCinematics\\nxlogo1.png`)
    // const cp = await loadImage(`${rootPATH}\\copyrightNetCinematics\\cp1.png`)
    // const tm = await loadImage(`${rootPATH}\\copyrightNetCinematics\\tm1.png`)
    // ctx.drawImage(logo,30, 22, 55, 55)
    // ctx.drawImage(cp,26, 940, 32, 32)
    // ctx.drawImage(tm,960, 45, 32, 32)
    
    // addNumberTxt(edition);
    // console.log("create IMG layer: ", _edition, _layer.name, "with", element.name)
    // saveLayer(canvas, _edition); //BITSETS converted into KRYPTOBITZ. $KBZ
}



//Random Layer, render inside image ctx.
async function drawLayerAsync(_layer, _edition){ //Add RANDOMNESS-.
    let element = _layer.elements[ Math.floor(Math.random() * _layer.elements.length)     ] //RANDOM PICK a BITSET
    // addMetadata(element, _layer);
    console.log("IMG - ELEMENT: ", element)
    addAttributes(element, _layer)
    console.log('LOAD IMG1:',`${_layer.location}${element.fileName}`)
    // const image = await loadImage(`${rootPATH}\\copyrightNetCinematics\\nxlogo1.png`)
    const image = await loadImage(`${_layer.location}${element.fileName}`)
    //const image = await loadImage("./assets_set1/kryptobitz_set1_sky4b.jpg")
    // ctx.drawImage(image, _layer.position.y, _layer.position.x, _layer.size.width, _layer.size.height)
    ctx.drawImage(image, _layer.position.y, _layer.position.x, _layer.size.width, _layer.size.height)
    // ctx.drawImage(image, 0, 0, 1000, 1000)
    // addIconIMG(_layer);
    // const logo = await loadImage(`${rootPATH}\\copyrightNetCinematics\\nxlogo1.png`)
    // const cp = await loadImage(`${rootPATH}\\copyrightNetCinematics\\cp1.png`)
    // const tm = await loadImage(`${rootPATH}\\copyrightNetCinematics\\tm1.png`)
    // ctx.drawImage(logo,30, 22, 55, 55)
    // ctx.drawImage(cp,26, 940, 32, 32)
    // ctx.drawImage(tm,960, 45, 32, 32)
    
    addNumberTxt(edition);
    console.log("create IMG layer: ", _edition, _layer.name, "with", element.name)
    saveLayer(canvas, _edition); //BITSETS converted into KRYPTOBITZ. $KBZ
}
async function addIconIMG(_layer) {
    //void ctx.drawImage(image, dx, dy, dWidth, dHeight);
    // console.log('LOAD IMG2:',`${rootPATH}\\copyrightNetCinematics\\nxlogo1.png`)
    // const image = await loadImage(`${rootPATH}\\copyrightNetCinematics\\nxlogo1.png`)
    // ctx.drawImage(image, _layer.position.y, _layer.position.x, _layer.size.width, _layer.size.height)
    // ctx.drawImage(image, 20,20,440,440);
    // ctx.drawImage(image, _layer.position.y, _layer.position.x, _layer.size.width, _layer.size.height);
    const logo = await loadImage(`${rootPATH}\\copyrightNetCinematics\\nxlogo1.png`)
    const cp = await loadImage(`${rootPATH}\\copyrightNetCinematics\\cp1.png`)
    const tm = await loadImage(`${rootPATH}\\copyrightNetCinematics\\tm1.png`)
    ctx.drawImage(logo,30, 22, 55, 55)
    ctx.drawImage(cp,26, 940, 32, 32)
    ctx.drawImage(tm,960, 45, 32, 32)
}

const addNumberTxt = (_edition) => {

    let itemNUM = "00"+_edition;

    ctx.fillStyle = "#333333";
    ctx.font = "bold 12pt calibri";
    ctx.textBaseline = "top";
    ctx.textAlign = "left";
    ctx.fillText("1 of 1", 40, 74);

    ctx.font="33pt impact";
    ctx.shadowColor="yellow";
    ctx.shadowBlur=6;
    ctx.lineWidth=4;
    ctx.strokeText(itemNUM,95,25);
    ctx.textAlign = "left";
    ctx.shadowBlur=0;
    ctx.fillStyle="white";
    ctx.fillText(itemNUM,95,25);

    ctx.fillStyle = "skyblue";
    ctx.font = "bold 22pt Impact";
    ctx.textBaseline = "top";
    ctx.textAlign = "right";
    ctx.shadowColor="black";
    ctx.fillText("KRYPTOBITZ", 955, 28);

    ctx.font="18pt calibri";
    ctx.shadowColor="skyblue";
    ctx.textBaseline = "bottom";
    ctx.textAlign = "right";
    ctx.shadowBlur=6;
    ctx.lineWidth=4;
    ctx.fillStyle = "skyblue";
    ctx.strokeText("2 0 2 1",136,969);
    ctx.shadowBlur=4;
    ctx.fillStyle="steelblue";
    ctx.fillText("2 0 2 1",136,968);

    ctx.font="italic 20pt Verdana";
    ctx.shadowColor="skyblue";
    ctx.textBaseline = "bottom";
    ctx.textAlign = "right";
    ctx.shadowBlur=6;
    ctx.lineWidth=4;
    ctx.fillStyle = "skyblue";
    ctx.strokeText("spazeFalcon",965,969);
    ctx.shadowBlur=4;
    ctx.fillStyle="steelblue";
    ctx.fillText("spazeFalcon",964,968);

    // saveLayer(canvas, _edition);

//EXAMPLE: GRADIENT-.
//     var grad = ctx.createLinearGradient(0,0,200,0);
// grad.addColorStop(0, "white");
// grad.addColorStop(0.5, "red");
// grad.addColorStop(1, "black");

// ctx.fillStyle = grad;
// ctx.fillRect(0,0,400,200);

/*  NUM LAYOUTS - WITHOUT FRAME

    ctx.fillStyle = "#333333";
    ctx.font = "bold 12pt calibri";
    ctx.textBaseline = "top";
    ctx.textAlign = "left";
    ctx.fillText("1 of 1", 28, 60);

    ctx.font="33pt impact";
    ctx.shadowColor="yellow";
    ctx.shadowBlur=6;
    ctx.lineWidth=4;
    ctx.strokeText("001",85,10);
    ctx.textAlign = "left";
    ctx.shadowBlur=0;
    ctx.fillStyle="white";
    ctx.fillText("001",85,10);

    ctx.fillStyle = "skyblue";
    ctx.font = "bold 22pt Impact";
    ctx.textBaseline = "top";
    ctx.textAlign = "right";
    ctx.shadowColor="black";
    ctx.fillText("KRYPTOBITZ", 977, 12);

    ctx.font="18pt calibri";
    ctx.shadowColor="skyblue";
    ctx.textBaseline = "bottom";
    ctx.textAlign = "right";
    ctx.shadowBlur=6;
    ctx.lineWidth=4;
    ctx.fillStyle = "skyblue";
    ctx.strokeText("2 0 2 1",122,981);
    ctx.shadowBlur=4;
    ctx.fillStyle="steelblue";
    ctx.fillText("2 0 2 1",122,980);

    ctx.font="italic 22pt Verdana";
    ctx.shadowColor="skyblue";
    ctx.textBaseline = "bottom";
    ctx.textAlign = "right";
    ctx.shadowBlur=6;
    ctx.lineWidth=4;
    ctx.fillStyle = "skyblue";
    ctx.strokeText("spazeFalcon",979,989);
    ctx.shadowBlur=4;
    ctx.fillStyle="steelblue";
    ctx.fillText("spazeFalcon",978,988);

*/

}

// const updateBITZSETMetaData = (selectedBITZ)=>{ //Lookup BITZ in METANET for METADATA
//     for(let i = 0; i<selectedBITZ.length; i++){
//         if(METANET[ selectedBITZ[i].name ]){ //METANET name lookup-.
//             console.log("METANET found:",selectedBITZ[i].name)
            
//         }
//     }
//     return selectedBITZ;
// }


//AUTO - GENERATE - generativeART: NFTs, Banners, AVATARZ, trading cards, kryptokoinz, kryptobitz
//AUTO - GENERATE - various outputs: clean, signed, licensed, avatar cutout, video METALINK.
//METADATA - GENERATED - with TOKEN. Record what happened. Add extra TXT.
function main(){
    
    var mainCanvasContext = ctx; //document.getElementById("myCanvas").getContext("2d");

    /* Creates our layer's array */
    var layers = [];  //allows for ctx to write multiple times with clearRect abstracted out.
//todo rename canvas_layerz
    function addNewLayer(layers) { //TODO rename addCanvasLayer
      /* Creates the layer as a new canvas */
      var layer = createCanvas(width,height)
      var layerContext = layer.getContext("2d");

      /* Clears the canvas */
      layerContext.clearRect(0, 0, 400, 200);

      /* Adds it to our layers array */
      layers.push(layer);

      /* Returns the new layer to use it straight away */
      return layer;
    }
    
    /* Draws each layer on top of the other */
    function drawImage(canvasContext, layers) { //TODO rename to drawCanvasLayer
      /* Clears the original canvas */
      canvasContext.clearRect(0, 0, 400, 200);
      for(var i = 0; i < layers.length; i++) {
        canvasContext.drawImage(layers[i], 0, 0);  //convert CANVAS layers to CTX!
      }
    }

function drawIMGZ(_currentCardNum, _BITZSET){

    //TODO: comment out as example in README.
    //load all the images - at INIT
    // const frm1 = loadImage(`${rootPATH}\\assets_set1\\framez\\frame1a.png`)
    // const bg1 = loadImage(`${rootPATH}\\assets_set1\\bgz\\bg1a.png`)
    // const hero1 = loadImage(`${rootPATH}\\assets_set1\\heroz\\char1a.png`)
    // const sky1 = loadImage(`${rootPATH}\\assets_set1\\starz\\sky1a.png`)
    const logo = loadImage(`${rootPATH}\\copyrightNetCinematics\\nxlogo1.png`)
    const cp = loadImage(`${rootPATH}\\copyrightNetCinematics\\cp1.png`)
    const tm = loadImage(`${rootPATH}\\copyrightNetCinematics\\tm1.png`)


   //Calclulate which images get in, an array of IMG-PATHS
   let selectedBITZ = [], randomBIT = null;
   for( let i = 0; i<_BITZSET.length;i++){
       randomBIT = _BITZSET[i].BITZ[ Math.floor(Math.random() * _BITZSET[i].BITZ.length)     ] //RANDOM PICK a BITSET
       console.log("SELECTED-BIT", randomBIT)
       randomBIT.PATH = _BITZSET[i].PATH;
       selectedBITZ.push(randomBIT)
   }
//    selectedBITZ = updateBITZSETMetaData(selectedBITZ);
   //LOAD IMG-PATHS into array of PROMISE OBJECTS, for IMG LOADING
   promisedBITZ = [];
   for( let i = 0; i<selectedBITZ.length;i++){
        let selectedBIT = selectedBITZ[i];
        console.log("IMGPATH:",selectedBIT);
        let imgPromise = loadImage(`${selectedBIT.PATH}${selectedBIT.fileName}`)
        // let imgPromise = loadImage(`${rootPATH}\\assets_set1\\starz\\sky1a.png`)
        promisedBITZ.push( imgPromise )
   }
   console.log("CHOZEN-BITZ",promisedBITZ)
   //LOAD IMGs, called by Promise. When all selected images load, then BUILD.
   Promise.all(promisedBITZ) //waits for all IMGZ to load before rendering.
   .then( (imageSet) => { // .all([ logo, cp, tm, sky1,bg1,hero1 ])
        console.log('BITZ-LOADED',imageSet)

        //RE-UNITE the IMG with its METADATA.
        // if(imageSet.length===selectedBITZ.length){

        //     for(var i = 0; i<selectedBITZ.length;i++){//put the img with the metadata
                
        //     }
        // }


        var newLayer = addNewLayer(layers);
        var newLayerContext = newLayer.getContext("2d");

        //BITZSET in CONFIG populates LAYERBITZ in VIEW.
        //The LAYER BITZ are ENCASED here imageSet[0], imageSet[1] - from BITZSET
        // newLayerContext.drawImage(imageSet[0],0, 0, 1000, 1000) //sky
        // newLayerContext.drawImage(imageSet[1],0, 0, 1000, 1000) //bg
        // newLayerContext.drawImage(imageSet[2],0, 0, 1000, 1000) //hero
        // newLayerContext.drawImage(imageSet[3],0, 0, 1000, 1000) //frame

        for(var i = 0; i<imageSet.length;i++){ //dynamic draw layerz
            newLayerContext.drawImage(imageSet[i],0, 0, 1000, 1000) //todo make dynamic size
        }


   });
//    let element = _layer.elements[ Math.floor(Math.random() * _layer.elements.length)     ] //RANDOM PICK a BITSET
//    let selectedBIT = BITZSET.BITZ[ Math.floor(Math.random() * BITZSET.BITZ.length)     ] //RANDOM PICK a BITSET
//   console.log("SELECTED BIT", selectedBIT)

   //SYNCHRONOUSLY LOAD ALL 
    Promise
    .all([ logo, cp, tm])
    .then(function(data){
        // console.log('LOADED IMGS',data)
        // ctx.drawImage(logo,30, 22, 55, 55)
        // ctx.drawImage(cp,26, 940, 32, 32)
        // ctx.drawImage(tm,960, 45, 32, 32)
        var newLayer = addNewLayer(layers);
        var newLayerContext = newLayer.getContext("2d");
        


        // newLayerContext.drawImage(data[3],0, 0, 1000, 1000)
        // newLayerContext.drawImage(data[4],0, 0, 1000, 1000)
        // newLayerContext.drawImage(data[6],0, 0, 1000, 1000)
        // newLayerContext.drawImage(data[5],0, 0, 1000, 1000)

        newLayerContext.drawImage(data[0],30, 22, 55, 55)
        newLayerContext.drawImage(data[1],26, 940, 32, 32)
        newLayerContext.drawImage(data[2],958, 50, 32, 32)

        
        function drawNUMZ(_currentCardNum, _selectedBITZ){
            
            
            var newLayer = addNewLayer(layers); //TODO rename "layers" to canvas_setz
            newLayerContext = newLayer.getContext("2d");
            newLayerContext.fillStyle = "#333333";
            newLayerContext.font = "bold 14pt calibri";
            newLayerContext.textBaseline = "top";
            newLayerContext.textAlign = "left";
            newLayerContext.fillText("1 of 1", 36, 74);
            // ctx.fillStyle = "#333333";
            // ctx.font = "bold 12pt calibri";
            // ctx.textBaseline = "top";
            // ctx.textAlign = "left";
            // ctx.fillText("1 of 1", 40, 74);
            
            newLayer = addNewLayer(layers);
            newLayerContext = newLayer.getContext("2d");
            newLayerContext.font="33pt impact";
            newLayerContext.shadowColor="yellow";
            newLayerContext.shadowBlur=6;
            newLayerContext.lineWidth=4;
            let itemNUM = "00"+_currentCardNum;
            newLayerContext.strokeText(itemNUM,92,66);
            newLayerContext.textAlign = "left";
            newLayerContext.shadowBlur=0;
            newLayerContext.fillStyle="white";
            newLayerContext.fillText(itemNUM,92,66);
        
            newLayer = addNewLayer(layers);
            newLayerContext = newLayer.getContext("2d");
            newLayerContext.fillStyle = "skyblue";
            newLayerContext.font = "bold 22pt Impact";
            newLayerContext.textBaseline = "top";
            newLayerContext.textAlign = "right";
            newLayerContext.shadowColor="black";
            newLayerContext.fillText("KRYPTOBITZ", 955, 28);


            newLayer = addNewLayer(layers);
            newLayerContext = newLayer.getContext("2d");
            newLayerContext.font="18pt calibri";
            newLayerContext.shadowColor="skyblue";
            newLayerContext.textBaseline = "bottom";
            newLayerContext.textAlign = "right";
            newLayerContext.shadowBlur=6;
            newLayerContext.lineWidth=4;
            newLayerContext.fillStyle = "skyblue";
            newLayerContext.strokeText("2 0 2 1",136,969);
            newLayerContext.shadowBlur=4;
            newLayerContext.fillStyle="steelblue";
            newLayerContext.fillText("2 0 2 1",136,968);
        
            newLayer = addNewLayer(layers);
            newLayerContext = newLayer.getContext("2d");
            newLayerContext.font="italic 20pt Verdana";
            newLayerContext.shadowColor="skyblue";
            newLayerContext.textBaseline = "bottom";
            newLayerContext.textAlign = "right";
            newLayerContext.shadowBlur=6;
            newLayerContext.lineWidth=4;
            newLayerContext.fillStyle = "skyblue";
            newLayerContext.strokeText("spazeFalcon",965,969);
            newLayerContext.shadowBlur=4;
            newLayerContext.fillStyle="steelblue";
            newLayerContext.fillText("spazeFalcon",964,968);

            //-----------DYNAMIC----TXTs---------------------------
            let nameLBL = '', subLBL1 = '', subLBL2 = '', subMSG1='', rareMSG='', fNAME='', metaNODE=null;
            if(METANET && _selectedBITZ ){
                for(var i=0; i< _selectedBITZ.length; i++){
                    fNAME = _selectedBITZ[i].name; //METANET fname lookup-.
                    metaNODE = METANET[fNAME]; //look up data by fNAME, (file-name) to show data-.
                    if(!metaNODE){continue} //Each BIT can influence any TXT system-.
                    if(metaNODE.nameLBL){ nameLBL = metaNODE.nameLBL } 
                    if(metaNODE.subLBL1){ subLBL1 = metaNODE.subLBL1 }
                    if(metaNODE.subLBL2){ subLBL2 = metaNODE.subLBL2 }
                    if(metaNODE.subMSG1){ subMSG1 = metaNODE.subMSG1 }
                    if(metaNODE.rareMSG){ rareMSG = metaNODE.rareMSG }
                }
            }
            //-----------DYNAMIC----TXTs---------------------------
            //NAME LBL -  let nameLBL = "OrbyOrbot";
            newLayer = addNewLayer(layers);
            newLayerContext = newLayer.getContext("2d");
            newLayerContext.font="32pt Verdana";
            newLayerContext.shadowColor="skyblue";
            newLayerContext.textBaseline = "bottom";
            newLayerContext.textAlign = "center";
            newLayerContext.shadowBlur=6;
            newLayerContext.lineWidth=4;
            newLayerContext.fillStyle = "skyblue";
            newLayerContext.strokeText(`${nameLBL}`,500,901);
            newLayerContext.shadowBlur=4;
            newLayerContext.fillStyle="steelblue";
            newLayerContext.fillText(`${nameLBL}`,499,900);

            //SUB LBL1 -  let subLBL1 = "GODRAYS"; //COSMOBLAST //BLASTABLACKHOLE
            newLayer = addNewLayer(layers);
            newLayerContext = newLayer.getContext("2d");
            newLayerContext.font="italic 22pt Verdana";
            newLayerContext.shadowColor="skyblue";
            newLayerContext.textBaseline = "bottom";
            newLayerContext.textAlign = "center";
            newLayerContext.shadowBlur=6;
            newLayerContext.lineWidth=4;
            newLayerContext.fillStyle = "skyblue";
            // let subLBL1 = "cozmoblast";// _BITZSET[_currentCardNum+1].layerDetail1;
            newLayerContext.strokeText(`${subLBL1}`,350,939);
            newLayerContext.shadowBlur=2;
            newLayerContext.fillStyle="steelblue";
            newLayerContext.fillText(`${subLBL1}`,349,938);

            newLayer = addNewLayer(layers);
            newLayerContext = newLayer.getContext("2d");
            newLayerContext.font="italic 22pt Verdana";
            newLayerContext.shadowColor="skyblue";
            newLayerContext.textBaseline = "bottom";
            newLayerContext.textAlign = "center";
            newLayerContext.shadowBlur=6;
            newLayerContext.lineWidth=4;
            newLayerContext.fillStyle = "skyblue";
            // let subLBL2 = "mountain range";// _BITZSET[_currentCardNum+1].layerDetail2;
            newLayerContext.strokeText(`${subLBL2}`,630,939);
            newLayerContext.shadowBlur=2;
            newLayerContext.fillStyle="steelblue";
            newLayerContext.fillText(`${subLBL2}`,629,938); 


        }
        drawNUMZ(_currentCardNum, selectedBITZ);
        
        drawImage(mainCanvasContext, layers);
        
        //edition = 1;
        
        const outputPATH = "./output1"
        fs.writeFileSync(`${outputPATH}/TESTIMG${_currentCardNum}.png`,canvas.toBuffer("image/png"))
        // fs.writeFileSync(`${outputPATH}/TESTIMG${edition}.png`,canvas.toBuffer("image/png"))
        
        
    });
}
// drawIMGZ();

for(let i = 1; i <= totalCARDZ; i++){
    // let bitz = BITZSET[i]; //layers dimension
    drawIMGZ(i,BITZSET)
    // BITZSET.forEach((bitz)=>{  //LOOP NUMBER OF (bitz) sky, bg, char, frame, ...
    //     // drawLayer(layer, i);
    //     drawIMGZ(bitz,i)
    // });


}




return
debugger;

        // const logo = await loadImage(`${rootPATH}\\copyrightNetCinematics\\nxlogo1.png`)
        // const cp = await loadImage(`${rootPATH}\\copyrightNetCinematics\\cp1.png`)
        // const tm = await loadImage(`${rootPATH}\\copyrightNetCinematics\\tm1.png`)
    // ctx.drawImage(logo,30, 22, 55, 55)
    // ctx.drawImage(cp,26, 940, 32, 32)
    // ctx.drawImage(tm,960, 45, 32, 32)
    
    //NEED TO CREATE LAYERS, LOAD LAYER IMG, RENDER LAYERS, SAVE END IMAGE
    /* Creates new layer and adds a square to it */
    var newLayer = addNewLayer(layers);
    var newLayerContext = newLayer.getContext("2d");
    newLayerContext.fillStyle = "#FF0000";
    newLayerContext.fillRect(0, 0, 80, 100);

    /* Creates new layer and adds a square to it */
    newLayer = addNewLayer(layers);
    newLayerContext = newLayer.getContext("2d");
    newLayerContext.fillStyle = "#00FF00";
    newLayerContext.fillRect(10, 10, 80, 100);

    /* Creates new layer and adds a square to it */
    newLayer = addNewLayer(layers);
    newLayerContext = newLayer.getContext("2d");
    newLayerContext.fillStyle = "#0000FF";
    newLayerContext.fillRect(20, 20, 80, 100);

    /* On each change to the layers, draw the image again */
    drawImage(mainCanvasContext, layers);

    //edition = 1;

    const outputPATH = "./output1"
    fs.writeFileSync(`${outputPATH}/TESTIMG${edition}.png`,canvas.toBuffer("image/png"))

return;

    //Create each Edition, BITSET, BITFLEX
    for(let i = 1; i <= edition; i++){ //LOOP NUMBER OF CARDZ CARDNUM

        
        // layers.forEach((layer)=>{  //LOOP NUMBER OF LAYERZ (bitz) sky, bg, char, frame, ...
            // drawLayer(layer, i);
        // });
        // addNumberTxt(i); //broke
        // saveLayer(canvas, edition); 
        addMetadata(i)
        console.log("Edition: ",i)
    }

    // fs.readFile("./output1/_metadata.json", (err, data) => {
        // if (err) throw err;
        fs.writeFileSync("./output1/_metadata.json", JSON.stringify(metadata));
    // })
}
main();