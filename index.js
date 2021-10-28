console.log('KRYPTOBITZ - Server on.')
const fs = require("fs");
const myArgs = process.argv.slice(2); //CMD LINE args. Split by space into Array;
const { createCanvas, loadImage} = require("canvas");
const {layers, width, height, editionNum} = require('./config1.js')

const canvas = createCanvas(width,height)
const ctx = canvas.getContext("2d")

let dateStamp = `00000${Date.now()}`;
const rootPATH = __dirname; //C:\PROJECTS\VSCODE_PROJECTS\KRYPTOBITZ
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
    fs.writeFileSync(`${outputPATH}/kbz_${dateStamp}.png`,_canvas.toBuffer("image/png"))
    // fs.writeFileSync(`${outputPATH}/newImage${_edition}.png`,_canvas.toBuffer("image/png"))
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
async function drawLayer(_layer, _edition){ //Add RANDOMNESS-.
    let element = _layer.elements[ Math.floor(Math.random() * _layer.elements.length)     ]
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
    addIconIMG(_layer);
    const logo = await loadImage(`${rootPATH}\\copyrightNetCinematics\\nxlogo1.png`)
    const cp = await loadImage(`${rootPATH}\\copyrightNetCinematics\\cp1.png`)
    const tm = await loadImage(`${rootPATH}\\copyrightNetCinematics\\tm1.png`)
    ctx.drawImage(logo,18, 6, 55, 55)
    ctx.drawImage(cp,12, 950, 32, 32)
    ctx.drawImage(tm,980, 33, 32, 32)
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
}

const addNumberTxt = () => {
    ctx.fillStyle = "#333333";
    ctx.font = "bold 12pt calibri";
    ctx.textBaseline = "top";
    ctx.textAlign = "left";
    // ctx.fillText("1 of 1", 88, 22);
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
//EXAMPLE: GRADIENT-.
//     var grad = ctx.createLinearGradient(0,0,200,0);
// grad.addColorStop(0, "white");
// grad.addColorStop(0.5, "red");
// grad.addColorStop(1, "black");

// ctx.fillStyle = grad;
// ctx.fillRect(0,0,400,200);


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

    // fs.readFile("./output1/_metadata.json", (err, data) => {
        // if (err) throw err;
        fs.writeFileSync("./output1/_metadata.json", JSON.stringify(metadata));
    // })
}
main();