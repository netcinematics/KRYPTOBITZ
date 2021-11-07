console.log('KRYPTOBITZ - Server on.')
const fs = require("fs");
const rootPATH = __dirname; //C:\PROJECTS\\KRYPTOBITZ
let DSTAMP= new Date().toISOString().split("T")[0]; //simple date, use FULL ISO as ISO-STAMP in other places.
let {BITZSET, TOTAL_CARDZ, METANET, RARITYNET, IDENTITYNET, OS_META_MODEL, width, height} = require('./config1.js')

const COMMANDZ = process.argv.slice(2); //CMD LINE args. -> node index 2
/****************************************************\
 * IPFS update uri - MODE-. 
 * RUN:  node index 2     
 * RESULT: to replace the IFPS PATH from CONFIG.
\****************************************************/
if(COMMANDZ[0]==='2'){ //IPFS MODE-.
    console.log('RUNNING IN IPFS IMAGE UPDATE MODE');
    console.log('Updating Metadata files with IPFS base URI')
    // if(!fs.existsSync(`./output1/json/${DSTAMP}`)){ fs.mkdirSync(`./output1/json/${DSTAMP}`); }
    // let rawdata = fs.readFileSync(`${rootPATH}/output1/json/${DSTAMP}/_metadataMAIN.json`);
    let rawdata = fs.readFileSync(`${rootPATH}/output1/json/_metadataMAIN.json`);
    let data = JSON.parse(rawdata);
    data.forEach((item) => {  //Update metadata to OpenSea data structure
        console.log("UPDATE IPFS",item.name)
        item.image = `${OS_META_MODEL.IPFS_URI}/${item.cardNum}.png`;     //IPFS PATH
        // item.name = `${OS_META_MODEL.namePrefix} #${item.cardNum}`;
        // item.description = description; 
        // todo NFT LGL DESCRIPTION FOOTER
        // item.external_url = OS_META_MODEL.externalURL
        // item.youtube_url = OS_META_MODEL.youTubeURL
        if(!fs.existsSync(`./output1/json/${DSTAMP}`)){ fs.mkdirSync(`./output1/json/${DSTAMP}`); }
        fs.writeFileSync(`${rootPATH}/output1/json/${DSTAMP}/${item.cardNum}.json`,
            JSON.stringify(item, null, 2)
        );
    });
    // if(!fs.existsSync(`./output1/json/${DSTAMP}`)){ fs.mkdirSync(`./output1/json/${DSTAMP}`); }
    fs.writeFileSync(  //WRITE OUT IPFS PATH
      `${rootPATH}/output1/json/_metadataMAIN.json`,
    //   `${rootPATH}/output1/json/${DSTAMP}/_metadataMAIN.json`,
      JSON.stringify(data, null, 2)
    );
    return; //END SCRIPT-.
}//END IPFS MODE-.

/****************************************************\
 * BUILD-IMG - MODE ->  KRYPTO-FACTORY!
\****************************************************/
const { createCanvas, loadImage} = require("canvas");
const canvas = createCanvas(width,height)
const ctx = canvas.getContext("2d")

let METABITZOS = [] //OpenSea Metdata BITZ-.console.log("Running IMG mode, creation date:",DSTAMP);
let dupe = null

function main_NIFTYFACTORY(){
    var CANVAS_LAYERZ = ctx; //document.getElementById("myCanvas").getContext("2d");
    var layerz = [];  //allows for ctx to write multiple times with clearRect abstracted out.
    function addLAYERZ(layerz) { 
      var layer = createCanvas(width,height)
      var layerContext = layer.getContext("2d");
    //   layerContext.clearRect(0, 0, 400, 200);
      layerContext.clearRect(0, 0, width, height);
      layerz.push(layer);
      return layer;
    }
    function paintLAYERZ(canvasContext, layerz) { 
    //   canvasContext.clearRect(0, 0, 400, 200);
      canvasContext.clearRect(0, 0, width, height);
      for(var i = 0; i < layerz.length; i++) {
        canvasContext.drawImage(layerz[i], 0, 0);  //convert CANVAS layerz to CTX!
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
    // let rKeyz = Object.keys(IDENTITYNET);
    // if(rKeyz.length && !dupe){
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
        var newLayerZ = addLAYERZ(layerz); 
        var layerCTX = newLayerZ.getContext("2d");
        //BITZSET in CONFIG populates LAYERBITZ in VIEW.
        //The LAYER BITZ are ENCASED here imageSet[0], imageSet[1] - from BITZSET
        // layerCTX.drawImage(imageSet[0],0, 0, 1000, 1000) //sky
        // layerCTX.drawImage(imageSet[1],0, 0, 1000, 1000) //bg
        // layerCTX.drawImage(imageSet[2],0, 0, 1000, 1000) //hero
        // layerCTX.drawImage(imageSet[3],0, 0, 1000, 1000) //frame
        for(var i = 0; i<imageSet.length;i++){ //dynamic draw layerz
            // layerCTX.drawImage(imageSet[i],0, 0, 1000, 1000) 
            layerCTX.drawImage(imageSet[i],0, 0, width, height) 
        }
   }).catch( (e) => {console.log(e)});

    //SYNCHRONOUSLY LOAD ALL 
    const logo = loadImage(`${rootPATH}\\copyrightNetCinematics\\nxlogo1.png`)
    const cp = loadImage(`${rootPATH}\\copyrightNetCinematics\\cp1.png`)
    const tm = loadImage(`${rootPATH}\\copyrightNetCinematics\\tm1.png`)
    Promise
    .all([ logo, cp, tm])
    .then(function(data){ // console.log('LOADED IMGS',data)
        var newLayerZ = addLAYERZ(layerz);
        var layerCTX = newLayerZ.getContext("2d");
        layerCTX.drawImage(data[0],30, 22, 55, 55)
        layerCTX.drawImage(data[1],26, 940, 32, 32)
        layerCTX.drawImage(data[2],948, 50, 32, 32)
        
        function drawNUMZ(_currentCardNum, _selectedBITZ){
            var newLayerZ = addLAYERZ(layerz); 
            layerCTX = newLayerZ.getContext("2d");
            layerCTX.fillStyle = "#333333";
            layerCTX.font = "bold 14pt calibri";
            layerCTX.textBaseline = "top";
            layerCTX.textAlign = "left";
            layerCTX.fillText("1 of 1", 36, 74);
                
            newLayerZ = addLAYERZ(layerz);
            layerCTX = newLayerZ.getContext("2d");
            layerCTX.fillStyle = "skyblue";
            layerCTX.font = "bold 22pt Impact";
            layerCTX.textBaseline = "top";
            layerCTX.textAlign = "right";
            layerCTX.shadowColor="black";
            layerCTX.fillText("KRYPTOBITZ", 945, 28);

            newLayerZ = addLAYERZ(layerz);
            layerCTX = newLayerZ.getContext("2d");
            layerCTX.font="18pt calibri";
            layerCTX.shadowColor="skyblue";
            layerCTX.textBaseline = "bottom";
            layerCTX.textAlign = "right";
            layerCTX.shadowBlur=4;
            layerCTX.lineWidth=4;
            layerCTX.fillStyle = "skyblue";
            layerCTX.strokeText("2 0 2 1",136,969);
            layerCTX.shadowBlur=4;
            layerCTX.fillStyle="steelblue";
            layerCTX.fillText("2 0 2 1",136,968);
        
            newLayerZ = addLAYERZ(layerz);
            layerCTX = newLayerZ.getContext("2d");
            layerCTX.font="italic 12pt Verdana";
            layerCTX.shadowColor="skyblue";
            layerCTX.textBaseline = "bottom";
            layerCTX.textAlign = "right";
            layerCTX.shadowBlur=2;
            layerCTX.lineWidth=4;
            layerCTX.fillStyle = "darkpurple";
            layerCTX.strokeText("spazeFalcon",968,970);
            layerCTX.shadowBlur=2;
            layerCTX.fillStyle="steelblue";
            layerCTX.fillText("spazeFalcon",967,969);

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
            newLayerZ = addLAYERZ(layerz);
            layerCTX = newLayerZ.getContext("2d");
            layerCTX.font="33pt impact";
            layerCTX.shadowColor="yellow";
            layerCTX.shadowBlur=6;
            layerCTX.lineWidth=4;
            let itemNUM = "00"+_currentCardNum;
            layerCTX.strokeText(itemNUM,92,70);
            layerCTX.textAlign = "left";
            layerCTX.shadowBlur=0;
            layerCTX.fillStyle="white";
            layerCTX.fillText(itemNUM,92,70);

            //NAME LBL -  let nameLBL = "OrbyOrbot";
            newLayerZ = addLAYERZ(layerz);
            layerCTX = newLayerZ.getContext("2d");
            layerCTX.font="32pt Verdana";
            layerCTX.shadowColor="skyblue";
            layerCTX.textBaseline = "bottom";
            layerCTX.textAlign = "center";
            layerCTX.shadowBlur=2;
            layerCTX.lineWidth=4;
            layerCTX.fillStyle = "skyblue";
            layerCTX.strokeText(`${nameLBL}`,500,888);
            layerCTX.shadowBlur=4;
            layerCTX.fillStyle="steelblue";
            layerCTX.fillText(`${nameLBL}`,499,887);

            //SUB LBL1 -  let subLBL1 = "GODRAYS"; //COSMOBLAST //BLASTABLACKHOLE
            newLayerZ = addLAYERZ(layerz);
            layerCTX = newLayerZ.getContext("2d");
            layerCTX.font="italic 22pt Verdana";
            layerCTX.shadowColor="skyblue";
            layerCTX.textBaseline = "bottom";
            layerCTX.textAlign = "center";
            layerCTX.shadowBlur=6;
            layerCTX.lineWidth=4;
            layerCTX.fillStyle = "#CCCCCC";
            layerCTX.strokeText(`${subLBL1}`,350,939);
            layerCTX.shadowBlur=2;
            layerCTX.fillStyle="steelblue";
            layerCTX.fillText(`${subLBL1}`,349,938);

            newLayerZ = addLAYERZ(layerz);
            layerCTX = newLayerZ.getContext("2d");
            layerCTX.font="italic 22pt Verdana";
            layerCTX.shadowColor="skyblue";
            layerCTX.textBaseline = "bottom";
            layerCTX.textAlign = "center";
            layerCTX.shadowBlur=6;
            layerCTX.lineWidth=4;
            layerCTX.fillStyle = "#CCCCCC";
            layerCTX.strokeText(`${subLBL2}`,630,939);
            layerCTX.shadowBlur=2;
            layerCTX.fillStyle="steelblue";
            layerCTX.fillText(`${subLBL2}`,629,938); 

            //DYNAMIC SET #DATESTAMP  _NUMBER RAN.
            var newLayerZ = addLAYERZ(layerz);
            layerCTX = newLayerZ.getContext("2d");
            layerCTX.fillStyle = "#333333";
            layerCTX.font = "10pt calibri";
            layerCTX.textBaseline = "top";
            layerCTX.textAlign = "right";
            layerCTX.fillText(`run ${DSTAMP}`, 890, 60);

            var newLayerZ = addLAYERZ(layerz);
            layerCTX = newLayerZ.getContext("2d");
            layerCTX.fillStyle = "#333333";
            layerCTX.font = "10pt calibri";
            layerCTX.textBaseline = "top";
            layerCTX.textAlign = "right";
            layerCTX.fillText(`cardz ${TOTAL_CARDZ}`, 940, 60);

            var newLayerZ = addLAYERZ(layerz);
            layerCTX = newLayerZ.getContext("2d");
            layerCTX.fillStyle = "#333333";
            layerCTX.font = "12pt calibri";
            layerCTX.textBaseline = "bottom";
            layerCTX.textAlign = "left";
            layerCTX.fillText(`kbz ${IDENTITY_BIT}`,33,940);

            //TODO _slvr _gold
        }
        drawNUMZ(_currentCardNum, selectedBITZ);
        paintLAYERZ(CANVAS_LAYERZ, layerz);    

        console.log("Writing IMAGE and METABITZ...",_currentCardNum)
        // const outputPATH = "./output1" //ACTUAL NAME OF THE IMAGES BEING SAVED TO EACH IMAGE FILE.
        let filePATH = `${new Date().toISOString().split("T")[0]}`
        // let filePATH = `${Date.now()}`
        if(!fs.existsSync(`./output1/images/${filePATH}`)){ fs.mkdirSync(`./output1/images/${filePATH}`); }
        fs.writeFileSync(`./output1/images/${filePATH}/KBZ_${_currentCardNum}.png`,canvas.toBuffer("image/png"))
        
        function setMETABITZ(){//COMPILE OPENSEA STYLE METADATA-. For Upload to IPFS through pinata-.
            let metaBIT = {}, idb=[], idbName ='';
            metaBIT.cardNum = _currentCardNum;
            metaBIT.name = `${OS_META_MODEL.namePrefix} #00${_currentCardNum}`;
            // console.log("set METABIT",metaBIT.name)
            metaBIT.description = OS_META_MODEL.description; //TODO LINK TO METANET!
            metaBIT.image = 'run ipfs to replace this uri';//`${IPFS_URI}/${_currentCardNum}.png`;     //IPFS PATH
            metaBIT.external_url = OS_META_MODEL.externalURL;
            metaBIT.youtube_url = OS_META_MODEL.youTubeURL;
            metaBIT.attributes = [] //connect to identitynet
            // metaBIT.attributes = IDENTITYNET[IDENTITY_BIT].bitz
            if(IDENTITYNET[IDENTITY_BIT] && IDENTITYNET[IDENTITY_BIT].bitz){
                for(var i=0; i<IDENTITYNET[IDENTITY_BIT].bitz.length;i++){
                    // idb = IDENTITYNET[IDENTITY_BIT].bitz[i]
                    idbName = IDENTITYNET[IDENTITY_BIT].bitz[i].name
                    if(METANET[idbName]){
                        console.log("PUSHING ATTRS:",idbName)
                        if(!METANET[idbName].attributes){
                            METANET[idbName].attributes = [];
                        }
                        metaBIT.attributes.push(...METANET[idbName].attributes)
                    }else {
                        console.log("No ATTRS:",idbName)
                    }
                    // console.log("PUSHING ATTRS:",METANET[idbName])
                }
            }
        
            METABITZOS.push(metaBIT)
        } setMETABITZ();
        function finishMETABITZ(){ //OPTIMIZATION: SAVE ONLY ONCE- at the end-.
            if(_currentCardNum===TOTAL_CARDZ){ //FINAL-CARD-. Finish METABITZ-.
                console.log("WRITE METABITZ:",METABITZOS.length,"of",TOTAL_CARDZ)
                // if(!fs.existsSync(`./output1/json/${DSTAMP}`)){ fs.mkdirSync(`./output1/json/${DSTAMP}`); }
                //  fs.writeFileSync(`./output1/json/${DSTAMP}/_metadataMAIN.json`, JSON.stringify(METABITZOS));
                 fs.writeFileSync(`./output1/json/_metadataMAIN.json`, JSON.stringify(METABITZOS));
                calculateRARITY();
                writeMETANETtoFILE();
            } //else{ console.log("not end",_currentCardNum) }
        } finishMETABITZ();
    });
    return true;//drawBITZ success
} //END drawBITZ

function startMETABITZ(){ //READ IN METANET from file, replicate STATE-.
    try {
        let rawdata = fs.readFileSync(`${rootPATH}/output1/json/KBZ_METANET.json`)
        let data = JSON.parse(rawdata);
        RARITYNET = data.RARITYNET;
        IDENTITYNET = data.IDENTITYNET;
        METANET = data.METANET;
        console.log("METANET - is alive!")
    } catch( e ) { return; }
}
function createKRYPTOBITZ(){ //IMAGE-CREATION-FACTORY 
    startMETABITZ();
    for(let i = 1; i <= TOTAL_CARDZ; i++){
        let result = drawBITZ(i,BITZSET) 
        if(!result){ //DUPLICATE-ROLL-BACK-. 
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
}
function writeMETANETtoFILE(){ //write to master-meta-net-.
    let METABITZ = {'RARITYNET':RARITYNET,'IDENTITYNET':IDENTITYNET,
                    'METANET':METANET,DSTAMP:new Date().toISOString()}

    console.log("WRITE-METABITZ",new Date().toISOString());
    var stream = fs.createWriteStream(`./output1/json/KBZ_METANET.json`, {flags:'w'}); //a append, w write-.
    // var stream = fs.createWriteStream(`./output1/KBZ_METANET_${new Date().toISOString().split(":")[0]}.json`, {flags:'a'});
    stream.write(`${JSON.stringify(METABITZ)}`);
    stream.end();

   console.log('collection UPDATE success')
} //end CALCULATERARITY

} 
main_NIFTYFACTORY();


// //EXAMPLE: GRADIENT-.
// //     var grad = ctx.createLinearGradient(0,0,200,0);
// // grad.addColorStop(0, "white");
// // grad.addColorStop(0.5, "red");
// // grad.addColorStop(1, "black");
// // ctx.fillStyle = grad;
// // ctx.fillRect(0,0,400,200);


// generativeART: NFTs, Banners, AVATARZ, trading cards, kryptokoinz, kryptobitz
// - various outputs: clean, signed, licensed, avatar cutout, video METALINK.
//METADATA -  Add extra TXT, LNK, VID, SND.

