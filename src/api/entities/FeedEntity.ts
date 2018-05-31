/**
 *
 * Author: david.deng<david.deng@jcinfotech.com>
 * Date: 2018/5/26
 */
export interface FeedsResponse {
  ad:     null;
  pinned: any[];
  feeds:  Feed[];
}

export interface Feed {
  id:                 number;
  user_id:            number;
  feed_content:       string;
  feed_from:          number;
  like_count:         number;
  feed_view_count:    number;
  feed_comment_count: number;
  feed_latitude:      string;
  feed_longtitude:    string;
  feed_geohash:       string;
  audit_status:       number;
  feed_mark:          string;
  created_at:         string;
  updated_at:         string;
  deleted_at:         null;
  comments:           Comment[];
  has_collect:        boolean;
  has_like:           boolean;
  images:             Image[];
  paid_node:          null;
  video:              null;
  user:               User;
}

export interface Comment {
  id:               number;
  user_id:          number;
  target_user:      number;
  reply_user:       number;
  body:             string;
  commentable_type: string;
  commentable_id:   number;
  created_at:       string;
  updated_at:       string;
  user:             User;
  reply:            null;
}

export interface User {
  id:         number;
  name:       string;
  bio:        null;
  sex:        number;
  location:   null;
  created_at: string;
  updated_at: string;
  deleted_at: null;
  avatar:     null;
  bg:         null;
  verified:   null;
  extra:      Extra;
}

export interface Extra {
  user_id:            number;
  likes_count:        number;
  comments_count:     number;
  followers_count:    number;
  followings_count:   number;
  updated_at:         string;
  feeds_count:        number;
  checkin_count:      number;
  last_checkin_count: number;
}

export interface Image {
  file: number;
  size: string;
  mime: string;
}

export interface CommentResponse {
  message?: string;
  comment?: Comment;
}
