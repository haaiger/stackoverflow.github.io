export interface IOwner {
  display_name: string;
  link: string;
  profile_image: string;
  reputation: number;
  user_id: number;
  user_type: string;
}

export interface IQuestion {
  answer_count: number;
  content_license: string;
  creation_date: number;
  is_answered: boolean;
  last_activity_date: number;
  link: string;
  owner: IOwner;
  question_id: number;
  score: number;
  tags: string[];
  title: string;
  view_count: number;
}

export interface IResponse {
  has_more: boolean;
  items: IQuestion[];
  quota_max: number;
  quota_remaining: number;
}

export interface IAnswer {
  answer_id: number;
  body: string;
  content_license: string;
  creation_date: number;
  is_accepted: boolean;
  last_activity_date: number;
  last_edit_date: number;
  owner: IOwner;
  question_id: number;
  score: number;
}

export interface ITableProps {
  data: IQuestion[] | null;
  onAuthorClick: (userId: number) => void;
  onTagClick: (tag: string) => void;
}

export interface IModalProps {
  onClose: () => void;
  children: React.ReactNode;
}