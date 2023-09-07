export interface Posts {
    _id: number,
    image: {
        contentType:string,
        data:{
            type:string,
            data:[]
        }
    },
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
    description: string;
    tag: string;
    user: string;
    _v: number;
  }

