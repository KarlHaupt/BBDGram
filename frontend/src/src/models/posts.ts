export interface Posts {
    id: number,
    imageUrl: string,
    likes: number,
    dislikes: number,
    caption: string,
}
/*
export interface Post {
    _id: string,
    image: {
        contentType: string,
        data: {
            type:string,
            data: number[]
        }
    }
    tag: string,
    user: string,
    _v: number
}
*/

export interface Post {
    _id: string;
    image: {
      contentType: string;
      data: {
        type: string;
        data: number[];
      };
    };
    likes: string[];
    dislikes: string[];
    tag: string;
    user: string;
    _v: number;
  }

