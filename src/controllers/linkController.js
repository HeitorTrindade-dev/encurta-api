import { LinkRepository } from "../repositories/linkRepository.js";

export class LinkController {
  constructor() {
    this.linkRepository = new LinkRepository();
  }

  async createLink(request, response) {
    try {
      const { url } = request.body;

      if (!url) {
        return response.status(400).json({ message: "You can't create a link without a url" });
      }

      const link = await this.linkRepository.createLink(url);
      const linkWithCode = await this.linkRepository.insertCodeOnLink(link.id);

      response.status(201).json(linkWithCode);
    } catch (error) {
      console.log(error);
      response.status(500).json({ message: "The link returned an error" });
    }
  }
}