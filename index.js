console.log('KRYPTOBITZ - Server on.')
const fs = require("fs");
const myArgs = process.argv.slice(2); //CMD LINE args. Split by space into Array;
const { createCanvas, loadImage} = require("canvas");
const {layers, width, height, editionNum} = require('./config1.js')

const canvas = createCanvas(width,height)
const ctx = canvas.getContext("2d")

const edition = (editionNum) ? editionNum : 1; ; //ARG, number of sets of krypto BITZ
let hash = []; //be able to rebuild img from hash.
let metadata = [];
let attributes = [];
let decodedHash = [];

// const edition = (myArgs.length > 0) ? Number(myArgs[0]) : 1; ; //ARG, number of sets of krypto BITZ
// const edition = 1; //number of sets of krypto BITZ
function saveLayer(_canvas, _edition){ //WHERE TO SAVE KRYPTOBIT-.
    // fs.writeFileSync("./output1/newImage.png",_canvas.toBuffer("image/png"))
    const outputPATH = "./output1"
    fs.writeFileSync(`${outputPATH}/newImage${_edition}.png`,_canvas.toBuffer("image/png"))
    console.log("IMAGE SAVED to  ",outputPATH)
}


const addMetadata = (_edition) => {
    let dateTime = Date.now();
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
async function drawLayer(_layer, _edition){ //Add RANDOMNESS-.
    let element = _layer.elements[ Math.floor(Math.random() * _layer.elements.length)     ]
    // addMetadata(element, _layer);
    console.log("IMG - ELEMENT: ", element)
    addAttributes(element, _layer)
    const image = await loadImage(`${_layer.location}${element.fileName}`)
    //const image = await loadImage("./assets_set1/kryptobitz_set1_sky4b.jpg")
    ctx.drawImage(image, _layer.position.y, _layer.position.x, _layer.size.width, _layer.size.height)
    // ctx.drawImage(image, 0, 0, 1000, 1000)
    console.log("create IMG layer: ", _edition, _layer.name, "with", element.name)
    saveLayer(canvas, _edition); //BITSETS converted into KRYPTOBITZ. $KBZ
}

//AUTO - GENERATE - generativeART: NFTs, Banners, AVATARZ, trading cards, kryptokoinz, kryptobitz
//AUTO - GENERATE - various outputs: clean, signed, licensed, avatar cutout, video METALINK.
//METADATA - GENERATED - with TOKEN. Record what happened. Add extra TXT.
function main(){
    //Create each Edition, BITSET, BITFLEX
    for(let i = 1; i <= edition; i++){
        layers.forEach((layer)=>{
            drawLayer(layer, i);
        });
        addMetadata(i)
        console.log("Edition: ",i)
    }

    fs.readFile("./output1/_metadata.json", (err, data) => {
        if (err) throw err;
        fs.writeFileSync("./output1/_metadata.json", JSON.stringify(metadata));
    })
}
main();