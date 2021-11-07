const fs = require("fs");
const DIR = __dirname; //C:\PROJECTS\KRYPTOBITZ
const width = 1000;
const height = 1000;
const TOTAL_CARDZ = 3;

let OS_META_MODEL = { //OpenSea metadata 
    namePrefix : "KRYPTOBITZ",
    description : "NFT Generative Art Project, 2021. HEROZ from KRYPTOSPAZE!",
    IPFS_URI : "ipfs://...Replaced_with_IPFS_uri...",
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

//TODO: TXT, useOnce
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
   "sky3b":{subLBL1:"CozmoBlastBlackHole"},
   "sky4a":{subLBL1:"LonelyPlanet"},
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
}

function initMETANET_attributes(){
    let metaKeys = Object.keys(METANET), metaKEY = ''
    for(var i=0; i<metaKeys.length;i++){
        metaKEY = metaKeys[i];
        if(metaKEY==='hero1a'){METANET[metaKEY].attributes=[
            {"trait_type":"HERO","value":"SPAZEBOT"}, 
            {"display_type": "boost_number","trait_type":"LazerPower","value": 44}, 
            {"display_type": "boost_percentage","trait_type":"ZoomVision","value": 11}, 
            {"display_type": "number","trait_type":"Run","value": new Date().toISOString().split("T")[0]}
        ]} else if (metaKEY==='frame1a'){METANET[metaKEY].attributes=[{"trait_type":"frame_color","value":"cyan"}, 
        ]} else if (metaKEY==='frame1b'){METANET[metaKEY].attributes=[{"trait_type":"frame_color","value":"purple"}, 
        ]} else if (metaKEY==='frame1c'){METANET[metaKEY].attributes=[{"trait_type":"frame_color","value":"green"}, 
        ]} else if (metaKEY==='frame1d'){METANET[metaKEY].attributes=[{"trait_type":"frame_color","value":"orange"}, 
        ]} else if (metaKEY==='frame1e'){METANET[metaKEY].attributes=[{"trait_type":"frame_color","value":"maroon"}, 
        ]} else if (metaKEY==='frame1f'){METANET[metaKEY].attributes=[{"trait_type":"frame_color","value":"red"}, 
        ]} else {METANET[metaKEY].attributes=[{"trait_type":"example1","value":"valu1"}, 
            // {"display_type": "boost_number","trait_type":"SuperPower","value": 44}, 
            // {"display_type": "boost_percentage","trait_type":"Zoom Vision","value": 11}, 
            // {"display_type": "number","trait_type":"Run","value": new Date().toISOString().split("T")[0]}
        ]}
    }
} initMETANET_attributes();

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
    //TODO read IDENTITYNET from file BTZ_IDENTITYNET_date
    //TODO write to IDENTITYNET, all the new cardz, and IPFS? 
    //Or maybe just DSTAMP born (birthday)
}
initIDENTITYNET();
/*****************************************************************************\
 * END - IDENTITYNET -
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