var fs = require("fs");

function BasicFlash(front, back) {

    this.front = front;
    this.back = back;
    this.create = function() {
        var data = {
            front: this.front,
            back: this.back,
            type: "bcflash",
        };
        fs.appendFile("basic.txt", JSON.stringify(data) + ';', "utf8", function(error) {
            if (error) {
                console.log(error);
            }
        });
    };
    
}

module.exports = BasicFlash;