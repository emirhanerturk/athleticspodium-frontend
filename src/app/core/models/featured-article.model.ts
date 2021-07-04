import { BaseModel } from "@models/base.model";
import { Article } from "./article.model";

export class FeaturedArticle extends BaseModel {
  id: number;
  article_id: number;
  rank: number;
  // includes
  article: Article;
}
