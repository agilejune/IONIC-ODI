export interface Delivery {
  company_code: string, //"F205"
  company_id: number, //26
  company_lat_geo: number,
  company_log_geo: number,
  company_name: string, //"TBBM PADALARANG"
  compartment_volume: string, //"1-8000;2-8000;3-8000;4-0;5-0;6-0"
  date_shipment: string, //"2020-10-06 12:59:20"
  driver: string,        //"M. Yusuf Surahman"
  driver_assistant: string, //"Wandi Ruswandi"
  driver_assistant_code: string, //"PN-0755"
  driver_assistant_id: number, //22060
  driver_code: string,          //"PN-0127"
  driver_id: number,            //21690
  end_shipment: string,      //"2020-10-06 13:20:44"
  final_charge_time: string, //"2020-10-06 13:20:44"
  gate_in_time: string,     //"2020-10-06 13:20:44"
  gate_out_time: string,    //"2020-10-06 13:20:44"
  initial_charge_time: string, //"2020-10-06 13:20:44"
  is_vehicle_pto: boolean,    //true, false, null
  last_position: Position,    
  nfc_id: string,
  seal_compiled: string,    //"6609253,6609254,6609255,6609256,6609257,6609258,"
  shipment_id: number,      //
  spbu_compiled: string,    //"3443302,3443309,"
  spbu_compiled_detail: SpbuDetail[],
  spbu_product_volume_lo: string,  //"3443302-PERTALITE-8-8057808077-\n3443309-PERTALITE-8-8057819862-\n3443309-PERTALITE-8-8057916240-"
  status: string,             //"Proses Pengiriman"
  url_survey: string,           //"http://182.23.86.211:8090/survey/start/kuesioner-performance-awak-mobil-tangki-4/phantom?depot=F205&spbu=3443309&nopol=B9309PEH&vdate=2020-10-06&vtime=12:59:20&nsupir=PN-0127&nkernet=PN-0755"
  url_tracking: string,         //"https://gps.demo.dev/track/show.php?token=0a5ee&mt=B9274SFU&from=2020-10-06%2013:19:51&to=2022-02-28%2015:09:27&spbu1=3443309&spbu2=3443305&spbu3=&spbu4=&spbu5="
  vehicle: string,          //"B9309PEH"
  vehicle_id: number,       //480
  volume: string            //"24.0"
}

export interface Position {
  EventName: string,  //"None"
  Heading: number, //277
  Jalan: string, //"Jalan Sukabumi-Cianjur, Bangbayang"
  Speed: 0, //31
  ZoneName: string, //"None"
  gps_email: string, //"None"
  gps_time: string, //"2022-02-21 10:31:53"
  gps_vendor: string,  //"TELKOMSEL"
  name: string  //"B9274SFU"
}

export interface SpbuDetail {
  spbu: string,
  address_home: string,
  email: string,
  lat_geo: string,
  log_geo: string,
  mobile: string
}