export interface CreateSubscriptionDTO {
  topic: string;
  url: string;
}

export interface PusblishMessageDTO {
  topic: string;
  data: Record<string, any>;
}

export interface CreateMessageDTO {
  topic: string;
  url: string;
  data: Record<string, any>;
  response: any;
  is_acknowledged: boolean;
}
