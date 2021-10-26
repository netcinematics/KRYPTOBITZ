console.log('KRYPTOBITZ - Server on.')
const fs = require("fs");
const { createCanvas, loadImage} = require("canvas");
const {layers, width, height} = require('./config1.js')

const canvas = createCanvas(width,height)
const ctx = canvas.getContext("2d")

const edition = 1; //number of sets of krypto BITZ
function saveLayer(_canvas, _edition){ //WHERE TO SAVE KRYPTOBIT-.
    // fs.writeFileSync("./output1/newImage.png",_canvas.toBuffer("image/png"))
    const outputPATH = "./output1"
    fs.writeFileSync(`${outputPATH}/newImage${_edition}.png`,_canvas.toBuffer("image/png"))
    console.log("IMAGE SAVED to  ",outputPATH)
}

//Random Layer, render inside image ctx.
async function drawLayer(_layer, _edition){ //Add RANDOMNESS-.
    let element = _layer.elements[ Math.floor(Math.random() * _layer.elements.length)     ]
    console.log("IMG - ELEMENT: ", element)
    const image = await loadImage(`${_layer.location}${element.fileName}`)
    // const image = await loadImage("./assets_set1/kryptobitz_set1_sky4b.jpg")
    ctx.drawImage(image, _layer.position.y, _layer.position.x, _layer.size.width, _layer.size.height)
    // ctx.drawImage(image, 0, 0, 1000, 1000)
    console.log("created IMG: ", _layer.name, "with", element.name)
    saveLayer(canvas, _edition); //BITSETS converted into KRYPTOBITZ. $KBZ
}

//AUTO - GENERATE - generativeART: NFTs, Banners, AVATARZ, trading cards, kryptokoinz, kryptobitz
//AUTO - GENERATE - various outputs: clean, signed, licensed, avatar cutout, video METALINK.
//METADATA - GENERATED - with TOKEN. Record what happened. Add extra TXT.
function main(){
    //Create each Edition, BITSET, BITFLEX
    for(let i = 1; (i-1)<= edition; i++){
        layers.forEach((layer)=>{
            drawLayer(layer, i);
        })
        console.log("Edition: ",i)
    }
}
main();