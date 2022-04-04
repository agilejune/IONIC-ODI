export interface Feedback {
  AllMessage: Message[],
  Company: number, //26,
  Date: string, //Tue, 06 Oct 2020 05:59:20 GMT,
  Message: string, //Pengirim: Patra niaga \nPesan: Kompartemen ke 1 1668 pas dicolok pakai dipstik 1666\n\nKompartemen ke 2 1658 pas dicolok pakai dipstik 1656\n\nKesimpulannya kompartemen ke 1 kurang 2ml dan kompartemen ke 2 kurang 2ml\nMohon dicek kembali tera mobil \n\nTerima kasih ,
  No: string, //1,
  Reason: string, //Jumlah KL kurang,
  Respon: string, //Respon: Administrator \n,
  Shipment: Shipment, //Tanggal: 06/10/20 12:59 \nNopol: B9309PEH \nSupir: M. Yusuf Surahman ( PN-0127 ) \nKernet: Wandi Ruswandi ( PN-0755 ) \nSPBU: 3443309,
  Status: string, //closed
}

export interface Feedback_Data {
  AllMessage: Message[],
  Company: number, //26,
  Date: string, //Tue, 06 Oct 2020 05:59:20 GMT,
  Message: string, //Pengirim: Patra niaga \nPesan: Kompartemen ke 1 1668 pas dicolok pakai dipstik 1666\n\nKompartemen ke 2 1658 pas dicolok pakai dipstik 1656\n\nKesimpulannya kompartemen ke 1 kurang 2ml dan kompartemen ke 2 kurang 2ml\nMohon dicek kembali tera mobil \n\nTerima kasih ,
  No: string, //1,
  Reason: string, //Jumlah KL kurang,
  Respon: string, //Respon: Administrator \n,
  Shipment: string, //Tanggal: 06/10/20 12:59 \nNopol: B9309PEH \nSupir: M. Yusuf Surahman ( PN-0127 ) \nKernet: Wandi Ruswandi ( PN-0755 ) \nSPBU: 3443309,
  Status: string, //closed
}
export interface Message {
  message: string, //Kompartemen ke 1 1668 pas dicolok pakai dipstik 1666\n\nKompartemen ke 2 1658 pas dicolok pakai dipstik 1656\n\nKesimpulannya kompartemen ke 1 kurang 2ml dan kompartemen ke 2 kurang 2ml\nMohon dicek kembali tera mobil \n\nTerima kasih ,
  pilihan: string, //Jumlah KL kurang,
  responder: string, //Administrator,
  response: string, //,
  sender: string, //Patra niaga
}

interface Shipment {
  Tanggal: string,
  Nopol: string,
  Supir: string,
  Kernet: string,
  SPBU: string,
}

export interface FeedbackOption {
  id: number,
  name: string
}