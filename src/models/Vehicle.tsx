export interface Vehicle {
  attachment: Attachment[],
  capacity: string, //"24.0",
  // empty_space_comp: number[], //285.0,
  id: number, //480,
  name: string, //"B9309PEH",
  re_calibration_time: string, //"Sun, 18 Oct 2020 17:00:00 GMT",
  rental_type: string, //"Tarif All In-Lokal",
  // sensitivity_comp: number[],
  // t2_comp: number[],
  comp: Comp[],
}

export interface Attachment {
  datas_download: string, //"http://182.23.86.211:8090/web/binary/download_document?model=ir.attachment&field=datas&id=59281&file_name=B 9309 PEH.pdf",
  datas_fname: string, //"B 9309 PEH.pdf",
  id: number, //59281
}

export interface Comp {
  empty_space: number,
  sensitivity: number,
  t2: number,
}