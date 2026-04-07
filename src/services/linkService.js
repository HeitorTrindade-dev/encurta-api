import { LinkRepository } from "../repositories/linkRepository.js";

export class LinkService {
    constructor() {
        this.linkRepository = new LinkRepository();
    }

    async createLink(url) {

        const link = await this.linkRepository.createLink(url);
        const linkWithCode = await this.linkRepository.insertCodeOnLink(link.id);

        return linkWithCode;
    }

    async getLink(code) {
        const link = await this.linkRepository.getLinkByCode(code);
        if (!link) return null;
        return link;
    }

    async getAllLinks(){
        const links = await this.linkRepository.getAllLinks();
        if (!links) return null;
        return links;  
    }

    async getUrl(code) {
        const link = await this.linkRepository.getLinkByCode(code);
        if (!link) return null;

        this.linkRepository.addOneToClicks(code).catch(console.error);
        return link.url;
    }

}