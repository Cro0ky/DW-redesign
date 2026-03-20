export type Size = "s" | "m" | "l" | "xl";

export enum IGameType {
  TUTORIAL = "TUTORIAL",
  SOLO = "SOLO",
  RT_SOLO = "RT_SOLO",

  SINGLE = "SINGLE",
  RT_SINGLE = "RT_SINGLE",

  RATING = "RATING",
  TEAM = "TEAM",
}

export enum ETutorialType {
  THEORY = "theory",
  PRACTICE = "practice",
}

export enum GameSide {
  NATO = "NATO",
  RUSSIA = "RUSSIA",
}

export enum EUnitsNames {
  LONG_RANGE_DRONE_RUSSIA = "long_range_drone_russia",
  LONG_RANGE_DRONE_NATO = "long_range_drone_nato",
  MID_RANGE_DRONE_NATO = "mid_range_drone_nato",
  MID_RANGE_DRONE_RUSSIA = "mid_range_drone_russia",
  SCOUT_DRONE_RUSSIA = "scout_drone_russia",
  SCOUT_DRONE_NATO = "scout_drone_nato",

  SATELLITE_RUSSIA = "satellite_russia",
  SATELLITE_NATO = "satellite_nato",
  SPOTTED_UNIT = "spotted_unit",

  MOBILE_NSU = "mobile_nsu",
  FAKE_NSU = "fake_nsu",
  SCANNER = "frequency_scanner",
  REB = "reb_station",

  FPV_INFANTRY = "fpv_infantry",
  FPV_INTERCEPTOR = "fpv_interceptor",
  SCOUT_INFANTRY = "scout_infantry",
  LANCET_INFANTRY = "lancet_infantry",

  LONG_RANGE_DRONE = "long_range_drone",
  MID_RANGE_DRONE = "mid_range_drone",
  SCOUT_DRONE = "scout_drone",

  LOGISTICS_CAR = "logistics_car",
  REBMAN_CAR = "rebman_car",

  HEADQUARTER = "headquarter",
  NEUTRAL_HEADQUARTER = "neutral_headquarter",
  STORAGE = "storage",
  SATELLITE = "satellite",
}
