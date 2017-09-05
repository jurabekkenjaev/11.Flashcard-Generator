var fs = require("fs");

function ClozeFlash(text, cloze) {

    this.text = text;
    this.cloze = cloze;
    this.clozeDeleted = this.text.replace(this.cloze, ' ... ');
    this.create = function() {
        var data = {
            text: this.text,
            cloze: this.cloze,
            clozeDeleted: this.clozeDeleted,
            type: "ceflash"
        };
        fs.appendFile("basic.txt", JSON.stringify(data) + ';', "utf8", function(error) {
            if (error) {
                console.log(error);
            }
        });
    };
    
} 

module.exports = ClozeFlash;


