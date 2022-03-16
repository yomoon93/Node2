const fs = require('fs');

const superagent = require('superagent');

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      //whatever we pass into the function what will later be available as the argument in the then
      if (err) reject();
      // whatever we pass  in here is what will  be available as the argument in the catch
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
        if (err) reject('Could not write file');
        resolve('success');
      });
  });
};



//returns a promise we can use a then
readFilePro(`${__dirname}/dog.txt`)
  .then(data => {
    console.log(`Breed ${data}`);
// we did some chaining so each handler returns a new promise
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((res) => {
    console.log(res.body.message);


    return writeFilePro('dog-img.txt', res.body.message)
//old way of doing any of the work
  //   fs.writeFile('dog-img.txt', res.body.message, (err) => {
  //     if (err) return console.log(err.message);
  //     console.log('Random dog image saved file!');
  //   });
   })

   .then(()=>{
     console.log('Random dog image save to file!')
   })
  .catch((err) => {
    console.log(err.message);
  });

// CAllBACK HELL SECTION
