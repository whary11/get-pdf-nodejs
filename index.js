let express = require("express");
let app = express();
let ejs = require("ejs");
let pdf = require("html-pdf");
let path = require("path");
const fs = require('fs');
const port = 3000
let students = [
   {
       name: "Luis Raga",
        email: "luis.raga@domaim.com",
        city: "Bogotá",
        country: "Colombia"
    }
];
app.get("/get_pdf", (req, res) => {
    ejs.renderFile(path.join(__dirname, './views/', "mypdf.ejs"), {students}, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            let options = {
                "height": "11.25in",
                "width": "8.5in",
                "header": {
                    "height": "20mm"
                },
                "footer": {
                    "height": "20mm",
                },
            };

            let namePdf = "report.pdf"
            pdf.create(data, options).toFile(namePdf, function (err, data) {
                if (err) {
                    res.send(err);
                } else {
                    var file = fs.createReadStream(`./${namePdf}`);
                    var stat = fs.statSync(`./${namePdf}`);
                    res.setHeader('Content-Length', stat.size);
                    res.setHeader('Content-Type', 'application/pdf');
                    res.setHeader('Content-Disposition', 'attachment; filename=quote.pdf');
                    file.pipe(res);
                }
            });
        }
    });
})
app.listen(port, ()=>{
    console.log(`Corriendo en: http://localhost:${port}, en esta ruta está el pdf http://localhost:${port}/get_pdf`);
});