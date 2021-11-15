const fs = require("fs");
const DIR = __dirname; //C:\PROJECTS\KRYPTOBITZ
const width = 1000;
const height = 1000;
const TOTAL_CARDZ = 44;

let OS_META_MODEL = { //OpenSea metadata 
    namePrefix : "KRYPTOBITZ",
    description : "NFT Generative Art Project, 2021. HEROZ from KRYPTOSPAZE!",
    IPFS_URI : "ipfs://QmNnd35jakQqCHYHDfZhkFCFufaJRZcQTTsuAhX99G2Gtm",  //replacement uri-.
    youTubeURL : `https://www.youtube.com/watch?v=M1-hZgIlAkc`,
    externalURL : `https://netcinematics.github.io/CRYPTOSPAZE/`,
}

// getIMGFILES to array - each is variation
const getBITZ = (path)=>{ //BITZ - INNER BIT - LEVEL. SubBIT level. and SuperBIT levels.
    return fs.readdirSync(path) //Load-ALL-IMGS - from DYNO IMAGE PATH.
    .filter((item)=>{
        if(item.indexOf('.png') || item.indexOf('.jpg') || item.indexOf('.svg') ){
            return !/(^|\/)\.[^\/\.]/g.test(item)
        } 
        return [];
    })
    .map((txt,i)=>{ //Initial File 
        return {
            id:i+1,
            name:setName(txt),
            fileName:txt,
            //rarity:addRarity(txt)
        }
    })
}

const setName = (_str) => {    //converts image file name to text string
    let name = _str.slice(0, -4);
    return name;
}

/*****************************************************************************\
 * BITZSET - BITZ that make up the KRYPTOBITZ-. 
 * - CONCEPT: BIT-SEGMENTATION, or BIT-POLYPHONY-.
 * - BITSEG, like variations of layers, for short.
 * - The actual: SEGMENTATION of BITZ-. On a count to infinity-.
 * - Also BITPOLY - how variations can come in and change it. (TXT)(SND)(VID)
\*****************************************************************************/
const BITZSET = [  //LAYERZ of BITZ, in BITZSETS, chosen at random for view. Makes a KRYPTOBIT.
    {
        id:1,
        name:"starz",
        PATH: `${DIR}/assets_set1/starz/`,
        BITZ: getBITZ(`${DIR}/assets_set1/starz/`),
        size: {width:width,height:height},
        position: {x:0,y:0},
    },
    {
        id:2,
        name:"backgroundz",
        PATH: `${DIR}/assets_set1/bgz/`,
        BITZ: getBITZ(`${DIR}/assets_set1/bgz/`),
        size: {width:width,height:height},
        position: {x:0,y:0},
    },
    {
        id:3,
        name:"heroz",
        PATH: `${DIR}/assets_set1/heroz/`,
        BITZ: getBITZ(`${DIR}/assets_set1/heroz/`),
        size: {width:width,height:height},
        position: {x:0,y:0},
    },
    {
        id:4,
        name:"framez",
        PATH: `${DIR}/assets_set1/framez/`,
        BITZ: getBITZ(`${DIR}/assets_set1/framez/`),
        size: {width:width,height:height},
        position: {x:0,y:0},
    },
]

//TODO: TXT, useOnce, gld, slvr
//MODEL: "hero1a":{nameLBL:"", subLBL1:"", subLBL2:""}  <--LEGEND-.
/*****************************************************************************\
 * METANET - Add (infinite) data... off chain. IPFS - Layer 2-. TXT, SND, VID, LNK.
 * MODE-STORY, TXT card can be added here. _story
\*****************************************************************************/
const METANET = { //maps to the (dynamic) file names - to allow a METADATA (net) through dynamically.
   "hero1a":{nameLBL:"OrbyOrbot"}, 
   "hero2a":{nameLBL:"MaxzaDratz"}, 
   "hero3a":{nameLBL:"LukkeeDargon",TXT:["hi!"]},
   "hero4a":{nameLBL:"KriminalZawd"},
   "hero4b":{nameLBL:"Zawd Sees!", useOnce:1},
   "hero5a":{nameLBL:"DarkoBot"},
   "hero5b":{nameLBL:"DarkoBot Meta"},
   "hero5c":{nameLBL:"DarkoBot Ghost", useOnce:1},
   "hero6a":{nameLBL:"ZapBotz"},
   "hero6b":{nameLBL:"ZapBotz Meta"},
   "sky1a":{subLBL1:"HighNoonMoon"},
   "sky1b":{subLBL1:"Moonrise"},
   "sky1c":{subLBL1:"Moonset"},
   "sky2a":{subLBL1:"GodRayRise"},
   "sky2b":{subLBL1:"GodRayNoon"},
   "sky2c":{subLBL1:"GodRaySets"},
   "sky3a":{subLBL1:"CozmoBlast"},
   "sky3b":{subLBL1:"CozmoBlastBlackHole", useOnce:1},
   "sky4a":{subLBL1:"LonelyPlanet",useOnce:1},
   "sky4b":{subLBL1:"SunAndMoon"},
   "bg1a":{subLBL2:"DesertNight"},
   "bg1b":{subLBL2:"DesertDay"},
   "bg2a":{subLBL2:"Desolation"},
   "bg2b":{subLBL2:"DesolateNight"},
   "bg2c":{subLBL2:"NightRoad"},
   "bg2d":{subLBL2:"DarkRoad"},
   "bg3a":{subLBL2:"GreyMountains"},
   "bg3b":{subLBL2:"MountainRange"},
   "frame1a":{},
   "frame1b":{},
   "frame1c":{},
   "frame1d":{},
   "frame1e":{},
   "frame1f":{},
   "USEONCE":["hero4b","hero5c","sky3b","sky4a"]
//    "USEONCE":["hero1a","hero2a","hero3a","hero4a","hero4b","hero5c","sky3b","sky4a"]
}

function initMETANET_attributes(){ //separate "attributes", for TXT and other (TRAITS) to scale-.
    let metaKeys = Object.keys(METANET), metaKEY = ''
    // let printDateStr = `${new Date().toISOString().split("T")[0]}`
    // printDateStr += `_${new Date().toTimeString().split(':')[0]}_${new Date().toTimeString().split(':')[1]}`    
    for(var i=0; i<metaKeys.length;i++){
        metaKEY = metaKeys[i];
        if(metaKEY==='hero1a'){METANET[metaKEY].attributes=[
            {"trait_type":"HERO","value":"SPAZEBOT"}, 
            {"trait_type":"NAME","value":"OrbyOrbot"}, 
            {"display_type": "boost_number","trait_type":"RainboPower","value": 88}, 
            {"display_type": "boost_percentage","trait_type":"ZoomVision","value": 33}, 
        ]} else if (metaKEY==='hero2a'){METANET[metaKEY].attributes=[{"trait_type":"NAME","value":"MaxzaDratz"}, 
            {"trait_type":"HERO","value":"DRAT"}, 
            {"display_type": "boost_number","trait_type":"CleverWit","value": 44}, 
            {"display_type": "boost_percentage","trait_type":"Quickness","value": 55},             
        ]} else if (metaKEY==='hero3a'){METANET[metaKEY].attributes=[{"trait_type":"NAME","value":"LukkeeDargon"}, 
            {"trait_type":"HERO","value":"DARGON"}, 
            {"display_type": "boost_number","trait_type":"DeepWizdom","value": 88}, 
            {"display_type": "boost_percentage","trait_type":"Longevity","value": 77},             
        ]} else if (metaKEY==='hero4a'){METANET[metaKEY].attributes=[{"trait_type":"NAME","value":"KriminalZawd"}, 
            {"trait_type":"ANTIHERO","value":"ZAWD"}, 
            {"display_type": "boost_percentage","trait_type":"Heartlessness","value": 66},            
        ]} else if (metaKEY==='hero4b'){METANET[metaKEY].attributes=[{"trait_type":"NAME","value":"Zawd Sees!"}, 
            {"trait_type":"ANTIHERO","value":"ZAWD"}, 
            {"display_type": "boost_percentage","trait_type":"DeepWizdom","value": 11},            
        ]} else if (metaKEY==='hero5a'){METANET[metaKEY].attributes=[{"trait_type":"NAME","value":"DarkoBot"}, 
            {"trait_type":"ANTIHERO","value":"DARKOBOT"}, 
            {"display_type": "boost_percentage","trait_type":"Mezmorize","value": 11},            
        ]} else if (metaKEY==='hero5b'){METANET[metaKEY].attributes=[{"trait_type":"NAME","value":"DarkoBot Meta"}, 
            {"trait_type":"ANTIHERO","value":"DARKOBOT"}, 
            {"display_type": "boost_percentage","trait_type":"SuperSonic","value": 77},            
        ]} else if (metaKEY==='hero5c'){METANET[metaKEY].attributes=[{"trait_type":"NAME","value":"DarkoBot Ghost"}, 
            {"trait_type":"ANTIHERO","value":"DARKOBOT"}, 
            {"display_type": "boost_percentage","trait_type":"Invisibility","value": 55},            
        ]} else if (metaKEY==='hero6a'){METANET[metaKEY].attributes=[{"trait_type":"NAME","value":"ZapBotz"}, 
            {"trait_type":"ANTIHERO","value":"ZAPBOT"}, 
            {"display_type": "boost_number","trait_type":"PowerLazer","value": 22}, 
        ]} else if (metaKEY==='hero6b'){METANET[metaKEY].attributes=[{"trait_type":"NAME","value":"ZapBotz Meta"}, 
            {"trait_type":"ANTIHERO","value":"ZAPBOT"}, 
            {"display_type": "boost_number","trait_type":"PowerLazer","value": 22}, 
            {"display_type": "boost_percentage","trait_type":"ZapBlast","value": 88},             
        ]} else if (metaKEY==='sky1a'){METANET[metaKEY].attributes=[{"trait_type":"sky","value":"HighNoonMoon"}, 
        ]} else if (metaKEY==='sky1b'){METANET[metaKEY].attributes=[{"trait_type":"sky","value":"Moonrise"}, 
        ]} else if (metaKEY==='sky1c'){METANET[metaKEY].attributes=[{"trait_type":"sky","value":"Moonset"}, 
        ]} else if (metaKEY==='sky2a'){METANET[metaKEY].attributes=[{"trait_type":"sky","value":"GodRayRise"}, 
        ]} else if (metaKEY==='sky2b'){METANET[metaKEY].attributes=[{"trait_type":"sky","value":"GodRayNoon"}, 
        ]} else if (metaKEY==='sky2c'){METANET[metaKEY].attributes=[{"trait_type":"sky","value":"GodRaySets"}, 
        ]} else if (metaKEY==='sky3a'){METANET[metaKEY].attributes=[{"trait_type":"sky","value":"CozmoBlast"}, 
        ]} else if (metaKEY==='sky3b'){METANET[metaKEY].attributes=[{"trait_type":"sky","value":"CozmoBlastBlackHole"}, 
        ]} else if (metaKEY==='sky4a'){METANET[metaKEY].attributes=[{"trait_type":"sky","value":"LonelyPlanet"}, 
        ]} else if (metaKEY==='sky4b'){METANET[metaKEY].attributes=[{"trait_type":"sky","value":"SunAndMoon"}, 
        ]} else if (metaKEY==='bg1a'){METANET[metaKEY].attributes=[{"trait_type":"background","value":"DesertNight"}, 
        ]} else if (metaKEY==='bg1b'){METANET[metaKEY].attributes=[{"trait_type":"background","value":"DesertDay"}, 
        ]} else if (metaKEY==='bg2a'){METANET[metaKEY].attributes=[{"trait_type":"background","value":"Desolation"}, 
        ]} else if (metaKEY==='bg2b'){METANET[metaKEY].attributes=[{"trait_type":"background","value":"DesolateNight"}, 
        ]} else if (metaKEY==='bg2c'){METANET[metaKEY].attributes=[{"trait_type":"background","value":"NightRoad"}, 
        ]} else if (metaKEY==='bg2d'){METANET[metaKEY].attributes=[{"trait_type":"background","value":"DarkRoad"}, 
        ]} else if (metaKEY==='bg3a'){METANET[metaKEY].attributes=[{"trait_type":"background","value":"GreyMountains"}, 
        ]} else if (metaKEY==='bg3b'){METANET[metaKEY].attributes=[{"trait_type":"background","value":"MountainRange"}, 
        ]} else if (metaKEY==='frame1a'){METANET[metaKEY].attributes=[{"trait_type":"","value":"cyan"}, 
        ]} else if (metaKEY==='frame1b'){METANET[metaKEY].attributes=[{"trait_type":"frame_color","value":"purple"}, 
        ]} else if (metaKEY==='frame1c'){METANET[metaKEY].attributes=[{"trait_type":"frame_color","value":"green"}, 
        ]} else if (metaKEY==='frame1d'){METANET[metaKEY].attributes=[{"trait_type":"frame_color","value":"orange"}, 
        ]} else if (metaKEY==='frame1e'){METANET[metaKEY].attributes=[{"trait_type":"frame_color","value":"maroon"}, 
        ]} else if (metaKEY==='frame1f'){METANET[metaKEY].attributes=[{"trait_type":"frame_color","value":"red"}, 
        ]}//EXAMPLE //else {METANET[metaKEY].attributes=[{"trait_type":"example1","value":"valu1"}, 
            // {"display_type": "boost_number","trait_type":"SuperPower","value": 44}, 
            // {"display_type": "boost_percentage","trait_type":"Zoom Vision","value": 11}, 
            // {"display_type": "number","trait_type":"Run","value": new Date().toISOString().split("T")[0]}
        // ]}


    }
} initMETANET_attributes();

/*****************************************************************************\
 * END - METANET -
\*****************************************************************************/

/*****************************************************************************\
 * RARITYNET - initialize a COUNT of all SEGMENTS-. Calculate Ratio separately-.
\*****************************************************************************/
let RARITYNET = {} //simple count of occurence-.
function initRARITYNET(){
    RARITYNET = {}, bitLayerz = []; //FOR EACH of the BITZSETS BITZ length. Init blank grid in RARITYNET.
    for(let i=0; i<BITZSET.length;i++){ //layerz
        bitLayerz = BITZSET[i].BITZ; //total variations, from FILE read-.
        for(let j=0; j<bitLayerz.length ;j++){ //for each variation INIT RARITY MAP-.
            RARITYNET[ `${i+1}:${j+1}` ] = {count:0} //init all BIT-SEGMENT variations-.
        }
    }
}
initRARITYNET();
/*****************************************************************************\
 * END - RARITYNET -
\*****************************************************************************/

/*****************************************************************************\
 * IDENTITYNET - by key, populate IDENTITY BITZ-.
 * GUARANTEED UNIQUE SYSTEM - of MULTIPLE BATCHES OF CARDZ-.
 * The random selector, checks to see if unique ID exists.
 * With an IDENTITY HASH, write to file, to build...
 * DSTAMPED COMPLETE COLLECTORZ SETZ-. 
\*****************************************************************************/
let IDENTITYNET = {} //simple count of occurence-.
function initIDENTITYNET(){ //CONFIRMED UNIQUE IDB: identity bit-. (hash).
    //todo calculate every possible identity, to find the ones one yet chosen.
}
initIDENTITYNET();
/*****************************************************************************\
 * END - IDENTITYNET -
\*****************************************************************************/

/*****************************************************************************\
 * Connect to METANET - 
\*****************************************************************************/
// let METANET = {} //JSON object linked by ID across many platforms-.
// function initMETANET(){ 
    //todo this can look on IPFS to find... infinite LINKS of more data-.
// }
// initMETANET();
/*****************************************************************************\
 * END - METANET -
\*****************************************************************************/



//KRYPTOSCOPE - many images and text creating random scenes... telling a dimensional variation story.
//sometimes need to resize or position layers to match canvas, 1k, 1k.

//EXAMPLE2
//  console.log(layers[0].elements); //ELEMENTS are BITZ in BITSETZ
 //Read 1st BIT of BITSET, DYNOBITZ and STATICBITZ. DYNOBITSETS. Are randomly flexed.
 //Run validate BITZ, validated UNIQUE, calculate RANDOMNESS, each BIT has a BITRATE and a BITSCORE
 //SIGNIFICANTLY RARE CARD INSERTION: convert a small set of common cards to _sr
 //Add EXTRAZ - signature, and artist notes. 100%spazeFalcon.
//180 KRYPTOBITZ set 1  KBZv1
//1800 KRYPTOBITZ set 2  KBZv2
//18000 KRYPTOBITZ set 3  KBZv3


module.exports = {BITZSET, TOTAL_CARDZ, METANET, RARITYNET, IDENTITYNET, OS_META_MODEL, width, height}