export interface CreateArticleDTo {
  title: string;
  description: string;
}

export interface UpdatedArticleDTo {
  title?: string;
  description?: string;
}

export interface RegisterUserDTo {
  username: string;
  email: string;
  password: string;
}

export interface LoginUserDTo {
  email: string;
  password: string;
}

export interface UpdatedUserDTo {
  username?: string;
  email?: string;
  password?: string;
}

export interface CreateCommentDTo {
  text: string;
  articleId: number;
}

export interface UpdateCommentDTo {
  text: string;
}
