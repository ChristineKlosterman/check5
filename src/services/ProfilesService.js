import { AppState } from "../AppState"
import { Profile } from "../models/Profile"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class ProfilesService {

    async getProfileById(id) {
        const res = await api.get(`api/profiles/${id}`)
        logger.log('this is working')
        AppState.activeProfile = new Profile(res.data)
    }
}

export const profilesService = new ProfilesService()