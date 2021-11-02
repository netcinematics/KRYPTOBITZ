console.log('KRYPTOBITZ - Server on.')
const fs = require("fs");
const myArgs = process.argv.slice(2); //CMD LINE args. Split by space into Array;
const { createCanvas, loadImage} = require("canvas");
const {layers, width, height, editionNum, BITZSET, totalCARDZ, METANET, RARITYNET} = require('./config1.js')

const canvas = createCanvas(width,height)
const ctx = canvas.getContext("2d")

let DSTAMP = `00${Date.now()}`;
let uniqueDNA = {}; //TODO read/write to file-.
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

//Random Layer, render inside image ctx. //TODO remove?
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
    //    console.log("SELECTED-BIT", randomBIT)
       randomBIT.PATH = _BITZSET[i].PATH;
       selectedBITZ.push(randomBIT)
   }

   //Build DNA for uniqueDNA checker, and also add count of BIT SEGMENTS to RARITYNET-.
   let bitSegment = null, bitDNA = '';
   for(let i = 0; i<selectedBITZ.length;i++){
        bitSegment = `${i+1}:${selectedBITZ[i].id}`;
        bitDNA += `${bitSegment}${(i+1===selectedBITZ.length)?'':'.'}`
        //SAVE SEGMENT-COUNT METADATA for RARITY Analytics-.
        if(RARITYNET[bitSegment]){ //FOUND: add COUNT-.
            RARITYNET[bitSegment].count += 1;
        } else { debugger; console.log("SHOULD NEVER HAPPEN.","INIT SYSTEM covers all variations")
            RARITYNET[bitSegment] = {count:1};
        }
    }
    //********************************************TEST DUPES
    // let dupe = {}, rKeyz = Object.keys(uniqueDNA);
    // if(rKeyz.length){
    //     dupe = rKeyz[0];
    //     bitDNA = dupe; //TEST DUPE OVERRIDE-.
    // }
    //********************************************TEST DUPES
    //IF selectedBITZ are UNIQUE
    if(bitDNA && !uniqueDNA[bitDNA]){ //CONFIRMED UNIQUE-.
        uniqueDNA[bitDNA] = {bitz:selectedBITZ};  //FOR UNIQUENESS DIAGNOSTICS-.
    } else { console.log('DUPLICATE DETECTED:', bitDNA, "iteration", _currentCardNum); 
        return;
        //SEARCH for most rare, in RARITYNET, and replace dupe, in selectedBITZ.
        let rarityKEYS = Object.keys(RARITYNET), replaceAttempt=1, oldSEGS=bitDNA.split('.');
        let oldSEG="", newSEG="", currSEG="", currLVL=0, newDNA="";
        for(let i=0; i<rarityKEYS.length;i++ ){ //find 0 count for all layers.
            currSEG = rarityKEYS[i];
            // currSEG = currKEY.split(".")[replaceAttempt-1]
            currLVL = parseInt(currSEG.split(":")[0]);
            oldSEG = oldSEGS[replaceAttempt-1]; 
            console.log('OLDSEG:',oldSEG)
            if(!oldSEG){debugger;}
            if(currLVL > replaceAttempt){ //all full, none found
                newDNA += oldSEGS[replaceAttempt-1]
                replaceAttempt=currLVL; console.log("FULLSET",currLVL) }
            if(replaceAttempt > currLVL  ){
                continue; //already replaced this level.
            } else if(RARITYNET[currSEG].count===0){ 
                console.log('DUPE-REPLACE:', oldSEG,'with', currSEG)
                let atEND = (currLVL>=oldSEGS.length);
                newDNA += `${currSEG}${(!atEND)?'.':''}` //build up DNA name, with new 0 segs, if available-.

                // newSEG = RARITYNET[currSEG];
                if(RARITYNET[oldSEG].count===0){debugger;}
                RARITYNET[currSEG].count += 1; //increase count in NEW unique dna
                RARITYNET[oldSEG].count -=1;
                // RARITYNET[currSEG]
                //decrease count in OLD unique dna
                replaceAttempt++;//Try to collect 2 layers of count 0, to change

                if(atEND){
                    console.log('NEWDNA',newDNA);
                    break;
                }

            } 
            
            //else if(replaceAttempt >= 5){continue}

        }
        //COMBINE new UNIQUE KEY into uniqueDNA-.
        uniqueDNA[newDNA] = {bitz:[]};
        //GETBITZ for new DNA.
        // selectedBITZ = [];
        let newBITZ = newDNA.split('.'), bitTGT='', bitLVL=0, bitID='', newBIT={};
        for( let i = 0; i<newBITZ.length;i++){
            bitTGT = newBITZ[i];
            bitLVL = parseInt(bitTGT.split(':')[0])
            bitID = parseInt(bitTGT.split(':')[1])
            console.log("FINDBITZ:",bitTGT)
            newBIT = BITZSET[bitLVL-1].BITZ[bitID-1];
            uniqueDNA[newDNA].bitz.push(newBIT)
            // selectedBITZ.push(BITZSET[bitLVL-1])
        }
    //     for( let i = 0; i<selectedBITZ.length;i++){
    //         let selectedBIT = selectedBITZ[i];
    //         // console.log("IMGPATH:",selectedBIT);
    //         let imgPromise = loadImage(`${selectedBIT.PATH}${selectedBIT.fileName}`)
    //         // let imgPromise = loadImage(`${rootPATH}\\assets_set1\\starz\\sky1a.png`)
    //         promisedBITZ.push( imgPromise )
    //    }



    }

//**********************************DISPLAY*****************



   //Calculate RARITYNET - update only each selected BITZ.
//    let bitKEYS = Object.keys(uniqueDNA), bitKEY='';
//    for(let i=0; i<bitKEYS.length;i++){ //COUNT EACH OF TYPE, for SUB SCORE, and total SCORE.
//         bitKEY = bitKEYS[i];
//         bitSPLIT = bitKEY.split(".");
//         bitSPLIT.pop(); //remove end split-.
//         for(let j=0; j<bitSPLIT.length;j++){
//             if(RARITYNET[bitSPLIT[j]]){ //FOUND: add COUNT-.
//                 RARITYNET[bitSPLIT[j]].count += 1;
//             } else { //NEW: start COUNT-.
//                 RARITYNET[bitSPLIT[j]] = {count:1};
//             }
//         }
//    }
   //COUNT of USE compared to RUN COUNT - gives precise ratio. 
//    let rarityKEYS = Object.keys(RARITYNET);
//    for(let i=0; i<rarityKEYS.length;i++ ){
//      RARITYNET[rarityKEYS[i]].ratio = parseFloat(Number(RARITYNET[rarityKEYS[i]].count/totalCARDZ.toFixed(2)));
//    }
//    debugger;
//    //Compile SET RATIOs back to Rarity MetaData, and calculate AVG RARITY SCORE. 
//    let rarityRatio = 0; //TODO this needs to be AFTER FULL UNIQUE SET.
//    for(let i=0; i<bitKEYS.length; i++){
//         bitKEY = bitKEYS[i];
//         bitSPLIT = bitKEY.split(".");
//         bitSPLIT.pop(); //remove end split-.
//         for(let j=0; j< bitSPLIT.length; j++){ //WRITE EACH SUB RATIO-.
//             rarityRatio += parseFloat(RARITYNET[bitSPLIT[j]].ratio.toFixed(2));
//             uniqueDNA[bitKEY][bitSPLIT[j]] = RARITYNET[bitSPLIT[j]].ratio;
//         }
//         uniqueDNA[bitKEY].avgRarityRatio = rarityRatio / bitSPLIT.length;
//     }
//    //IF DNA equals runOnce is gold, or DNA match is slvr
//    //IF DNA equals _slvr or _gld, change frame

//    selectedBITZ = updateBITZSETMetaData(selectedBITZ);
   //LOAD IMG-PATHS into array of PROMISE OBJECTS, for IMG LOADING
   let promisedBITZ = [];
   for( let i = 0; i<selectedBITZ.length;i++){
        let selectedBIT = selectedBITZ[i];
        // console.log("IMGPATH:",selectedBIT);
        let imgPromise = loadImage(`${selectedBIT.PATH}${selectedBIT.fileName}`)
        // let imgPromise = loadImage(`${rootPATH}\\assets_set1\\starz\\sky1a.png`)
        promisedBITZ.push( imgPromise )
   }

 




//    console.log("CHOZEN-BITZ",promisedBITZ)
   //LOAD IMGs, called by Promise. When all selected images load, then BUILD.
   Promise.all(promisedBITZ) //waits for all IMGZ to load before rendering.
   .then( (imageSet) => { // .all([ logo, cp, tm, sky1,bg1,hero1 ])
        // console.log('BITZ-LOADED',imageSet)


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


   }).catch( (e) => {console.log(e)});
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
        newLayerContext.drawImage(data[2],948, 50, 32, 32)

        
        function drawNUMZ(_currentCardNum, _selectedBITZ){
            
            
            var newLayer = addNewLayer(layers); //TODO rename "layers" to canvas_setz
            newLayerContext = newLayer.getContext("2d");
            newLayerContext.fillStyle = "#333333";
            newLayerContext.font = "bold 14pt calibri";
            newLayerContext.textBaseline = "top";
            newLayerContext.textAlign = "left";
            newLayerContext.fillText("1 of 1", 36, 74);
            
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
            newLayerContext.fillText("KRYPTOBITZ", 945, 28);


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

            //DYNAMIC SET #DATESTAMP  _NUMBER RAN.
            var newLayer = addNewLayer(layers);
            newLayerContext = newLayer.getContext("2d");
            newLayerContext.fillStyle = "#333333";
            newLayerContext.font = "10pt calibri";
            newLayerContext.textBaseline = "top";
            newLayerContext.textAlign = "right";
            newLayerContext.fillText(`set ${DSTAMP}`, 930, 60);

            var newLayer = addNewLayer(layers);
            newLayerContext = newLayer.getContext("2d");
            newLayerContext.fillStyle = "#333333";
            newLayerContext.font = "10pt calibri";
            newLayerContext.textBaseline = "top";
            newLayerContext.textAlign = "right";
            newLayerContext.fillText(`run ${totalCARDZ}`, 961, 60);



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
 //todo rename totalcardz to totalNIFTYZ
for(let i = 1; i <= totalCARDZ; i++){
    // let bitz = BITZSET[i]; //layers dimension
    drawIMGZ(i,BITZSET) //todo rename function to... paintNIFTY
    // BITZSET.forEach((bitz)=>{  //LOOP NUMBER OF (bitz) sky, bg, char, frame, ...
    //     // drawLayer(layer, i);
    //     drawIMGZ(bitz,i)
    // });


}

//CALCULATE INDIVIDUAL IMAGE RARITY, by average of SEGMENT/SELECTION rarity.


   //**************ORIGINALITY************RARITY****************
   //ALL CARDZ are SELECTED. BEFORE RENDER, CALCULATE RARITY-.
   let rarityKEYS = Object.keys(RARITYNET);
   for(let i=0; i<rarityKEYS.length;i++ ){ //calculate rarity ratio for SEGMENTS-.
       if(!RARITYNET[rarityKEYS[i]].count){continue} //skip zero-.
       RARITYNET[rarityKEYS[i]].ratio = parseFloat(Number(RARITYNET[rarityKEYS[i]].count/totalCARDZ).toFixed(2));
       console.log("SEG-RATES:",rarityKEYS[i],RARITYNET[rarityKEYS[i]].ratio )
       if(RARITYNET[rarityKEYS[i]].ratio < 0){debugger;}
   }
   

//    uniqueDNA[bitDNA] = {bitz:selectedBITZ};

   let uniqueNIFTYs = Object.keys(uniqueDNA), aNIFTY='', NIFTYRARITYRATIO=0;
   for(let i=0; i<uniqueNIFTYs.length;i++){ //COUNT EACH OF TYPE, for SUB SCORE, and total SCORE.
        NIFTYRARITYRATIO = 0;
        aNIFTY = uniqueDNA[ uniqueNIFTYs[i] ] //to update UNIQUEDNA
        bitKEY = uniqueNIFTYs[i];
        bitSPLIT = bitKEY.split(".");
        for(let j=0; j<bitSPLIT.length;j++){ //lookup rarity in rarity net
            if(aNIFTY && !aNIFTY.rarity){ aNIFTY.rarity = {};}
            aNIFTY.rarity[bitSPLIT[j]] = RARITYNET[bitSPLIT[j]];//update UNIQUE DNA 
            NIFTYRARITYRATIO += RARITYNET[bitSPLIT[j]].ratio;
        }
        if(!NIFTYRARITYRATIO){debugger;}
       
        aNIFTY.rarity.NFTRARITYRATIO = parseFloat(Number(NIFTYRARITYRATIO / bitSPLIT.length).toFixed(2));
        console.log("NFT-RARITY:",bitKEY, aNIFTY.rarity.NFTRARITYRATIO)
        if(aNIFTY.rarity.NFTRARITYRATIO===NaN){debugger;}
        //for 2 images 0 shared: 0.5, 1 shared: 0.625, 2 shared: 0.75
   }


   //TODO: write uniqueDNA to .json file to generate total unique sets.
   




return

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