import { infoService } from '../../negocio/services/info.service.js';



async function controladorProcessInfo(req, res){

    const processInfo = await infoService.info();

    if(processInfo.message){
      loggerError(req, id.message)
      throw(error)
    } else
      res.json(processInfo);
  }


 

  export  {controladorProcessInfo} 