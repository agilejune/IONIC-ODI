export interface CheckList {
  id: number,
  question_ids: Question[],
  title: string
}

interface Question {
  constr_mandatory: boolean, //false,
  id: number, //124,
  label_ids: {id: number, value: string}[],
  question: string, //"1. Tempatkan mobil tangki yang telah datang di SPBU dengan aman dan posisi yang benar.",
  type: "simple_choice" | "textbox"
}