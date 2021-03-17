let express = require("express");
let app = express();
let ejs = require("ejs");
let pdf = require("html-pdf");
let path = require("path");
const PDFDocument = require('pdfkit');
const fs = require('fs');
let students = [
   {name: "Joy",
    email: "joy@example.com",
    city: "New York",
    country: "USA"},
   {name: "John",
    email: "John@example.com",
    city: "San Francisco",
    country: "USA"},
   {name: "Clark",
    email: "Clark@example.com",
    city: "Seattle",
    country: "USA"},
   {name: "Watson",
    email: "Watson@example.com",
    city: "Boston",
    country: "USA"},
   {name: "Tony",
    email: "Tony@example.com",
    city: "Los Angels",
    country: "USA"
}];
app.get("/generateReport", (req, res) => {

    
 
// Create a document
const doc = new PDFDocument();
 
// Pipe its output somewhere, like to a file or HTTP response
// See below for browser usage
doc.pipe(fs.createWriteStream('output.pdf'));
 
// Embed a font, set the font size, and render some text
// doc
//   .font('fonts/PalatinoBold.ttf')
//   .fontSize(25)
//   .text('Some text with an embedded font!', 100, 100);
 
// // Add an image, constrain it to a given size, and center it vertically and horizontally
// doc.image('path/to/image.png', {
//   fit: [250, 300],
//   align: 'center',
//   valign: 'center'
// });
 
// Add another page
doc
  .addPage()
  .fontSize(25)
  .text('Here is some vector graphics...', 100, 100);
 
// Draw a triangle
doc
  .save()
  .moveTo(100, 150)
  .lineTo(100, 250)
  .lineTo(200, 250)
  .fill('#FF3300');
 
// Apply some transforms and render an SVG path with the 'even-odd' fill rule
doc
  .scale(0.6)
  .translate(470, -380)
  .path('M 250,75 L 323,301 131,161 369,161 177,301 z')
  .fill('red', 'even-odd')
  .restore();
 
// Add some text with annotations
doc
  .addPage()
  .fillColor('blue')
  .text('Here is a link!', 100, 100)
  .underline(100, 100, 160, 27, { color: '#0000FF' })
  .link(100, 100, 160, 27, 'http://google.com/');
 
// Finalize PDF file
doc.pipe(res);
doc.end();
    // ejs.renderFile(path.join(__dirname, './views/', "mypdf.ejs"), {students: students}, (err, data) => {
    //     if (err) {
    //         res.send(err);
    //     } else {
    //         let options = {
    //             "height": "11.25in",
    //             "width": "8.5in",
    //             "header": {
    //                 "height": "20mm"
    //             },
    //             "footer": {
    //                 "height": "20mm",
    //             },
    //         };

            
    //         pdf.create(data, options).toFile("report.pdf", function (err, data) {
    //             if (err) {
    //                 res.send(err);
    //             } else {
    //                 res.send("File created successfully");
    //             }
    //         });
    //     }
    // });
})
app.listen(3000, ()=>{
    console.log("Escuchando en el puerto 3000");
});