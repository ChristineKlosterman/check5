import { AppState } from "../AppState";
import { Vert } from "../models/Vert";
// import { Vert } from "../models/Vert";
import { logger } from "../utils/Logger";
import { api } from "./AxiosService";



class VertsService {
    async getVerts() {
        const res = await api.get('api/ads')
        logger.log('is it working', res.data)
        AppState.verts = res.data.map(v => new Vert(v))
    }
}

export const vertsService = new VertsService()