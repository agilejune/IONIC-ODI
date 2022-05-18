export interface CheckList {
  id: number,
  question_ids: Question[],
  title: string
}

interface Question {
  constr_mandatory: boolean, 
  id: number, 
  label_ids: {id: number, value: string}[],
  question: string, 
  type: "simple_choice" | "textbox"
}