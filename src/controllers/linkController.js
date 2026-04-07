import { LinkService } from "../services/linkService.js";

export class LinkController {
  constructor() {
    this.linkService = new LinkService
  }

  async createLink(request, response) {
    try {
      const { url } = request.body;

      if (!url) {
        return response.status(400).json({ message: "You can't create a link without a url" });
      }

      const linkWithCode = await this.linkService.createLink(url)

      response.status(201).json(linkWithCode);
    } catch (error) {
      console.log(error);
      response.status(500).json({ message: "The link returned an error" });
    }
  }

  async getUrl(request, response) {
    try {
      const { code } = request.params;
      if (!code) {
        return response.status(400).json({ message: "You have to send a code" });
      }

      const originalUrl = await this.linkService.getUrl(code);
      if (!originalUrl) {
        return response.status(404).json({ message: "THere are no link with this code" });
      }

      return response.redirect(originalUrl);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ message: "Internal redirection error" });
    }
  }

  async getLink(request, response) {
    try {
      const { code } = request.params;
      if (!code) {
        return response.status(400).json({ message: "You have to send a code" });
      }

      const link = await this.linkService.getLink(code);
      if (!link) {
        return response.status(404).json({ message: "There are no link with this code" });
      }

      return response.json(link);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ message: "Internal link error" });
    }
  }

  async getAllLinks(request,response){
    try{
      const links = await this.linkService.getAllLinks();

      return response.json(links)
    } catch(error){
        console.error(error);
      return response.status(500).json({ message: "Internal link error" });
    }
  }
}