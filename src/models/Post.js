export class Post {
    constructor(data) {
        this.id = data.id || ''
        this.likeIds = data.likeIds || {}
        this.likes = data.likes || ''
        this.imgUrl = data.imgUrl || ''
        this.body = data.body || ''
        this.creatorId = data.creatorId || ''
        this.creator = data.creator || {}
        this.createdAt = data.createdAt || ''
        this.updatedAt = data.updatedAt || ''
    }
}