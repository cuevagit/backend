import contenedorProcessInfo from '../container/containerProcessInfo.js'


const processInfoContainer = new contenedorProcessInfo()

async function controladorProcessInfo(req, res){
    const processInfo = await processInfoContainer.processInfo();
    //console.log(processInfo);
    res.json(processInfo);
  }

  async function controladorWebInfoProcess(req, res) {
    res.status(201);
    res.render('infoSistema');
  }

  export  {controladorProcessInfo, controladorWebInfoProcess} 