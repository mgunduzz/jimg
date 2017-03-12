const fs = require('fs');

var stream = fs.createReadStream("/home/hframe/Downloads/teamviewer_12.0.71510_i386.deb");
setTimeout(()=>{console.log('wait')},3000);
stream.on('end', () => {
  console.log('There will be no more data.');
});
stream.on('data', (chunk)=>{
    console.log(`Received ${chunk.length} bytes of data.`);
});





setTimeout(()=>{console.log('finishing')},3000);
