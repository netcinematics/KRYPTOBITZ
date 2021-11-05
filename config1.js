const fs = require("fs");
const dir = __dirname; //C:\PROJECTS\VSCODE_PROJECTS\KRYPTOBITZ
const width = 1000;
const height = 1000;
// const editionNum = 2; //number of sets to run
const totalCARDZ = 3;

const IPFS_URI = "ipfs://Qm..."

// getIMGFILES to array - each is variation
const getBITZ = (path)=>{ //BITZ - INNER BIT - LEVEL. SubBIT level. and SuperBIT levels.
    return fs.readdirSync(path) //Load-ALL-IMGS, from DYNO IMAGE PATH.
    .filter((item)=>{
        if(item.indexOf('.png') || item.indexOf('.jpg') || item.indexOf('.svg') ){
            return !/(^|\/)\.[^\/\.]/g.test(item)
        } 
        return [];

        // return !/(^|\/)\.[^\/\.]/g.test(item)
    })
    .map((txt,i)=>{ //Initial File 


        return {
            id:i+1,
            name:cleanName(txt),
            fileName:txt,
            //rarity:addRarity(txt)
        }
    })
}


//Rename to getIMGFILES to array - each is variation
// const getElements = (path)=>{ //BITZ - INNER BIT - LEVEL. SubBIT level. and SuperBIT levels.
//     return fs.readdirSync(path) //Load-ALL-IMGS, from DYNO PATH.
//     .filter((item)=>{
//         if(item.indexOf('.png') || item.indexOf('.jpg') || item.indexOf('.svg') ){
//             return !/(^|\/)\.[^\/\.]/g.test(item)
//         } 
//         return [];
//     })
//     .map((i,index)=>{
//         return {
//             id:index+1,
//             name:cleanName(i),
//             fileName:i,
//             rarity:addRarity(i)
//         }
//     })
// }

// const rarity = [
//     { key:"", val:"original"},
//     { key:"_r", val:"rare"},
//     { key:"_sr", val:"super rare"},
// ]

// const addRarity = (_str)=>{
//     let itemRarity;
//     rarity.forEach((r) => { //if "" or "_r" or "_sr" in file name.
//         if(_str.includes(r.key)) {
//             itemRarity = r.val;
//         }
//     });
//     return itemRarity;
// }

const cleanName = (_str) => {    //converts image file name to text string
    let name = _str.slice(0, -4);
    // rarity.forEach((r)=>{
    //     name = name.replace(r.key,"");
    // });
    return name;
}


const BITZSET = [  //LAYERS of VARIANT BITZ, in BITZSETS, chosen at random for view.
    {
        id:1,
        name:"layer1 starz",
        PATH: `${dir}/assets_set1/starz/`,
        BITZ: getBITZ(`${dir}/assets_set1/starz/`),
        size: {width:width,height:height},
        position: {x:0,y:0},
    },
    {
        id:2,
        name:"layer2 bgz",
        PATH: `${dir}/assets_set1/bgz/`,
        BITZ: getBITZ(`${dir}/assets_set1/bgz/`),
        size: {width:width,height:height},
        position: {x:0,y:0},
    },
    {
        id:3,
        name:"layer3 hero",
        PATH: `${dir}/assets_set1/heroz/`,
        BITZ: getBITZ(`${dir}/assets_set1/heroz/`),
        size: {width:width,height:height},
        position: {x:0,y:0},
    },
    {
        id:4,
        name:"layer4 frame",
        PATH: `${dir}/assets_set1/framez/`,
        BITZ: getBITZ(`${dir}/assets_set1/framez/`),
        size: {width:width,height:height},
        position: {x:0,y:0},
    },

]

const METANET = { //maps to the (dynamic) file names - to allow a METADATA (net) through dynamically.
//    "hero1a":{nameLBL:"", subLBL1:"", subLBL2:""}  <--LEGEND-.
   "hero1a":{nameLBL:"OrbyOrbot"}, //TODO by MODE-STORY, TXT card can be added here. _story
   "hero2a":{nameLBL:"MaxzaDratz"}, //TODO tm placements here too
   "hero3a":{nameLBL:"LukkeeDargon"},
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

}

let RARITYNET = {}
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

//KRYPTOSCOPE - many images and text creating random scenes... telling a dimensional variation story.
//sometimes need to resize or position layers to match canvas, 1k, 1k.
// const layers = [
// {
//     id:1,
//     name:"layer1 starz",
//     location: `${dir}/assets_set1/starz/`,
//     elements: getElements(`${dir}/assets_set1/starz/`),
//     size: {width:width,height:height},
//     position: {x:0,y:0},
// },
// {
//     id:2,
//     name:"layer2 bgz",
//     location: `${dir}/assets_set1/bgz/`,
//     elements: getElements(`${dir}/assets_set1/bgz/`),
//     size: {width:width,height:height},
//     position: {x:0,y:0},
// },
// {
//     id:3,
//     name:"layer3 char",
//     location: `${dir}/assets_set1/heroz/`,
//     elements: getElements(`${dir}/assets_set1/heroz/`),
//     size: {width:width,height:height},
//     position: {x:0,y:0},
// },
// {
//     id:4,
//     name:"layer4 frame",
//     location: `${dir}/assets_set1/framez/`,
//     elements: getElements(`${dir}/assets_set1/framez/`),
//     size: {width:width,height:height},
//     position: {x:0,y:0},
// },
// // {
// //     id:5,
// //     name:"layer5 bg",
// //     location: `${dir}/background/`,
// //     position: {x:0,y:0},
// //     size: {width:width,height:height}
// // },
// ]




//EXAMPLE1
//console.log(layers)
// {
//     id: 3,
//     name: 'layer3 char',
//     imgPath: 'C:\\PROJECTS\\VSCODE_PROJECTS\\KRYPTOBITZ/assets_set1/',
//     position: { x: 0, y: 0 },
//     elements: [
//       [Object], [Object], [Object],
//       [Object], [Object], [Object],
//       [Object], [Object], [Object],
//       [Object], [Object], [Object],
//       [Object], [Object], [Object],
//       [Object], [Object], [Object],
//       [Object], [Object], [Object],
//       [Object], [Object], [Object],
//       [Object], [Object], [Object]
//     ],
//     size: { width: 1000, height: 1000 }
//   }
//EXAMPLE2
//  console.log(layers[0].elements); //ELEMENTS are BITZ in BITSETZ
 //Read 1st BIT of BITSET, DYNOBITZ and STATICBITZ. DYNOBITSETS. Are randomly flexed.
 //Run validate BITZ, validated UNIQUE, calculate RANDOMNESS, each BIT has a BITRATE and a BITSCORE
 //SIGNIFICANTLY RARE CARD INSERTION: convert a small set of common cards to _sr
 //Add EXTRAZ - signature, and artist notes. 100%spazeFalcon.
//180 KRYPTOBITZ set 1  KBZv1
//1800 KRYPTOBITZ set 2  KBZv2
//18000 KRYPTOBITZ set 3  KBZv3





 // {
//     id: 22,
//     name: 'cleanName(i)',
//     fileName: 'kryptobitz_set1_sky2c.jpg',
//     rarity: 'addRarity(i)'
//   },

module.exports = {BITZSET, totalCARDZ, METANET, RARITYNET, width, height}
// module.exports = {layers, width, height, editionNum, BITZSET, totalCARDZ, METANET, RARITYNET}