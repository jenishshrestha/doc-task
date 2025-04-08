// api response types
export default interface ApiResponse {
  data: ResponseData;
  error: string;
  error_code: string;
  message: string;
  status: string;
  status_code: number;
}

// response data types
interface ResponseData {
  rt_update_fields: [];
  sections: Section[];
}

export interface Section {
  children: SectionChild[];
  id: number;
  title: string;
  type: string;
}

export interface SectionChild {
  acc: number;
  content?: Content;
  doc_id: string;
  format: string;
  format_message: string;
  id: number;
  id_auto_extract: number;
  id_auto_extract_label: string;
  ignore: boolean;
  label: string;
  low_confidence: boolean;
  no_items_row: number;
  order: number;
  org_id?: string;
  p_title: string;
  p_type: string;
  parent_id?: number;
  time_spent: number;
  type: "string" | "number" | "date" | "drop_down" | "line_item";
  user_id?: string;
  drop_down_type?: string;
  children?: SectionChild[][][];
  sub_p_id?: number;
  sub_p_title?: string;
  sub_p_type?: string;
  row_count?: number;
  index?: number;
}

interface Content {
  confidence?: number;
  is_valid_format: boolean;
  orig_value: string | number | boolean | null;
  page?: number;
  position: number[];
  position_label?: number[];
  review_required: boolean;
  validation_source: string;
  value: number | string | boolean | null;
}
