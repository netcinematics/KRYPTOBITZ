console.log('KRYPTOBITZ - Server on.')
const fs = require("fs");
const rootPATH = __dirname; //C:\PROJECTS\\KRYPTOBITZ //todo maybe remove
let DSTAMP= new Date().toISOString().split("T")[0]; //simple date, use FULL ISO as ISO-STAMP in other places. //todo maybe remove
let DATE_STAMP_TAG = `${new Date().toISOString().split("T")[0]}`; //STRING TAG for nice DATE STAMP-.
DATE_STAMP_TAG += `_${new Date().toTimeString().split(':')[0]}_${new Date().toTimeString().split(':')[1]}`;   
//HINT: change new set number on config file-.
let {BITZSET, TOTAL_CARDZ, SET_TXT, BUILD_LIB, METANET, RARITYNET, IDENTITYNET, OS_META_MODEL, width, height} = require('./config_set002.js')

const COMMANDZ = process.argv.slice(2); //CMD LINE args. -> node index 2
/****************************************************\
 * IPFS update uri - MODE-. 
 * RUN:  node index 2  //look for _setNUM   
 * RESULT: to replace the IFPS PATH from CONFIG.
\****************************************************/
if(COMMANDZ[0]==='2'){ //IPFS MODE-.
    let publishDateStr = `${new Date().toISOString().split("T")[0]}`
    publishDateStr += `_${new Date().toTimeString().split(':')[0]}_${new Date().toTimeString().split(':')[1]}` 
    console.log('RUNNING IN IPFS IMAGE UPDATE MODE',publishDateStr);
    console.log('Updating Metadata files with IPFS base URI')
    console.log('NOTE: do not run twice. It may duplicate signature attribute.')
    //FILE READ: IPFS REPLACE, from METADATAMAIN.
    let rawdata = fs.readFileSync(`${rootPATH}/${BUILD_LIB}/json/_metadataMAIN.json`);
    let data = JSON.parse(rawdata);
    data.forEach((item) => {  //Update metadata to OpenSea data structure
        console.log("UPDATE IPFS",item.name)
        item.image = `${OS_META_MODEL.IPFS_URI}/${item.cardNum}.png`;     //IPFS PATH
        item.signature_date = new Date().toISOString();
        // item.attributes.push( //DEFAULT ATTRIBUTES.
        //     {"trait_type":"SERIES","value":"KRYPTOBITZ"}, 
        //     {"trait_type":"SET","value":"1"}, 
        //     {"trait_type":"YEAR","value":"2021"}, 
        //     {"trait_type":"ARTIST","value":"SPAZEFALCON"}, 
        //     {"trait_type":"publish_date","value":publishDateStr} 
        // );
            //todo move this to config, and maybe prior loop?

        //FILE: WRITE - out IPFS JSON, to each NUMBERED FILE. No Need to Back. Can generate from Main-.
        if(!fs.existsSync(`./${BUILD_LIB}/json/${publishDateStr}`)){ fs.mkdirSync(`./${BUILD_LIB}/json/${publishDateStr}`); }
        fs.writeFileSync(`${rootPATH}/${BUILD_LIB}/json/${publishDateStr}/${item.cardNum}.json`,
            JSON.stringify(item, null, 2)
        );
    });
    //FILE: WRITE - OUT IPFS REPLACEMENT in METADATA MAIN.
    if(!fs.existsSync(`./${BUILD_LIB}/json`)){ fs.mkdirSync(`./${BUILD_LIB}/json`); }
    fs.writeFileSync(  
      `${rootPATH}/${BUILD_LIB}/json/_metadataMAIN.json`, JSON.stringify(data, null, 2)
    ); //todo remove rootpath, to ./

    //BAK - METADATA MAIN. dated on folder. Possible to hydrate prior runs, different run codes, new sets.
    // let DATE_STAMP_TAG = `${new Date().toISOString().split("T")[0]}`
    // DATE_STAMP_TAG += `_${new Date().toTimeString().split(':')[0]}_${new Date().toTimeString().split(':')[1]}`        
    if(!fs.existsSync(`./${BUILD_LIB}/json/bak/${DATE_STAMP_TAG}`)){ fs.mkdirSync(`./${BUILD_LIB}/json/bak/${DATE_STAMP_TAG}`); }
    fs.writeFileSync(
        `./${BUILD_LIB}/json/bak/${DATE_STAMP_TAG}/_metadataMAIN.json`, JSON.stringify(data, null, 2)
    );
    return; //END SCRIPT-.
}//END IPFS MODE--------------------------------.

/****************************************************\
 * BUILD-IMG - MODE ->  KRYPTO-FACTORY! //TODO rename proj-.
\****************************************************/
const { createCanvas, loadImage} = require("canvas");
const canvas = createCanvas(width,height)
const ctx = canvas.getContext("2d")

let METABITZ_OS = [] //OpenSea Metdata BITZ-.console.log("Running IMG mode, creation date:",DSTAMP);
let dupe = null

function main_NIFTYFACTORY(){ //todo KryptoFactory
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
    let selectedBITZ = [], randomBIT = null, useOnce=0;
    let firstLast = (_currentCardNum===1 || _currentCardNum===TOTAL_CARDZ)?1:0;
    
    //RANDOM SELECTOR: Calclulate which images get in, an array of IMG-PATHS
   for( let i = 0; i<_BITZSET.length;i++){
       randomBIT = _BITZSET[i].BITZ[ Math.floor(Math.random() * _BITZSET[i].BITZ.length)     ] //RANDOM PICK a BITSET
       console.log("SELECTED-BIT", randomBIT.name)


       if(METANET["USEONCE"].indexOf(randomBIT.name) > -1){ //FOUND a USEONCE BIT in random selection.
            // console.log("FOUND a USEONCE")
            // if(RARITYNET[randomBIT.name] && RARITYNET[randomBIT.name].count){
            //     console.log("USEONCE DUPLICATE DETECTED",randomBIT.name, "RERUN" )
            //     _currentCardNum--; //TRY AGAIN-.
            //     return false;
            // } else {
                METANET["USEONCE"].splice(METANET["USEONCE"].indexOf(randomBIT.name),1) //once
                console.log("ONE-OF-A-KIND FIND!",randomBIT.name)
                randomBIT.useOnce = 1;
                // RARITYNET[randomBIT.name].useOnce = 1;
                useOnce = randomBIT;
                // RARITYNET[randomBIT.name].useOnce = 1; //flag rarity net-.
            // }
       } else if(firstLast){ //ADD on a SLVR
            randomBIT.firstLast = 1;
        //   RARITYNET[randomBIT.name].useOnce = 1;
       }
       randomBIT.PATH = _BITZSET[i].PATH;
       selectedBITZ.push(randomBIT)
   }
//    let selectedBITZ = [], randomBIT = null;
//    for( let i = 0; i<_BITZSET.length;i++){
//        randomBIT = _BITZSET[i].BITZ[ Math.floor(Math.random() * _BITZSET[i].BITZ.length)     ] //RANDOM PICK a BITSET
//     //    console.log("SELECTED-BIT", randomBIT)
//        randomBIT.PATH = _BITZSET[i].PATH;
//        selectedBITZ.push(randomBIT)
//    }
   // INIT IDENTITY 
   let bitSegment = null, IDENTITY_BIT = '';
   for(let i = 0; i<selectedBITZ.length;i++){ //INIT ID for Confirmed Originality-.
        bitSegment = `${i+1}:${selectedBITZ[i].id}`;
        IDENTITY_BIT += `${bitSegment}${(i+1===selectedBITZ.length)?'':'.'}`
    }
    //********************************************TEST DUPES
    // if(useonce){
    //     // IDENTITY_BIT += '_gld'
    // }
    // let rKeyz = Object.keys(IDENTITYNET);
    // if(rKeyz.length && !dupe){
    //     dupe = rKeyz[0];
    //     IDENTITY_BIT = dupe; //TEST DUPE OVERRIDE-.
    // }
    //********************************************TEST DUPES
    //UNIQUENESS: TEST IF selectedBITZ are UNIQUE
    if(IDENTITYNET[IDENTITY_BIT] && IDENTITYNET[IDENTITY_BIT].useOnce){
        console.log('USE ONCE DETECTED:', IDENTITY_BIT, "RERUN"); 
        _currentCardNum--; //TRY AGAIN-.
        return false;
    } else if(IDENTITY_BIT && !IDENTITYNET[IDENTITY_BIT]){ //CONFIRMED UNIQUE-.
        IDENTITYNET[IDENTITY_BIT] = {bitz:selectedBITZ};  //COMPOSE-IDENTITY-BITZ.
        if(useOnce){IDENTITYNET[IDENTITY_BIT].useOnce = 1;}
        else if(firstLast){IDENTITYNET[IDENTITY_BIT].firstLast = 1;}
    } else { //DUPLICATE!
        console.log('DUPLICATE DETECTED:', IDENTITY_BIT, "iteration", _currentCardNum,"RERUN"); 
        _currentCardNum--; //TRY AGAIN-.
        return false;
    }
    //COUNT-OCCURRENCE (of BIT segment) - for RARITY Analytics-.
    for(let i = 0; i<selectedBITZ.length;i++){ 
        bitSegment = `${i+1}:${selectedBITZ[i].id}`; //the singular variation. Layer count.
        if(RARITYNET[bitSegment]){ //FOUND: add COUNT-.
            RARITYNET[bitSegment].count += 1; //Simple count of the used SEGMENT-.
            if(useOnce){ RARITYNET[bitSegment].useOnce = 1 } //flag to add to ratio-.
            else if(firstLast){ RARITYNET[bitSegment].firstLast = 1 }
        } else { debugger; console.log("Not initialized.","INIT SYSTEM needs to init this.")
            RARITYNET[bitSegment] = {count:1};
        }
    }

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
        promisedBITZ.push( imgPromise )
    }
    
    if(useOnce){ //ADD on a GLDFRM-.
       let imgPromise = loadImage(`${rootPATH}\\copyrightNetCinematics\\frame1_gld.png`)
       promisedBITZ.push( imgPromise )
    } else if(firstLast){ //ADD on a SLVRFRM-.
       let imgPromise = loadImage(`${rootPATH}\\copyrightNetCinematics\\frame1_slvr.png`)
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
            //TODO dynamic year
        
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
                    //TODO slv gld : display flag
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

            //HINT: NAME LBL -  let nameLBL = "OrbyOrbot";
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

            //HINT: SUB LBL1 -  let subLBL1 = "GODRAYS"; //COSMOBLAST //BLASTABLACKHOLE
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

            //HINT: DYNAMIC SET #DATESTAMP  _NUMBER RAN.
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
            layerCTX.fillText(`cardz ${TOTAL_CARDZ}`, 944, 60);

            var newLayerZ = addLAYERZ(layerz);
            layerCTX = newLayerZ.getContext("2d");
            layerCTX.fillStyle = "#333333";
            layerCTX.font = "10pt calibri";
            layerCTX.textBaseline = "top";
            layerCTX.textAlign = "right";
            layerCTX.fillText(`cardz ${SET_TXT}`, 964, 80);

            var newLayerZ = addLAYERZ(layerz);
            layerCTX = newLayerZ.getContext("2d");
            layerCTX.fillStyle = "#333333";
            layerCTX.font = "12pt calibri";
            layerCTX.textBaseline = "bottom";
            layerCTX.textAlign = "left";
            layerCTX.fillText(`kbz:${IDENTITY_BIT}`,33,940);

            //slvr n gld
            if(useOnce){
                var newLayerZ = addLAYERZ(layerz);
                layerCTX = newLayerZ.getContext("2d");
                layerCTX.fillStyle = "gold";
                layerCTX.font = "12pt calibri";
                layerCTX.textBaseline = "bottom";
                layerCTX.textAlign = "left";
                layerCTX.fillText(`goldencard`,880,950);
            } else if(firstLast) {
                var newLayerZ = addLAYERZ(layerz);
                layerCTX = newLayerZ.getContext("2d");
                layerCTX.fillStyle = "silver";
                layerCTX.font = "12pt calibri";
                layerCTX.textBaseline = "bottom";
                layerCTX.textAlign = "left";
                layerCTX.fillText(`silvercard`,880,950);               
            }


        }
        drawNUMZ(_currentCardNum, selectedBITZ);
        paintLAYERZ(CANVAS_LAYERZ, layerz);    

        console.log("Writing IMAGE and METABITZ...",_currentCardNum)

        //FILE WRITE: NUMBERED IMAGES (png)
        if(!fs.existsSync(`./${BUILD_LIB}/IMGZ`)){ fs.mkdirSync(`./${BUILD_LIB}/IMGZ`); }
        fs.writeFileSync(`./${BUILD_LIB}/IMGZ/${_currentCardNum}.png`,canvas.toBuffer("image/png"))
        //BAK IMGZ, to ignored bak folder. dated on folder. Has the stamp on the card.
        // let DATE_STAMP_TAG = `${new Date().toISOString().split("T")[0]}`
        // DATE_STAMP_TAG += `_${new Date().toTimeString().split(':')[0]}_${new Date().toTimeString().split(':')[1]}`        
        if(!fs.existsSync(`./${BUILD_LIB}/bak`)){ fs.mkdirSync(`./${BUILD_LIB}/bak`); } //TODO this above KBZ_MetaNET?
        if(!fs.existsSync(`./${BUILD_LIB}/bak/${DATE_STAMP_TAG}`)){ fs.mkdirSync(`./${BUILD_LIB}/bak/${DATE_STAMP_TAG}`); }
        fs.writeFileSync(`./${BUILD_LIB}/bak/${DATE_STAMP_TAG}/${_currentCardNum}.png`,canvas.toBuffer("image/png"))
        
        function setMETABITZ(){//COMPILE OPENSEA STYLE METADATA-. For Upload to IPFS through pinata-.
            let metaBIT = {}, idb=[], idbName ='';
            metaBIT.identity = IDENTITY_BIT;
            metaBIT.cardNum = _currentCardNum;
            metaBIT.print_date = new Date().toISOString();
            metaBIT.name = `${OS_META_MODEL.namePrefix} #00${_currentCardNum}`;
            // console.log("set METABIT",metaBIT.name)
            metaBIT.description = OS_META_MODEL.description + `\n NFT Collectible by spazeFalcon. All Rights Reserved 2021.`; 
            
            //nogo LINK TO METANET!

            metaBIT.image = 'run ipfs to replace this uri';//`${IPFS_URI}/${_currentCardNum}.png`;     //IPFS PATH
            metaBIT.external_url = OS_META_MODEL.externalURL;
            metaBIT.youtube_url = OS_META_MODEL.youTubeURL;
            if(useOnce){ metaBIT.useOnce = 1; }
            else if(firstLast){ metaBIT.firstLast = 1; }
            metaBIT.attributes = [] //connect to identitynet
            //UPDATE-ATTRIBUTES from config
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
            if(useOnce){
                metaBIT.attributes.push( 
                    {"trait_type":"STATUS","value":"SUPER-RARE","display_type": "boost_percentage"}, 
                    {"trait_type":"GLD","value":"GOLDEN-CARD","display_type": "boost_percentage"}, 
                );
            }
            if(firstLast){
                metaBIT.attributes.push(
                    {"trait_type":"STATUS","value":"RARE","display_type": "boost_percentage"}, 
                    {"trait_type":"SLVR","value":"SILVER-CARD","display_type": "boost_percentage"}, 
                );
            }
            METABITZ_OS.push(metaBIT)
        } setMETABITZ();
        function finishMETABITZ(){ //OPTIMIZATION: SAVE ONLY ONCE- at the end-.
            if(_currentCardNum===TOTAL_CARDZ){ //FINAL-CARD-. Finish METABITZ-.
                console.log("WRITE METABITZ:",METABITZ_OS.length,"of",TOTAL_CARDZ)
                calculateRARITY();
                //FILE WRITE: METADATA MAIN - original run. No need to BAK. Still needs IPFS-.
                if(!fs.existsSync(`./${BUILD_LIB}/json`)){ fs.mkdirSync(`./${BUILD_LIB}/json`); }
                 fs.writeFileSync(`./${BUILD_LIB}/json/_metadataMAIN.json`, JSON.stringify(METABITZ_OS));
                writeMETANETtoFILE(); 
            } //else{ console.log("not end",_currentCardNum) }
        } finishMETABITZ();
    });
    return true;//drawBITZ success
} //END drawBITZ

function startMETABITZ(){ 
    try {
        //FILE READ IN METANET from file, replicate STATE-.
        // let rawdata = fs.readFileSync(`${rootPATH}/${BUILD_LIB}/json/KBZ_METANET.json`)
        let rawdata = fs.readFileSync(`${rootPATH}/KBZ_METANET_${SET_TXT}.json`)
        let data = JSON.parse(rawdata);
        RARITYNET = data.RARITYNET;
        IDENTITYNET = data.IDENTITYNET;
        METANET = data.METANET;
        console.log("METANET - is alive!")
    } catch( e ) { return; }
}
function createKRYPTOBITZ(){ //IMAGE-CREATION-FACTORY 
    // startMETABITZ(); //CONNECT WITH METANET-.
    for(let i = 1; i <= TOTAL_CARDZ; i++){
        let result = drawBITZ(i,BITZSET) 
        if(!result){ //DUPLICATE-ROLL-BACK-. 
            i--; debugger;
        }
    }
} createKRYPTOBITZ();

function calculateRARITY(){
    console.log("CALCULATE RARITY.", "BITRATIO: useCount (1:2) / totalCardz",TOTAL_CARDZ)
 //**************ORIGINALITY************RARITY****************
   //ALL CARDZ are SELECTED. and UNIQUE, CALCULATE RARITY-.
   let rarityKEYS = Object.keys(RARITYNET);
   for(let i=0; i<rarityKEYS.length;i++ ){ //calculate rarity ratio for SEGMENTS-.
       if(!RARITYNET[rarityKEYS[i]].count){continue} //skip zero-.
       RARITYNET[rarityKEYS[i]].ratio = parseFloat(Number(RARITYNET[rarityKEYS[i]].count/TOTAL_CARDZ).toFixed(2));
       console.log("BIT-RATIO: bit use",rarityKEYS[i],"across set is",RARITYNET[rarityKEYS[i]].ratio )
   }

   console.log("CALCULATE: NFT-RARITY");
   console.log("Add up BIT Rarity Ratios, for AVG RARITY RATIO.")
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
        if(aNIFTY.useOnce || aNIFTY.firstLast){ //ADD on a gld n silvr
            console.log('GLD or SLVR Rarity Detected.')
            let aRatio = 1/TOTAL_CARDZ;
            NIFTYRARITYRATIO += aRatio;
            bitSPLIT.push(1)
            bitSPLIT.push(2)
            bitSPLIT.push(3)
            bitSPLIT.push(4)
            bitSPLIT.push(5)
            bitSPLIT.push(6)
            bitSPLIT.push(7)
        }
        aNIFTY.rarity.NFTRARITYRATIO = parseFloat(Number(NIFTYRARITYRATIO / bitSPLIT.length).toFixed(2));
        aNIFTY.rarity.NFTRARITYGRADE = Number(1 - aNIFTY.rarity.NFTRARITYRATIO).toFixed(2);
        console.log("NFT-RARITY:",bitKEY,"RATIO:", aNIFTY.rarity.NFTRARITYRATIO,"SCORE:",aNIFTY.rarity.NFTRARITYGRADE)
        
        //TODO: IDENTITYNET calculate 1st, last, middle card as _slvr_last_1st _once_gld

        //UPDATE RARITY SCORES in ATTRIBUTES - before writing to METAMAIN
        let bitItem = null;
        for(var k = 0; k<METABITZ_OS.length; k++){
            bitItem = METABITZ_OS[k];
            if(bitItem.identity===bitKEY){
                bitItem.attributes.push(
                    {"display_type": "boost_number","trait_type":"RARE-GRADE","value": aNIFTY.rarity.NFTRARITYGRADE}, 
                    {"display_type": "boost_percentage","trait_type":"RARE-RATIO","value": aNIFTY.rarity.NFTRARITYRATIO}  
                )
                break;
            }
        }
   }
}

function writeMETANETtoFILE(){ //write to master-meta-net-.
    let METABITZ = {'RARITYNET':RARITYNET,'IDENTITYNET':IDENTITYNET,
                    'METANET':METANET,DSTAMP:new Date().toISOString()}

    //FILE WRITE: METABITZ - the entire run state into FILE-. For reloading not BAK.
    console.log("WRITE-METABITZ",new Date().toISOString());
    var stream = fs.createWriteStream(`./KBZ_METANET_${SET_TXT}.json`, {flags:'w'}); //a append, w write-.
    // var stream = fs.createWriteStream(`./${BUILD_LIB}/json/KBZ_METANET.json`, {flags:'w'}); //a append, w write-.
    // var stream = fs.createWriteStream(`./${BUILD_LIB}/KBZ_METANET_${new Date().toISOString().split(":")[0]}.json`, {flags:'a'});
    stream.write(`${JSON.stringify(METABITZ)}`);
    stream.end();

    //FILE WRITE: BAK METANET - the entire run state into FILE-.
    // let DATE_STAMP_TAG = `${new Date().toISOString().split("T")[0]}`
    // DATE_STAMP_TAG += `_${new Date().toTimeString().split(':')[0]}_${new Date().toTimeString().split(':')[1]}`        
    // if(!fs.existsSync(`./${BUILD_LIB}/bak`)){ fs.mkdirSync(`./${BUILD_LIB}/bak/${DATE_STAMP_TAG}`); }
    // fs.writeFileSync(
    //     `./${BUILD_LIB}/bak/${DATE_STAMP_TAG}/KBZ_METANET.json`, JSON.stringify(METABITZ)
    // );


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

