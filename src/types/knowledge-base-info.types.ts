export type TBaseTitle =
  | "basic_concepts"
  | "stations"
  | "infantry_and_pilots"
  | "drones"
  | "transport"
  | "other";

//
export type TBaseTopic =
  | "capture_the_flag_mode"
  | "total_playing_time"
  | "recharge_the_abilities_of_units"
  | "active_pause"
  | "teams_of_players"
  | "preparatory_course"
  | "mechanics_of_the_sequence_of_moves"
  | "event_history"
  | "communication_channels"
  //
  | "mobile_nsu"
  | "fake_nsu"
  | "reb_station"
  | "frequency_scanner"
  //
  | "scout_infantry"
  | "lancet_infantry"
  | "fpv_infantry"
  | "fpv_interceptor"
  //
  | "long_range_drone"
  | "mid_range_drone"
  | "scout_drone"
  //
  | "logistics_car"
  | "rebman_car"
  //
  | "headquarter"
  | "neutral_headquarter"
  | "storage"
  | "weather"
  | "satellite"
  | "topography";

export interface IKnowledgeBaseInfoData {
  category: TBaseTitle;
  topics: {
    title: TBaseTopic;
    description: string;
    unit?: IUnitParams;
    data?: Record<string, number>;
  }[];
}

export interface IUnitParams {
  url: string;
  scale?: number;
  animation?: string;
}
