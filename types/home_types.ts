export interface HomePage {
  data: {
    id: number;
    attributes: {
      front_text: string;
      call_text: string;
      button_text: string;
    };
  };
}

export interface Locale {
  id: number;
  name: string;
  code: string;
  isDefault: boolean;
}
