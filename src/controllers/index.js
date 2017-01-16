import fs from 'fs';
import path from 'path';
import formidable from 'formidable';
import conf from '../config';

function main(req, res){
  let url = req.params[0], arrTemp = [], arrUrl = [], arrBreadcrumbs = [], extraUrl = '';

  if(url.length > 0){
    arrTemp = url.split('/');
    for(let i = 0; i < arrTemp.length; i++){
      if(arrTemp[i].length > 0){
        extraUrl += '/' + arrTemp[i];
        arrUrl.push(arrTemp[i]);
      }
    }
    for(let i = 0; i < arrUrl.length; i++){
      if(i>0){
        let temp = arrBreadcrumbs[i-1];
        arrBreadcrumbs[i] = temp + '/' + arrUrl[i];
      } else {
        arrBreadcrumbs[i] = '/' + arrUrl[i];
      }
    }
  }
  let dirs = _listDirsFiles(path.join(__dirname, conf.storageFolder3Level, extraUrl), 'directories');
  let files = _listDirsFiles(path.join(__dirname, conf.storageFolder3Level, extraUrl), 'files');

  res.render('index', { vars: conf.vars, dirs, files, extraUrl, arrUrl, arrBreadcrumbs });
}

function redirect(req, res){
  res.redirect(req.body.goto);
}

function uploadFile(req, res){
  let form = new formidable.IncomingForm();
  form.multiples = true;
  form.keepExtensions = true;
  form.on('progress', (bytesReceived, bytesExpected) => {
    if((bytesExpected/1000000) > 3){
      console.log(Math.round((bytesReceived/bytesExpected)*100));
    }
  });
  form.parse(req, (err, fields, files) => {
    let uploadDir = path.join(process.env.PWD, conf.storageFolderName, fields.uploaddir),
      newFilename = fields.filename,
      filesNumber = (files.fileobject.length >= 2) ? files.fileobject.length : 1;

    if(filesNumber===1){
      let origFilename = files.fileobject.name;
      let tempPath = files.fileobject.path;
      let lastPath = '';
      let fileExt = '';

      if(origFilename.lastIndexOf('.') > 0){
        fileExt = '.' + origFilename.split('.').pop();
      }

      if(newFilename.length > 0){
        lastPath = path.join(uploadDir, newFilename) + fileExt;
      } else {
        lastPath = path.join(uploadDir, origFilename);
      }

      let bufferFile = fs.readFileSync(tempPath);
      fs.writeFileSync(lastPath, bufferFile);
      fs.unlink(tempPath);
    } else if(filesNumber>1){
      for(let i = 0; i < filesNumber; i++){
        let origFilename = files.fileobject[i].name;
        let tempPath = files.fileobject[i].path;
        let lastPath = '';
        let fileExt = '';

        if(origFilename.lastIndexOf('.') > 0){
          fileExt = '.' + origFilename.split('.').pop();
        }

        if(newFilename.length > 0){
          lastPath = path.join(uploadDir, newFilename + (i+1)) + fileExt;
        } else {
          lastPath = path.join(uploadDir, origFilename);
        }

        let bufferFile = fs.readFileSync(tempPath);
        fs.writeFileSync(lastPath, bufferFile);
        fs.unlinkSync(tempPath);
      }
    }

    let load = (fields.uploaddir.length > 0) ? fields.uploaddir : '/';
    res.redirect(load);
  });
}

// private functions
function _listDirsFiles(location, lookFor){
  let list = fs.readdirSync(location), items = [];

  if(lookFor === 'directories'){
    list.forEach((fileOrDir) => {
      if(fs.statSync(path.join(location, fileOrDir)).isDirectory()){
        if(fileOrDir.indexOf('.') != 0) items.push(fileOrDir);
      }
    });
  } else if(lookFor === 'files'){
    list.forEach((fileOrDir) => {
      if(fs.statSync(path.join(location, fileOrDir)).isFile()){
        if(fileOrDir.indexOf('.') != 0) items.push(fileOrDir);
      }
    });
  }

  return items;
}

export default {
  main,
  redirect,
  uploadFile
};
