const express = require("express")
const Jimp = require("jimp")
const fs = require("fs/promises")
const { v4:uuidv4 } = require("uuid")

const app = express()

app.listen(3000, ()=>console.log("Escuchando puerto 3000"))



app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/index.html")
})

app.use(express.static("public"))

app.get("/imagen", async (req, res)=>{
    const { ruta } = req.query
    const nombreImagen = uuidv4().slice(0,6)

    const img = await Jimp.read(ruta)
       await img
        .resize(350, Jimp.AUTO)
        .greyscale()
        .writeAsync(nombreImagen + ".jpeg")

        res.setHeader("Content-Type", "image/png")
        res.sendFile(__dirname + "/" + nombreImagen + ".jpeg")
})