import contenedorProcessInfo from '../../container/containerProcessInfo.js'



class InfoService {

    async info() {
        const info = new contenedorProcessInfo();
        const processinfo = await info.processInfo()
        return processinfo
}


}

export const infoService = new InfoService()