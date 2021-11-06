console.log('KRYPTOBITZ - Server on.')
const fs = require("fs");
const rootPATH = __dirname; //C:\PROJECTS\\KRYPTOBITZ

//todo move ot config
    //OpenSea metadata 
    const namePrefix = "KRYPTOBITZ";
    const description = "NFT Generative Art Project, 2021. HEROZ from KRYPTOSPAZE!";
    const IPFS_URI = "ipfs://...Replaced_with_IPFS_uri...";
    const youTubeURL = `https://www.youtube.com/watch?v=M1-hZgIlAkc`
    const externalURL = `https://netcinematics.github.io/CRYPTOSPAZE/`

const COMMANDZ = process.argv.slice(2); //CMD LINE args. Split by space into Array;
if(COMMANDZ[0]==='2'){ //IPFS MODE-.
    console.log('RUNNING IN IPFS IMAGE UPDATE MODE');
    console.log('Updating Metadata files with IPFS base URI')
    let rawdata = fs.readFileSync(`${rootPATH}/output1/json/_metadataMAIN.json`);
    let data = JSON.parse(rawdata);
    data.forEach((item) => {  //Update metadata to OpenSea data structure
        // item.name = `${namePrefix} #${item.cardNum}`;
        console.log("UPDATE IPFS",item.name)
        // item.description = description; //TODO - link to METADATA, append?
        item.image = `${IPFS_URI}/${item.cardNum}.png`;     //IPFS PATH
        // item.external_url = externalURL
        // item.youtube_url = youTubeURL
        fs.writeFileSync(`${rootPATH}/output1/json/${item.cardNum}.json`,
            JSON.stringify(item, null, 2)
        );
    });
    
    fs.writeFileSync(  //WRITE OUT IPFS PATH
      `${rootPATH}/output1/json/_metadataMAIN.json`,
      JSON.stringify(data, null, 2)
    );

    return;
}//END IPFS MODE-.

//BUILD-IMG MODE-.
const { createCanvas, loadImage} = require("canvas");
const {BITZSET, TOTAL_CARDZ, METANET, RARITYNET, IDENTITYNET, width, height} = require('./config1.js')

const canvas = createCanvas(width,height)
const ctx = canvas.getContext("2d")

let METABITZOS = [] //OpenSea Metdata BITZ-.
// let IDENTITY_BIT = ''; //Unique ID for current CARD-.
let DSTAMP= new Date().toISOString().split("T")[0]; //simple date, use FULL ISO as ISO-STAMP in other places.
console.log("Running IMG mode, creation date:",DSTAMP);

function main_NIFTYFACTORY(){
    
    //TODO modularize CANVASLAYERZ
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

function drawBITZ(_currentCardNum, _BITZSET){
   //RANDOM SELECTOR: Calclulate which images get in, an array of IMG-PATHS
   let selectedBITZ = [], randomBIT = null;
   for( let i = 0; i<_BITZSET.length;i++){
       randomBIT = _BITZSET[i].BITZ[ Math.floor(Math.random() * _BITZSET[i].BITZ.length)     ] //RANDOM PICK a BITSET
    //    console.log("SELECTED-BIT", randomBIT)
       randomBIT.PATH = _BITZSET[i].PATH;
       selectedBITZ.push(randomBIT)
   }
   // INIT IDENTITY 
   let bitSegment = null, IDENTITY_BIT = '';
   for(let i = 0; i<selectedBITZ.length;i++){ //INIT ID for Confirmed Originality-.
        bitSegment = `${i+1}:${selectedBITZ[i].id}`;
        IDENTITY_BIT += `${bitSegment}${(i+1===selectedBITZ.length)?'':'.'}`
    }
    //********************************************TEST DUPES
    // let dupe = {}, rKeyz = Object.keys(IDENTITYNET);
    // if(rKeyz.length){
    //     dupe = rKeyz[0];
    //     IDENTITY_BIT = dupe; //TEST DUPE OVERRIDE-.
    // }
    //********************************************TEST DUPES
    //UNIQUENESS: TEST IF selectedBITZ are UNIQUE
    if(IDENTITY_BIT && !IDENTITYNET[IDENTITY_BIT]){ //CONFIRMED UNIQUE-.
        IDENTITYNET[IDENTITY_BIT] = {bitz:selectedBITZ};  //FOR UNIQUENESS DIAGNOSTICS-.
    } else { //DUPLICATE!
        console.log('DUPLICATE DETECTED:', IDENTITY_BIT, "iteration", _currentCardNum); 
        _currentCardNum--; //TRY AGAIN-.
        return false;
    }
    //COUNT-OCCURRENCE (of bit segment) - for RARITY Analytics-.
    for(let i = 0; i<selectedBITZ.length;i++){ 
        bitSegment = `${i+1}:${selectedBITZ[i].id}`; //the singular variation. Layer count.
        if(RARITYNET[bitSegment]){ //FOUND: add COUNT-.
            RARITYNET[bitSegment].count += 1; //Simple count of the used SEGMENT-.
        } else { debugger; console.log("Not initialized.","INIT SYSTEM needs to init this.")
            RARITYNET[bitSegment] = {count:1};
        }
    }
//   todo //IF DNA equals runOnce is gold, or DNA match is slvr
//   todo  //IF DNA equals _slvr or _gld, change frame

/************************************************************\
 * ASYNCHRONOUS - IMAGE - LOAD
 * Promises below. Look for FINAL IMG logic and finishBUILD
\************************************************************/
   //LOAD IMG-PATHS into array of PROMISE OBJECTS, for IMG LOADING
   let promisedBITZ = [];
   for( let i = 0; i<selectedBITZ.length;i++){
        let selectedBIT = selectedBITZ[i];
        // console.log("IMGPATH:",selectedBIT);
        let imgPromise = loadImage(`${selectedBIT.PATH}${selectedBIT.fileName}`)
        // let imgPromise = loadImage(`${rootPATH}\\assets_set1\\starz\\sky1a.png`)
        promisedBITZ.push( imgPromise )
   }

   //-----------LOAD IMGs, called by Promise. When all selected images load, then BUILD.
   Promise.all(promisedBITZ) //waits for all IMGZ to load before rendering.
   .then( (imageSet) => { // .all([ logo, cp, tm, sky1,bg1,hero1 ])
        // console.log('BITZ-LOADED',imageSet)
        var newLayer = addNewLayer(layers); //todo update addNewLayer to addLAYERZ with layerz
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

    //SYNCHRONOUSLY LOAD ALL 
    const logo = loadImage(`${rootPATH}\\copyrightNetCinematics\\nxlogo1.png`)
    const cp = loadImage(`${rootPATH}\\copyrightNetCinematics\\cp1.png`)
    const tm = loadImage(`${rootPATH}\\copyrightNetCinematics\\tm1.png`)
    Promise
    .all([ logo, cp, tm])
    .then(function(data){
        // console.log('LOADED IMGS',data)
        // ctx.drawImage(logo,30, 22, 55, 55)
        // ctx.drawImage(cp,26, 940, 32, 32)
        // ctx.drawImage(tm,960, 45, 32, 32)
        var newLayer = addNewLayer(layers);
        var newLayerContext = newLayer.getContext("2d");

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
            newLayerContext.shadowBlur=4;
            newLayerContext.lineWidth=4;
            newLayerContext.fillStyle = "skyblue";
            newLayerContext.strokeText("2 0 2 1",136,969);
            newLayerContext.shadowBlur=4;
            newLayerContext.fillStyle="steelblue";
            newLayerContext.fillText("2 0 2 1",136,968);
        
            newLayer = addNewLayer(layers);
            newLayerContext = newLayer.getContext("2d");
            newLayerContext.font="italic 12pt Verdana";
            newLayerContext.shadowColor="skyblue";
            newLayerContext.textBaseline = "bottom";
            newLayerContext.textAlign = "right";
            newLayerContext.shadowBlur=2;
            newLayerContext.lineWidth=4;
            newLayerContext.fillStyle = "darkpurple";
            newLayerContext.strokeText("spazeFalcon",968,970);
            newLayerContext.shadowBlur=2;
            newLayerContext.fillStyle="steelblue";
            newLayerContext.fillText("spazeFalcon",967,969);

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
            newLayer = addNewLayer(layers);
            newLayerContext = newLayer.getContext("2d");
            newLayerContext.font="33pt impact";
            newLayerContext.shadowColor="yellow";
            newLayerContext.shadowBlur=6;
            newLayerContext.lineWidth=4;
            let itemNUM = "00"+_currentCardNum;
            newLayerContext.strokeText(itemNUM,92,70);
            newLayerContext.textAlign = "left";
            newLayerContext.shadowBlur=0;
            newLayerContext.fillStyle="white";
            newLayerContext.fillText(itemNUM,92,70);

            //NAME LBL -  let nameLBL = "OrbyOrbot";
            newLayer = addNewLayer(layers);
            newLayerContext = newLayer.getContext("2d");
            newLayerContext.font="32pt Verdana";
            newLayerContext.shadowColor="skyblue";
            newLayerContext.textBaseline = "bottom";
            newLayerContext.textAlign = "center";
            newLayerContext.shadowBlur=2;
            newLayerContext.lineWidth=4;
            newLayerContext.fillStyle = "skyblue";
            newLayerContext.strokeText(`${nameLBL}`,500,888);
            newLayerContext.shadowBlur=4;
            newLayerContext.fillStyle="steelblue";
            newLayerContext.fillText(`${nameLBL}`,499,887);

            //SUB LBL1 -  let subLBL1 = "GODRAYS"; //COSMOBLAST //BLASTABLACKHOLE
            newLayer = addNewLayer(layers);
            newLayerContext = newLayer.getContext("2d");
            newLayerContext.font="italic 22pt Verdana";
            newLayerContext.shadowColor="skyblue";
            newLayerContext.textBaseline = "bottom";
            newLayerContext.textAlign = "center";
            newLayerContext.shadowBlur=6;
            newLayerContext.lineWidth=4;
            newLayerContext.fillStyle = "#CCCCCC";
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
            newLayerContext.fillStyle = "#CCCCCC";
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
            newLayerContext.fillText(`set ${DSTAMP}`, 890, 60);

            var newLayer = addNewLayer(layers);
            newLayerContext = newLayer.getContext("2d");
            newLayerContext.fillStyle = "#333333";
            newLayerContext.font = "10pt calibri";
            newLayerContext.textBaseline = "top";
            newLayerContext.textAlign = "right";
            newLayerContext.fillText(`cardz ${TOTAL_CARDZ}`, 940, 60);

            var newLayer = addNewLayer(layers);
            newLayerContext = newLayer.getContext("2d");
            newLayerContext.fillStyle = "#333333";
            newLayerContext.font = "12pt calibri";
            newLayerContext.textBaseline = "bottom";
            newLayerContext.textAlign = "left";
            newLayerContext.fillText(`kbz ${IDENTITY_BIT}`,33,940);

            //TODO _slvr _gold



        }
        drawNUMZ(_currentCardNum, selectedBITZ);
        drawImage(mainCanvasContext, layers);     //update this name to paintLAYERZ

        console.log("Writing IMAGE and METABITZ...",_currentCardNum)
        const outputPATH = "./output1" //ACTUAL NAME OF THE IMAGES BEING SAVED TO EACH IMAGE FILE.
        fs.writeFileSync(`${outputPATH}/images/KBZ_${_currentCardNum}.png`,canvas.toBuffer("image/png"))
        
        function setMETABITZ(){//COMPILE OPENSEA STYLE METADATA-. For Upload to IPFS through pinata-.
            let metaBIT = {}
            metaBIT.cardNum = _currentCardNum;
            metaBIT.name = `${namePrefix} #00${_currentCardNum}`;
            // console.log("set METABIT",metaBIT.name)
            metaBIT.description = description; //TODO LINK TO METANET!
            metaBIT.image = 'run ipfs to replace this uri';//`${IPFS_URI}/${_currentCardNum}.png`;     //IPFS PATH
            metaBIT.external_url = externalURL;
            metaBIT.youtube_url = youTubeURL;
            metaBIT.attributes = [] //todo connnect to identitynet/?
            // metaBIT.attributes = [
            //     {
            //       "trait_type": "Base", 
            //       "value": "Starfish"
            //     },  
            //     {
            //       "display_type": "boost_number", 
            //       "trait_type": "Aqua Power", 
            //       "value": 40
            //     }, 
            //     {
            //       "display_type": "boost_percentage", 
            //       "trait_type": "Stamina Increase", 
            //       "value": 10
            //     }, 
            //     {
            //       "display_type": "number", 
            //       "trait_type": "Generation", 
            //       "value": 2
            //     }
            //   ];
            METABITZOS.push(metaBIT)
        } setMETABITZ();
        function finishMETABITZ(){ //OPTIMIZATION: SAVE ONLY ONCE- at the end-.
            if(_currentCardNum===TOTAL_CARDZ){ //FINAL-CARD-. Finish METABITZ-.
                console.log("WRITE METABITZ:",METABITZOS.length,TOTAL_CARDZ)
                fs.writeFileSync(`./output1/json/_metadataMAIN.json`, JSON.stringify(METABITZOS));
                calculateRARITY();
            } //else{ console.log("not end",_currentCardNum) }
        } finishMETABITZ();
    });
    return true;//drawBITZ success
} //END drawBITZ

function createKRYPTOBITZ(){ //IMAGE-CREATION-FACTORY 
    for(let i = 1; i <= TOTAL_CARDZ; i++){
        let result = drawBITZ(i,BITZSET) 
        if(!result){ //DUPLICATE-ROLL-BACK-. //todo test this
            i--; debugger;
        }
    }
} createKRYPTOBITZ();

function calculateRARITY(){
    console.log("CALCULATE RARITY")
 //**************ORIGINALITY************RARITY****************
   //ALL CARDZ are SELECTED. and UNIQUE, CALCULATE RARITY-.
   let rarityKEYS = Object.keys(RARITYNET);
   for(let i=0; i<rarityKEYS.length;i++ ){ //calculate rarity ratio for SEGMENTS-.
       if(!RARITYNET[rarityKEYS[i]].count){continue} //skip zero-.
       RARITYNET[rarityKEYS[i]].ratio = parseFloat(Number(RARITYNET[rarityKEYS[i]].count/TOTAL_CARDZ).toFixed(2));
       console.log("SEGMENT-RATIO:",rarityKEYS[i],RARITYNET[rarityKEYS[i]].ratio )
       if(RARITYNET[rarityKEYS[i]].ratio < 0){debugger;}
   }

   let uniqueNIFTYs = Object.keys(IDENTITYNET), aNIFTY='', NIFTYRARITYRATIO=0;
   for(let i=0; i<uniqueNIFTYs.length;i++){ //COUNT EACH OF TYPE, for SUB SCORE, and total SCORE.
        NIFTYRARITYRATIO = 0;
        aNIFTY = IDENTITYNET[ uniqueNIFTYs[i] ] //to update IDENTITYNET
        bitKEY = uniqueNIFTYs[i];
        bitSPLIT = bitKEY.split(".");
        for(let j=0; j<bitSPLIT.length;j++){ //lookup rarity in rarity net
            if(aNIFTY && !aNIFTY.rarity){ aNIFTY.rarity = {};}
            aNIFTY.rarity[bitSPLIT[j]] = RARITYNET[bitSPLIT[j]];//update UNIQUE DNA 
            NIFTYRARITYRATIO += RARITYNET[bitSPLIT[j]].ratio;
        }
        if(!NIFTYRARITYRATIO){debugger;}
        aNIFTY.rarity.NFTRARITYRATIO = parseFloat(Number(NIFTYRARITYRATIO / bitSPLIT.length).toFixed(2));
        aNIFTY.rarity.NFTRARITYGRADE = Number(1 - aNIFTY.rarity.NFTRARITYRATIO).toFixed(2);
        console.log("NFT-RARITY:",bitKEY,"RATIO:", aNIFTY.rarity.NFTRARITYRATIO,"SCORE:",aNIFTY.rarity.NFTRARITYGRADE)
        if(aNIFTY.rarity.NFTRARITYRATIO===NaN){debugger;}
   }

   //TODO: IDENTITYNET calculate 1st, last, middle card as _slvr_last_1st _once_gld
   //TODO: write IDENTITYNET to .json file to generate total unique sets.
   //TODO combine this with write out IDENTITYNET

    let METABITZ = {RARITYNET,IDENTITYNET,METANET,DSTAMP:new Date().toISOString()}
    console.log("WRITE-METABITZ",new Date().toISOString());
    var stream = fs.createWriteStream(`./output1/KBZ_METANET_${new Date().toISOString().split(":")[0]}.json`, {flags:'a'});
    stream.write(`{"${new Date().toISOString()}":${JSON.stringify(METABITZ)}`);
    stream.end();

   console.log('collection success')
} //end CALCULATERARITY

} 
main_NIFTYFACTORY();



    // fs.readFile("./output1/_metadata.json", (err, data) => {
        // if (err) throw err;
        // fs.writeFileSync("./output1/json/_metadata.json", JSON.stringify(metadata));
    // })



// //EXAMPLE: GRADIENT-.
// //     var grad = ctx.createLinearGradient(0,0,200,0);
// // grad.addColorStop(0, "white");
// // grad.addColorStop(0.5, "red");
// // grad.addColorStop(1, "black");
// // ctx.fillStyle = grad;
// // ctx.fillRect(0,0,400,200);

// const updateBITZSETMetaData = (selectedBITZ)=>{ //Lookup BITZ in METANET for METADATA
//     for(let i = 0; i<selectedBITZ.length; i++){
//         if(METANET[ selectedBITZ[i].name ]){ //METANET name lookup-.
//             console.log("METANET found:",selectedBITZ[i].name)
            
//         }
//     }
//     return selectedBITZ;
// }


//TODO - GENERATE - generativeART: NFTs, Banners, AVATARZ, trading cards, kryptokoinz, kryptobitz
//TODO - GENERATE - various outputs: clean, signed, licensed, avatar cutout, video METALINK.
//METADATA - GENERATED - with TOKEN. Record what happened. Add extra TXT, LNK, VID, SND.

